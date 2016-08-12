from rest_framework import serializers
from developer import models as developer_models

class OrganisationSerializer(serializers.ModelSerializer):
    class Meta:
        # add the fields to the api serializer
        fields = (
            'id',
            'title',
            'description',
            'category',
            'locations',
            'phone_number',
            'email_organisation',
            'website',
            'front_picture',
            'cover_picture',
            'host',
        )
        model = developer_models.Organisation