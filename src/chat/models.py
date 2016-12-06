from django.db import models
from django.contrib.auth.models import User
from organisation.models import Organisation
from django.utils import timezone


class Conversation(models.Model):
    user = models.ForeignKey(User)
    organisation = models.ForeignKey(Organisation)
    label = models.SlugField(unique=True)
    
    class Meta:
        unique_together = ('user', 'organisation')

class Message(models.Model):
    conversation = models.ForeignKey(Conversation, related_name='messages')
    handle = models.TextField()
    message = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now, db_index=True)

    def __unicode__(self):
        return '[{timestamp}] {handle}: {message}'.format(**self.as_dict())

    @property
    def formatted_timestamp(self):
        return self.timestamp.strftime('%b %-d %-I:%M %p')
    
    def as_dict(self):
        return {'handle': self.handle, 'message': self.message, 'timestamp': self.formatted_timestamp}