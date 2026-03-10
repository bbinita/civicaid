from rest_framework import generics, status
from .models import Complaint, StatusHistory, ComplaintUpvote
from .serializers import ComplaintCreateSerializer, ComplaintListSerializer, ComplaintDetailSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied


class ComplaintListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ComplaintCreateSerializer
        return ComplaintListSerializer

    def get_queryset(self):
        return Complaint.objects.filter(citizen=self.request.user)

class ComplaintDetailVIew(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ComplaintDetailSerializer

    def get_object(self):
        complaint_id = self.kwargs['pk']
        complaint = get_object_or_404(Complaint, id=complaint_id)

        if complaint.citizen != self.request.user:
            raise PermissionDenied("You cannot access this complaint.")

        return complaint

class UpvoteToggleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        complaint = get_object_or_404(Complaint, id=pk)

        upvote = ComplaintUpvote.objects.filter(
            citizen=request.user, 
            complaint=complaint
            ).first()
        
        if upvote:
            upvote.delete()
            complaint.upvote_count -= 1
            complaint.save()
            return Response({ "message": "Upvote removed", "upvote_count": complaint.upvote_count }, status=status.HTTP_200_OK)

        ComplaintUpvote.objects.create(
            citizen=request.user,
            complaint=complaint
        ) 
        complaint.upvote_count += 1 
        complaint.save() 
        return Response({ "message": "Upvoted successfully", "upvote_count": complaint.upvote_count }, status=status.HTTP_201_CREATED)