from django.contrib import admin
from .models import (
    Complaint,
    ComplaintUpvote,
    ComplaintAssignment,
    StatusHistory
)

@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):
    list_display = ('title', 'citizen', 'category', 'status', 'priority', 'is_duplicate', 'created_at')

@admin.register(ComplaintUpvote)
class ComplaintUpvoteAdmin(admin.ModelAdmin):
    list_display = ('citizen', 'complaint', 'created_at')

@admin.register(ComplaintAssignment)
class ComplaintAssignmentAdmin(admin.ModelAdmin):
    list_display = ('complaint', 'staff', 'assigned_by', 'assigned_at')

@admin.register(StatusHistory)
class StatusHistoryAdmin(admin.ModelAdmin):
    list_display = ('complaint', 'previous_status', 'new_status', 'changed_by', 'changed_at')