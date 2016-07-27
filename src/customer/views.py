from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.http import HttpResponse
from django.contrib.auth.models import User
from developer.models import Organisation
from friendship.exceptions import AlreadyExistsError
from partnership.models import Relation, PendingRequest
from developer import models

@login_required
def home_page(request):
    # set the session 'role' to customer
    request.session['role'] = 'customer'
    request.session.modified = True
    organisations = models.Organisation.objects.all()
    query = request.GET.get('searchTerm')

    if query:
        organisations = organisations.filter(
                                Q(title__icontains=query) |
                                Q(description__icontains=query) |
                                Q(host__first_name__icontains=query) |
                                Q(host__last_name__icontains=query)  
                                ).distinct()

    return render(request, 'customer/home.html', {'organisations':organisations})

@login_required
def organisation_details(request, pk):

    organisation = get_object_or_404(models.Organisation, pk=pk)

    if request.method == 'POST':
        to_user = Organisation.objects.get(pk=request.POST.get('hidden_org_id'))
        from_user = request.user
        PendingRequest.objects.create(user=from_user, organisation=to_user, sender='0')
        print('request is send to org')

    return render(request, 'customer/organisation_details.html', {'org':organisation})



