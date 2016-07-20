from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.template import RequestContext
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
        form = forms.OrganisationForm(request.POST)
        if form.is_valid():
            org = form.save(commit=False)
            org.host = request.user
            org.save()
            return HttpResponseRedirect('/')
    
    return render(request, 'developer/create_organisation.html', {'form':form}, context_instance=RequestContext(request))
        
