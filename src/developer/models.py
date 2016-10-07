import os
import reversion
from datetime import datetime 
from django.conf import settings
from django.db import models
from django.core.urlresolvers import reverse
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

@reversion.register()
class Organisation(models.Model):
    '''Organisation model'''
    
    # category is chosen from these options
    CATEGORY_CHOICES = (
        ('Education', 'Education'),
        ('Environment', 'Environment'),
        ('Public Services', 'Public Services')
    )

    title = models.CharField(max_length=255, unique=True)

    description = models.TextField()

    locations = models.CharField(max_length=255)

    # use choices to restrict the input
    category = models.CharField(max_length=255, choices=CATEGORY_CHOICES)

    # set validator to the phone number which checks if it fits the phone_regex
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$')
    phone_number = models.CharField(max_length=255, validators=[phone_regex])
    
    email_organisation = models.EmailField()
    
    website = models.URLField(max_length=255)
    
    # image upload configurations, blank = True sets the field not reuqired
    front_picture = ProcessedImageField(upload_to='organisation/profile',
                                           processors=[ResizeToFill(180, 180)],
                                           format='JPEG',
                                           options={'quality': 60}, blank=True)
    
    cover_picture = ProcessedImageField(upload_to='organisation/cover',
                                           format='JPEG',
                                           options={'quality':60}, blank=True)

    created_at = models.DateTimeField(auto_now_add = True)
    host = models.ForeignKey(User) #one to many

    def __str__(self):
        return self.title
    
    # use default image when ehre is no uploaded one
    def default_image(self):
        if not self.front_picture:
            return os.path.join(settings.MEDIA_URL , 'default/no-img.jpg')

def validate_rating(rating):
    if rating < 0 and rating > 5 :  # Your conditions here
        raise ValidationError('rating out of range' % value)

class Review(models.Model):
    rating = models.IntegerField(validators=[validate_rating], default=0)
    text = models.TextField()
    author = models.ForeignKey(User)
    organisation = models.ForeignKey(Organisation)
    timestamp = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.text

    class Meta:
        ordering = ['-timestamp']
