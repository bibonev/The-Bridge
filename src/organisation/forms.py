from django import forms
from . import models

class OrganisationForm(forms.ModelForm):
    class Meta:
        model = models.Organisation
        fields = [
            'title',
            'description',
            'locations',
            'category',
            'phone_number',
            'email_organisation',
            'website',
            'front_picture',
            'cover_picture',
        ]