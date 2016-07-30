import PIL
import os
from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

# Create your models here.

class UserProfile(models.Model):  
    user = models.OneToOneField(User)
    user_picture = ProcessedImageField(upload_to='users/',
                                           processors=[ResizeToFill(180, 180)],
                                           format='JPEG',
                                           options={'quality': 60}, blank=True)
    def default_image(self):
        if not self.user_picture:
            return os.path.join(settings.MEDIA_URL , 'default/no-img.jpg')


User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u) [0])