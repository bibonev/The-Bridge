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
            return HttpResponseRedirect('http://localhost:8000/organisations/' + str(pk))
    else:
        organisation_form = forms.OrganisationForm(instance=org_instance)

    return render(request, 'organisation/my_organisation_edit.html', {'organisation_form': organisation_form})

# display template for organisation creation
@login_required
def create_organisation(request):
    '''Create organisation'''
    # set the organisaiton_id session to the latest created by the user
    request.session['organisation_id'] = pk
    request.session.modified = True

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
            return HttpResponseRedirect('http://localhost:8000/organisations/' + str(org.pk))
    
    return render(request, 'organisation/create_organisation.html', {'form':form})

@login_required
def organisation_studio(request, pk):
    '''Current organisation studio'''

    # update organisation_id session to the latest the user used
    request.session['organisation_id'] = pk
    request.session.modified = True

    have_organisations = False
    if models.Organisation.objects.filter(host=request.user):
       have_organisations = True

    return render(request, 'organisation/organisation_studio.html', {'have_organisations':have_organisations, 'pk':pk})
        
