from django.shortcuts import render, render_to_response, redirect
from django.shortcuts import HttpResponseRedirect, Http404, HttpResponse
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from userprofile.forms import UserForm
from userprofile.forms import UserProfileForm

@login_required
def userprofile(request):
    # update user profile submit
    if request.method == 'POST':
        user_form = UserForm(request.POST, instance=request.user)
        user_profile = UserProfileForm(request.POST, request.FILES, instance=request.user.profile)
        if user_form.is_valid() and user_profile.is_valid():
            user_form.save()
            user_profile.save()
            return HttpResponseRedirect(reverse('profile:user'))
    else:
        # shows form with user profile's details
        user_form = UserForm(instance=request.user,
            initial={
                'first_name': request.user.first_name,
                'last_name': request.user.last_name,
                'email': request.user.email,
            })
        user = request.user
        profile = user.profile
        user_profile = UserProfileForm(instance=profile)
    

    return render(request, 'userprofile/profile.html', {'user_form': user_form, 'user_profile': user_profile})