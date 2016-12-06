from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.db.models import Q
from organisation import models as organisation_models

# if the cookie is supplier redirects to supplier, if the cookie is customer redirects to customer 
def base_page(request):

    if request.user.is_authenticated():
        
        # save user's organisation for studio
        have_organisations = False
        organisations = organisation_models.Organisation.objects.filter(host=request.user)
        if organisations:
            have_organisations = True
            # use sessions to modify the organisation_id
            if not 'organisation_id' in request.session:
                request.session['organisation_id'] = organisations[0].pk
                request.session.modified = True

        return render(request, 'posts/dashboard.html', {'have_organisations':have_organisations}) # render all posts from posts/dashboard.html
    else:
        return render(request, 'home.html') # render home page
