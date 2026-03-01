from django.db import models

class CustomUser(models.Model):
    full_name = models.CharField(max_length =150)
    phone = models.CharField(max_length =20, blank=True, null=True)
    class Role(models.TextChoices):
        CITIZEN = "CITIZEN", "Citizen"
        STAFF = "STAFF", "Staff"
        ADMIN = "ADMIN", "Admin"

    role = models.CharField(max_length =7, choices=Role.choices, default=Role.CITIZEN)
    address = models.CharField(max_length=255, blank=True)

    class Language(models.TextChoices):
        ENGLISH = 'en', 'English'
        NEPALI = 'np', 'Nepali'

    language = models.CharField(
        max_length =2, 
        choices=Language.choices, 
        defailt=Language.ENGLISH)

