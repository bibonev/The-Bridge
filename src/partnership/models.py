from django.db import models
from django.contrib.auth.models import User
from developer.models import Organisation

class Relation(models.Model):
    user = models.ForeignKey(User)
    organisation = models.ForeignKey(Organisation)

    def pending(user, organisation):
        return PendingRequest.objects.filter(user=user, organisation=organisation).exists()

    def together(user, organisation):
        return Relation.objects.filter(user=user, organisation=organisation).exists()

    class Meta:
        unique_together = ('user', 'organisation')


class PendingRequest(models.Model):
    SENDER_CHOICES = (
      (0, 'user'),
      (1, 'organisation')
    )

    user = models.ForeignKey(User)
    organisation = models.ForeignKey(Organisation)
    sender = models.IntegerField(choices=SENDER_CHOICES)  # used to identify who is sending the request
    # message, created, rejected ...

    @staticmethod
    def get_pending_requests_for_user(user):
        return PendingRequest.objects.filter(sender=1, user=user)

    @staticmethod
    def get_pending_requests_for_organisation(organisation):
        return PendingRequest.objects.filter(sender=0, organisation=organisation)

    def send_request(user, organisation):
        if not together(user, organisation):
            return PendingRequest.objects.get_or_create(user=user, organisation=organisation, sender='0')

    def approve(self):
        # delete the record from PendingRequest and add it to Relation
        PendingRequest.objects.filter(user=self.user, organisation=self.organisation).delete()
        return Relation.objects.get_or_create(user=self.user, organisation=self.organisation)