from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=150)
    phone = models.CharField(
        max_length=20, 
        blank=True)

    class Role(models.TextChoices):
        CITIZEN = "citizen", "Citizen"
        STAFF = "staff", "Staff"
        ADMIN = "admin", "Admin"

    role = models.CharField(
        max_length=7,
        choices=Role.choices, 
        default=Role.CITIZEN)

    address = models.CharField(max_length=255, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)

    class Language(models.TextChoices):
        ENGLISH = 'en', 'English'
        NEPALI = 'ne', 'Nepali'

    language = models.CharField(
        max_length=2, 
        choices=Language.choices, 
        default=Language.ENGLISH)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)


    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "full_name"]

    def __str__(self):
        return f"{self.full_name} ({self.role})"

class OTPVerification(models.Model):
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE
    )
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)