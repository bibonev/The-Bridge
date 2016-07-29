from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from partnership.models import Relation, PendingRequest
from developer.models import Organisation
from . import forms, models

# Create your views here.

@login_required
def home_page(request):
    # set the session 'role' to supplier
    request.session['role'] = 'developer'
    request.session.modified = True
    return render(request, 'developer/home.html')

@login_required
def my_organisations(request):
    my_organisations = Organisation.objects.filter(host=request.user)

    return render(request, 'developer/my_organisations.html', {'my_organisations':my_organisations})

@login_required
def my_organisation_details(request, pk):

    my_organisation = get_object_or_404(models.Organisation, pk=pk, host=request.user)

    return render(request, 'developer/my_organisation_details.html', {'org':my_organisation})


@login_required
def create_organisation(request):
    form = forms.OrganisationForm()
    if request.method == 'POST':
        form = forms.OrganisationForm(request.POST, request.FILES)
        if form.is_valid():
            org = form.save(commit=False)
            org.host = request.user
            org.save()
            return HttpResponseRedirect('/')
    
    return render(request, 'developer/create_organisation.html', {'form':form})

@login_required
def friendship_request_list(request, pk):

    friendship_requests = PendingRequest.get_pending_requests_for_organisation(organisation=Organisation.objects.get(pk=pk, host=request.user))
    if request.method == 'POST':
        print("in post requst list")
        f_request = get_object_or_404(PendingRequest, pk=request.POST.get('customer_request'))
        f_request.approve()
        print('f_request is send')
        return HttpResponse('You added a friend')

    return render(request, 'developer/friendship_request_list.html', {'requests': friendship_requests})
        
