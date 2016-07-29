import os
from django.conf import settings
from django.db import models
from django.core.urlresolvers import reverse
from django.core.validators import RegexValidator
from django.contrib.auth.models import User
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

class Organisation(models.Model):
    CATEGORY_CHOICES = (
        ('Education', 'Education'),
        ('Environment', 'Environment'),
        ('Public Services', 'Public Services')
    )

    title = models.CharField(max_length=255, unique=True)

    description = models.TextField()

    locations = models.CharField(max_length=255)

    category = models.CharField(max_length=255, choices=CATEGORY_CHOICES)

    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$')
    phone_number = models.CharField(max_length=255, validators=[phone_regex], blank=True)
    
    email_organisation = models.EmailField()
    
    website = models.URLField(max_length=255)
    
    front_picture = ProcessedImageField(upload_to='organisation/profile',
                                           processors=[ResizeToFill(50, 50)],
                                           format='JPEG',
                                           options={'quality': 60})
    
    cover_picture = ProcessedImageField(upload_to='organisation/cover',
                                           processors=[ResizeToFill(1000, 200)],
                                           format='JPEG',
                                           options={'quality': 60})

    created_at = models.DateTimeField(auto_now_add = True)
    host = models.ForeignKey(User) #one to many

    def __str__(self):
        return self.title
    
    def default_image(self):
        if not self.front_picture:
            return os.path.join(settings.MEDIA_URL , 'default/no-img.jpg')
