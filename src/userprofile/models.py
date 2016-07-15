import PIL
import os
from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from PIL import Image

# Create your models here.

class UserProfile(models.Model):  
    user = models.OneToOneField(User)
    user_picture = models.ImageField(upload_to='users/', blank=True, null=True)
    user_balance = models.IntegerField(default=0)


User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u) [0])