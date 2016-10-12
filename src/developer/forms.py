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
            'cover_picture'
        ]
    
    def __init__(self, *args, **kwargs):
        super(OrganisationForm, self).__init__(*args, **kwargs)
        self.fields['website'].widget = forms.TextInput(attrs={'value': 'https://www.'})