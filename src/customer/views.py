from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from developer import models
# Create your views here.

@login_required
def home_page(request):
    # set the session 'role' to customer
    request.session['role'] = 'customer'
    request.session.modified = True
    organisations = models.Organisation.objects.all()

    return render(request, 'customer/home.html', {'organisations':organisations})

@login_required
def organisation_details(request, pk):
    organisation = get_object_or_404(models.Organisation, pk=pk)

    return render(request, 'customer/organisation_details.html', {'org':organisation})

@login_required
def organisation_details_search_by_title(request, title):
    organisation = get_object_or_404(models.Organisation, title=title)

    return render(request, 'customer/organisation_details.html', {'org':organisation})


