from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ("email", "username", "full_name", "role", "is_staff", "is_active")
    fieldsets = UserAdmin.fieldsets + (
    ('CivicAid Info', {'fields': ('full_name', 'phone', 'role', 'address', 'language')}),
)


