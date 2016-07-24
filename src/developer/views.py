from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.template import RequestContext
from friendship.exceptions import AlreadyExistsError
from partnership.models import Friend, FriendshipRequest
from . import forms

get_friendship_context_object_name = lambda: getattr(settings, 'FRIENDSHIP_CONTEXT_OBJECT_NAME', 'user')
get_friendship_context_object_list_name = lambda: getattr(settings, 'FRIENDSHIP_CONTEXT_OBJECT_LIST_NAME', 'users')

# Create your views here.

@login_required
def home_page(request):
    # set the session 'role' to supplier
    request.session['role'] = 'developer'
    request.session.modified = True
    return render(request, 'developer/home.html')

@login_required
def create_organisation(request):
    form = forms.OrganisationForm()
    if request.method == 'POST':
        form = forms.OrganisationForm(request.POST)
        if form.is_valid():
            org = form.save(commit=False)
            org.host = request.user
            org.save()
            return HttpResponseRedirect('/')
    
    return render(request, 'developer/create_organisation.html', {'form':form}, context_instance=RequestContext(request))

@login_required
def friendship_request_list(request):
    
    friendship_requests = FriendshipRequest.objects.filter(rejected__isnull=True)

    return render(request, 'developer/friendship_request_list.html', {'requests': friendship_requests})
        
