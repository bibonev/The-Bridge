from django.shortcuts import render
from rest_framework import generics, permissions, filters
from developer import models as developer_models
from django.db.models import Q
from . import serializers

# REST API list all organisations on url: /api/v1/organisations/
class ListOrganisation(generics.ListAPIView):
    # permission_classes = (permissions.IsAdminUser,) # gives permissions only to Admin user to view the API view
    queryset = developer_models.Organisation.objects.all()
    serializer_class = serializers.OrganisationSerializer

    filter_backends = (filters.SearchFilter,)
    search_fields = ('title', 'description', 'category', 'locations',)

