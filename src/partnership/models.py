from django.db import models
from django.contrib.auth.models import User
from developer.models import Organisation

class Relation(models.Model):
    user = models.ForeignKey(User)
    organisation = models.ForeignKey(Organisation)

    # check if a user makes request to its own organisation
    def own_organisation(user, organisation):
        return user == organisation.host

    # checks if the request is pending
    def pending(user, organisation):
        return PendingRequest.objects.filter(user=user, organisation=organisation).exists()

    # check if the request is finished
    def together(user, organisation):
        return Relation.objects.filter(user=user, organisation=organisation).exists()

    class Meta:
        unique_together = ('user', 'organisation')


class PendingRequest(models.Model):
    SENDER_CHOICES = (
      (0, 'user'),
      (1, 'organisation')
    )

    # fields for user, organisation and sender 
    user = models.ForeignKey(User)
    organisation = models.ForeignKey(Organisation)
    sender = models.IntegerField(choices=SENDER_CHOICES)  # used to identify who is sending the request
    # message, created, rejected ...

    # get pending request for user
    @staticmethod
    def get_pending_requests_for_user(user):
        return PendingRequest.objects.filter(sender=1, user=user)

    # get pending requests for organisation
    @staticmethod
    def get_pending_requests_for_organisation(organisation):
        return PendingRequest.objects.filter(sender=0, organisation=organisation)

    # user sends request to organisation
    def send_request(user, organisation):
        # checks if a relation exists or if it is pending or if it is sent to own organisation
        if not Relation.together(user, organisation) and not Relation.pending(user, organisation) and not Relation.own_organisation(user, organisation):
            return PendingRequest.objects.get_or_create(user=user, organisation=organisation, sender='0')

    # organisation approves request from user
    def approve(self):
        # checks if a relation exists or if it is pending or if it is sent to own organisation
        if not Relation.together(self.user, self.organisation) and Relation.pending(self.user, self.organisation) and not Relation.own_organisation(self.user, self.organisation):
            # delete the record from PendingRequest and add it to Relation
            PendingRequest.objects.filter(user=self.user, organisation=self.organisation).delete()
            return Relation.objects.get_or_create(user=self.user, organisation=self.organisation)