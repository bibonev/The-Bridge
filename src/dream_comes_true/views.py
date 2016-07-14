from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse

# if the cookie is supplier redirects to supplier, if the cookie is customer redirects to customer 
def base_page(request):
    role = request.session.get('role')
    print(role)
    if request.user.is_authenticated():
        if role:
            if request.session.get('role') == 'supplier':
                return HttpResponseRedirect(reverse('supplier:home'))
            elif request.session.get('role') == 'customer':
                return HttpResponseRedirect(reverse('customer:home'))
        else:
            return HttpResponseRedirect(reverse('customer:home'))
    else:
        return render(request, 'base.html')
