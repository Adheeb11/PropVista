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
    address = models.CharField(max_length=500, blank=True)
    area = models.CharField(max_length=100, blank=True)  # e.g., "Bandra West", "Koramangala"
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    type = models.CharField(max_length=20, choices=PROPERTY_TYPES)
    features = models.ManyToManyField(Feature, blank=True)
    description = models.TextField(blank=True)
    owner = models.ForeignKey('User', on_delete=models.CASCADE, related_name='properties')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    @property
    def full_address(self):
        """Returns the complete address for the property"""
        address_parts = []
        if self.address:
            address_parts.append(self.address)
        if self.area:
            address_parts.append(self.area)
        if self.city:
            address_parts.append(self.city)
        return ', '.join(address_parts) if address_parts else self.city

    @property
    def has_location(self):
        """Returns True if the property has valid coordinates"""
        return self.latitude is not None and self.longitude is not None

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
