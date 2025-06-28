from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

class Feature(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Property(models.Model):
    PROPERTY_TYPES = [
        ('Buy', 'Buy'),
        ('Rent', 'Rent'),
        ('Commercial', 'Commercial'),
        ('PG', 'PG/Co-living'),
        ('Plot', 'Plots/Land'),
        ('Luxury', 'Luxury'),
        ('ShortStay', 'Short Stay'),
        ('New', 'New Projects'),
    ]
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    city = models.CharField(max_length=100)
    type = models.CharField(max_length=20, choices=PROPERTY_TYPES)
    features = models.ManyToManyField(Feature, blank=True)
    description = models.TextField(blank=True)
    owner = models.ForeignKey('User', on_delete=models.CASCADE, related_name='properties')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='images')
    image = models.URLField()

    def __str__(self):
        return f"Image for {self.property.title}"

class ContactMessage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='contact_messages')
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} about {self.property.title}"
