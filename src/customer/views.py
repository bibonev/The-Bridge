from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.http import HttpResponseRedirect
from partnership.models import Relation, PendingRequest
from organisation import models as organisation_models
from chat import models as chat_models

@login_required
def customer_requests(request):
    '''Dispaly cusotmer requests and bookmarks'''
    bookmarked_organisations = organisation_models.Organisation.objects.filter(bookmark__in=[request.user])
    return render(request, 'customer/requests.html', {'bookmarked_organisations': bookmarked_organisations})

@login_required
def organisations(request):
    '''Display all organisations'''
    organisations = organisation_models.Organisation.objects.all()
    query = request.GET.get('searchTerm')

    # Search organisations by a particular query
    if query:
        organisations = organisations.filter(
                                Q(title__icontains=query) |
                                Q(description__icontains=query) |
                                Q(host__first_name__icontains=query) |
                                Q(host__last_name__icontains=query)  |
                                Q(locations__icontains=query)
                                ).distinct()

    return render(request, 'customer/organisations.html', {'organisations':organisations})

@login_required
def organisation_view(request, pk):
    '''Display details of each organisation'''
    # view the particular ogranisation
    organisation = get_object_or_404(organisation_models.Organisation, pk=pk)

    # request_state: -1 if the is not relation, 0 if user has send request, 1 if user's request is approved
    request_state = 0
    if Relation.together(request.user, organisation):
        request_state = 2
    elif Relation.pending(request.user, organisation):
        request_state = 1
    elif Relation.own_organisation(request.user, organisation):
        request_state = -1

    # ability to edit organisation if the user is the owner
    owner = False
    if organisation.host == request.user:
        owner = True
    
    # if a request send button is clicked
    if request.method == 'POST':
        # check whether the post request is on the request form: 'request_organisation' is the name of the submit button
        if "request_organisation" in request.POST:
            port = request.META['SERVER_PORT']
            organisation = get_object_or_404(organisation_models.Organisation, pk=request.POST.get('hidden_org_id'))
            request_text = request.POST.get('request_text')
            user = request.user
            PendingRequest.send_request(user, organisation, request_text)
            # get the lates conversation record
            label_num = 0
            conversation= chat_models.Conversation.objects.all()
            if conversation.count() > 0:
                label_num = conversation.order_by('-id')[0].pk + 1
            # create unique label based on name of user, title and id of previous conversation object
            label = str(user.first_name) + str(user.last_name) + str(organisation.title).replace(" ", "") + str(label_num)
            chat_models.Conversation.objects.create(user=user, organisation=organisation,label=label.lower())
            return HttpResponseRedirect('http://localhost:' + port + '/organisations/' + str(pk))

    return render(request, 'customer/organisation_view.html', {'org':organisation, 'request_state': request_state,'owner':owner})

# @login_required
# def organisation_details_reviews(request, pk):
#     '''Display details of each organisation showing reviews'''
#     # view the particular ogranisation
#     organisation = get_object_or_404(organisation_models.Organisation, pk=pk)

#     # request_state: -1 if the is not relation, 0 if user has send request, 1 if user's request is approved
#     request_state = 0
#     if Relation.together(request.user, organisation):
#         request_state = 2
#     elif Relation.pending(request.user, organisation):
#         request_state = 1
#     elif Relation.own_organisation(request.user, organisation):
#         request_state = -1

#     # ability to edit organisation if the user is the owner
#     owner = False
#     if organisation.host == request.user:
#         owner = True

#     # if a request send button is clicked
#     if request.method == 'POST':
#         # check whether the post request is on the request form: 'request_organisation' is the name of the submit button
#         if "request_organisation" in request.POST:
#             organisation = get_object_or_404(organisation_models.Organisation, pk=request.POST.get('hidden_org_id'))
#             request_text = request.POST.get('request_text')
#             user = request.user
#             PendingRequest.send_request(user, organisation, request_text)
#             return HttpResponseRedirect(reverse('customer:organisation_details_reviews', kwargs={'pk':pk}))

#     return render(request, 'customer/organisation_details_reviews.html', {'org':organisation, 'request_state': request_state, 'owner':owner})



