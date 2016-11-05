import reversion
from reversion.models import Version
from datetime import datetime
from django.utils.formats import get_format
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from partnership.models import Relation, PendingRequest
from posts.models import Post
from . import forms, models

# Create your views here.

@login_required
def home_page(request):
    '''Display organisation home page'''
    # set the session 'role' to supplier
    request.session['role'] = 'organisation'
    request.session.modified = True
    return render(request, 'organisation/home.html')

# display template with all user's organisations'
@login_required
def my_organisations(request):
    '''Display user's organisations'''
    # filter all organisations of the curent user
    my_organisations = models.Organisation.objects.filter(host=request.user)

    return render(request, 'organisation/my_organisations.html', {'my_organisations':my_organisations})

# display template with details of the specific organisation
@login_required
def my_organisation_details(request, pk):
    '''Display user's organisations details'''
    # get Organisation object with specific pk
    my_organisation = get_object_or_404(models.Organisation, pk=pk, host=request.user)

    return render(request, 'organisation/my_organisation_details.html', {'org':my_organisation})

# display template which gives ability to edit organisation
@login_required
def my_organisation_edit(request, pk):
    '''Edit user's organisaitons'''
    # submit update form
    org_instance = get_object_or_404(models.Organisation, pk=pk, host=request.user)
    if request.method == 'POST':
        # saves instance of the particular organisation object
        organisation_form = forms.OrganisationForm(request.POST, request.FILES, instance=org_instance)
        if organisation_form.is_valid():
            with reversion.create_revision():
                organisation_form.save()
            Post.create_post_org_change(org_instance)
            return HttpResponseRedirect(reverse('customer:organisation_details', kwargs={'pk':pk}))
    else:
        organisation_form = forms.OrganisationForm(instance=org_instance)

    return render(request, 'organisation/my_organisation_edit.html', {'organisation_form': organisation_form})

# display template for organisation creation
@login_required
def create_organisation(request):
    '''Create organisation'''
    form = forms.OrganisationForm()
    # submit creation form
    if request.method == 'POST':
        form = forms.OrganisationForm(request.POST, request.FILES)
        if form.is_valid():
            # before saving the form allocates it to the particular user
            org = form.save(commit=False)
            org.host = request.user
            org.save()
            # create initial post when an organisation is added
            description = org.title + " has joined on " + str(datetime.now().strftime("%d %B %Y"))
            Post.objects.create(description=description, organisation=org)
            return HttpResponseRedirect(reverse('customer:organisation_details', kwargs={'pk': org.pk}))
    
    return render(request, 'organisation/create_organisation.html', {'form':form})

# display list with all requests
@login_required
def requests(request):
    '''Organisations received requests'''

    org_requests = set()

    # loop through all users organisaitons to see which have requests
    for organisation in models.Organisation.objects.filter(host=request.user):
        org_requests = org_requests.union(PendingRequest.get_pending_requests_for_organisation(organisation=organisation))

    if request.method == 'POST':
         # check whether the post request is on the request form: 'accept_request' is the name of the submit button
        if 'accept_request' in request.POST:
            curr_request = get_object_or_404(PendingRequest, pk=request.POST.get('customer_request'))
            curr_request.approve()
            return HttpResponseRedirect(reverse('organisation:requests'))

    return render(request, 'organisation/requests.html', {'org_requests': org_requests})

@login_required
def organisation_studio(request, pk):
    '''Current organisation studio'''

    have_organisations = False
    if models.Organisation.objects.filter(host=request.user):
       have_organisations = True


    organisation = get_object_or_404(models.Organisation, pk=pk, host=request.user)

    return render(request, 'organisation/organisation_studio.html', {'org':organisation, 'have_organisations':have_organisations})
        
