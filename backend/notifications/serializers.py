from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'event', 'message', 'message_ne', 'is_read', 'created_at', 'complaint']