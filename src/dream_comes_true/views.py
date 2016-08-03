from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.db.models import Q
from developer import models

# if the cookie is supplier redirects to supplier, if the cookie is customer redirects to customer 
def base_page(request):
    role = request.session.get('role')
    if request.user.is_authenticated():
        if role:
            if request.session.get('role') == 'developer':
                return HttpResponseRedirect(reverse('developer:home'))
            elif request.session.get('role') == 'customer':
                return HttpResponseRedirect(reverse('customer:home'))
        else:
            return HttpResponseRedirect(reverse('customer:home'))
    else:
        organisations = models.Organisation.objects.all()
        query = request.GET.get('searchTerm')

        if query:
            organisations = organisations.filter(
                                    Q(title__icontains=query) |
                                    Q(description__icontains=query) |
                                    Q(host__first_name__icontains=query) |
                                    Q(host__last_name__icontains=query)  
                                    ).distinct()

        return render(request, 'home.html', {'organisations':organisations})
