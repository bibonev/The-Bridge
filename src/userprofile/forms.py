from django import forms
from userprofile.models import User
from userprofile.models import UserProfile

class UserForm(forms.ModelForm):
    # form representing user details
    email = forms.CharField(widget=forms.Textarea, label='')
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name',)
    

class UserProfileForm(forms.ModelForm):
    # form representing user additional fields - profile picture
    class Meta:
        model = UserProfile
        fields = ('front_picture',)