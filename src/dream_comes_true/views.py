from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.db.models import Q
from developer import models as developer_models

# if the cookie is supplier redirects to supplier, if the cookie is customer redirects to customer 
def base_page(request):
    '''Render different pages on '/' url regarding user status'''
    role = request.session.get('role')
    if request.user.is_authenticated():
        if role:
            if request.session.get('role') == 'developer':
                return HttpResponseRedirect(reverse('developer:home')) # render to developer page
            elif request.session.get('role') == 'customer':
                return HttpResponseRedirect(reverse('customer:home')) # render to customer page
        else:
            return HttpResponseRedirect(reverse('customer:home')) # by default render to customer home page
    else:
        organisations = developer_models.Organisation.objects.all()
        query = request.GET.get('searchTerm')

        if query:
            organisations = organisations.filter(
                                    Q(title__icontains=query) |
                                    Q(description__icontains=query) |
                                    Q(host__first_name__icontains=query) |
                                    Q(host__last_name__icontains=query)  
                                    ).distinct()

        return render(request, 'home.html', {'organisations':organisations})


def organisation_details_not_auth(request, pk):
    '''Display organisation details when user not auth'''
    # view the particular ogranisation
    organisation = get_object_or_404(developer_models.Organisation, pk=pk)

    return render(request, 'organisation_details_not_auth.html', {'org':organisation})