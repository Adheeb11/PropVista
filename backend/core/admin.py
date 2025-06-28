from django.contrib import admin
from .models import User, Property, PropertyImage, Feature

admin.site.register(User)
admin.site.register(Property)
admin.site.register(PropertyImage)
admin.site.register(Feature)
