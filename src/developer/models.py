from django.db import models
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User

class Organisation(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    number_of_participants = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add = True)
    host = models.ForeignKey(User)

    def __str__(self):
        return self.title

        def get_absolute_url(self):
            return reverse('developer:organisation', kwargs={
                'organisation_pk':self.id
            })
