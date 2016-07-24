from django import forms
from userprofile.models import User
from userprofile.models import UserProfile

class UserForm(forms.ModelForm):
    email = forms.CharField(widget=forms.Textarea, label='')
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name',)
    

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ('user_picture',)