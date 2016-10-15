from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.db.models import Q
from organisation import models as organisation_models

# if the cookie is supplier redirects to supplier, if the cookie is customer redirects to customer 
def base_page(request):
    if request.user.is_authenticated():
        return render(request, 'posts/dashboard.html') # render all posts from posts/dashboard.html
    else:
        return render(request, 'home.html') # render home page