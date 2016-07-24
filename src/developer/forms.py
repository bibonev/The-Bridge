from django import forms
from . import models

class OrganisationForm(forms.ModelForm):
    class Meta:
        model = models.Organisation
        fields = [
            'title',
            'description',
            'number_of_participants',
        ]