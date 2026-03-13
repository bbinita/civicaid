from django.urls import path
from .views import ComplaintListCreateView, ComplaintDetailView, UpvoteToggleView, AdminComplaintListView, StatusUpdateView

urlpatterns = [
    path('complaints/', ComplaintListCreateView.as_view(), name ='complaint-list'),
    path('complaints/<int:pk>/', ComplaintDetailView.as_view(), name='complaint-detail'),
    path('complaints/<int:pk>/upvote/', UpvoteToggleView.as_view(), name='upvote-toggle'),
    path('admin/complaints/', AdminComplaintListView.as_view(), name='admin-complaint-list'),
    path('admin/complaints/<int:pk>/status/', StatusUpdateView.as_view(), name='status-update'),
]