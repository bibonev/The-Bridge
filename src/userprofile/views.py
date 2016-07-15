from django.shortcuts import render, render_to_response, redirect
from django.shortcuts import HttpResponseRedirect, Http404, HttpResponse
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.core.context_processors import csrf

# Create your views here.
from userprofile.forms import UserForm
from userprofile.forms import UserProfileForm

def userprofile(request):
    print('In userprofile view')
    if request.method == 'POST':
        print('when the request is POST')
        user_form = UserForm(request.POST, instance=request.user)
        user_profile = UserProfileForm(request.POST, request.FILES, instance=request.user.profile)
        if user_form.is_valid() and user_profile.is_valid():
            user_form.save()
            user_profile.save()
            print('Hello from valid!')
    else:
        print('NOT POST request')
        user_form = UserForm(instance=request.user,
            initial={
                'first_name': request.user.first_name,
                'last_name': request.user.last_name,
                'email': request.user.email,
            })
        user = request.user
        profile = user.profile
        user_profile = UserProfileForm(instance=profile)

    return render_to_response('userprofile/profile.html', {'user_form': user_form, 'user_profile': user_profile}, context_instance=RequestContext(request))