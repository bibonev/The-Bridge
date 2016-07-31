from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.http import HttpResponse
from django.contrib.auth.models import User
from partnership.models import Relation, PendingRequest
from developer import models

@login_required
def home_page(request):
    # set the session 'role' to customer
    request.session['role'] = 'customer'
    request.session.modified = True

    return render(request, 'customer/home.html')

@login_required
def organisations(request):
    organisations = models.Organisation.objects.all()
    query = request.GET.get('searchTerm')

    if query:
        organisations = organisations.filter(
                                Q(title__icontains=query) |
                                Q(description__icontains=query) |
                                Q(host__first_name__icontains=query) |
                                Q(host__last_name__icontains=query)  
                                ).distinct()

    return render(request, 'customer/organisations.html', {'organisations':organisations})

@login_required
def organisation_details(request, pk):
    # view the particular ogranisation
    organisation = get_object_or_404(models.Organisation, pk=pk)

    # request_state: -1 if the is not relation, 0 if user has send request, 1 if user's request is approved
    request_state = -1
    if Relation.together(request.user, organisation):
        request_state = 1
    elif Relation.pending(request.user, organisation):
        request_state = 0

    # if a request send button is clicked
    if request.method == 'POST':
        # check whether the post request is on the request form: 'request_organisation' is the name of the submit button
        if "request_organisation" in request.POST:
            organisation = models.Organisation.objects.get(pk=request.POST.get('hidden_org_id'))
            user = request.user
            PendingRequest.send_request(user, organisation)

    return render(request, 'customer/organisation_details.html', {'org':organisation, 'request_state': request_state})



