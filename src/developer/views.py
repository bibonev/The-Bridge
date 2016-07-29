from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.template import RequestContext
from friendship.exceptions import AlreadyExistsError
from partnership.models import Relation, PendingRequest
from developer.models import Organisation
from . import forms

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
        form = forms.OrganisationForm(request.POST, request.FILES)
        if form.is_valid():
            print('organisation saved')
            org = form.save(commit=False)
            org.host = request.user
            org.save()
            return HttpResponseRedirect('/')
    
    return render(request, 'developer/create_organisation.html', {'form':form}, context_instance=RequestContext(request))

@login_required
def friendship_request_list(request, pk):

    friendship_requests = PendingRequest.get_pending_requests_for_organisation(organisation=Organisation.objects.get(pk=pk))
    if request.method == 'POST':
        print("in post requst list")
        f_request = get_object_or_404(PendingRequest, pk=request.POST.get('customer_request'))
        f_request.approve()
        print('f_request is send')
        return HttpResponse('You added a friend')

    return render(request, 'developer/friendship_request_list.html', {'requests': friendship_requests})
        
