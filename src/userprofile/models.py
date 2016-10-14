import PIL
import os
from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

class UserProfile(models.Model):  
    # models in relationship to the User
    user = models.OneToOneField(User)
    # image upload configurations, blank = True sets the field not required
    front_picture = ProcessedImageField(upload_to='users/',
                                           processors=[ResizeToFill(180, 180)],
                                           format='JPEG',
                                           options={'quality': 60}, blank=True)

    # use default image when the user has not upload one
    def default_image(self):
        if not self.front_picture:
            return os.path.join(settings.MEDIA_URL , 'default/no-user-img.jpg')

# sets User.profile to a particular user
User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u) [0])