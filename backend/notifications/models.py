from django.db import models
from django.conf import settings

class Notification(models.Model):
    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="notifications"
    )

    
    complaint = models.ForeignKey(
    'complaints.Complaint',
    on_delete=models.CASCADE,
    related_name="notifications"
    )

    class Event(models.TextChoices):
        SUBMITTED = 'submitted', 'Submitted',
        STATUS_UPDATED = 'status_updated', 'Status Updated',
        ASSIGNED = 'assigned', 'Assigned',
        DUPLICATE = 'duplicate', 'Duplicate'

    event = models.CharField(
        max_length=20,
        choices = Event.choices,
        default=Event.SUBMITTED
    )

    message = models.TextField()
    message_ne = models.TextField(blank=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.recipient.email}: {self.event}"