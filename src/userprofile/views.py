from django.shortcuts import render, render_to_response, redirect
from django.shortcuts import HttpResponseRedirect, Http404, HttpResponse
from django.template import RequestContext
from django.contrib.auth.decorators import login_required

# Create your views here.
from userprofile.forms import UserForm
from userprofile.forms import UserProfileForm

@login_required
def userprofile(request):
    if request.method == 'POST':
        user_form = UserForm(request.POST, instance=request.user)
        user_profile = UserProfileForm(request.POST, request.FILES, instance=request.user.profile)
        if user_form.is_valid() and user_profile.is_valid():
            user_form.save()
            user_profile.save()
    else:
        user_form = UserForm(instance=request.user,
            initial={
                'first_name': request.user.first_name,
                'last_name': request.user.last_name,
                'email': request.user.email,
            })
        user = request.user
        profile = user.profile
        user_profile = UserProfileForm(instance=profile)

    role_path = ''.join([request.session.get('role'), '/base.html'])

    return render_to_response('userprofile/profile.html', {'user_form': user_form, 'user_profile': user_profile, 'user_role_path':role_path}, context_instance=RequestContext(request))