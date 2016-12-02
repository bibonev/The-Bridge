import PIL
import os
from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
from organisation import models as organisation_models

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
    
    def have_organisations(self):
        # check if the user has any organisations
        have_organisations = False
        organisations = organisation_models.Organisation.objects.filter(host=self.user)
        if organisations:
            have_organisations = True

        return have_organisations

    def pick_user_organisation(self):
        org_id = -1
        if self.have_organisations():
            organisations = organisation_models.Organisation.objects.filter(host=self.user)
            org_id = organisations[0].pk
        return org_id

# sets User.profile to a particular user
User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u) [0])