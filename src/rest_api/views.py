from django.shortcuts import render
from rest_framework import generics, permissions
from developer import models as developer_models
from . import serializers

# REST API list all organisations on url: /api/v1/organisations/
class ListOrganisation(generics.ListAPIView):
    # permission_classes = (permissions.IsAdminUser,) # gives permissions only to Admin user to view the API view
    queryset = developer_models.Organisation.objects.all()
    serializer_class = serializers.OrganisationSerializer

# REST API show a particular organisation on url: /api/v1/organisations/{id}
class RetrieveOrganisation(generics.RetrieveAPIView):
    # permission_classes = (permissions.IsAdminUser,) # gives permissions only to Admin user to view the API view
    queryset = developer_models.Organisation.objects.all()
    serializer_class = serializers.OrganisationSerializer

