from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.contrib.auth.models import User
from developer.models import Organisation
from friendship.exceptions import AlreadyExistsError
from partnership.models import Friend, FriendshipRequest
from developer import models

get_friendship_context_object_name = lambda: getattr(settings, 'FRIENDSHIP_CONTEXT_OBJECT_NAME', 'user')
get_friendship_context_object_list_name = lambda: getattr(settings, 'FRIENDSHIP_CONTEXT_OBJECT_LIST_NAME', 'users')

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
def friendship_add_organisation(request):
    print('Friend added')
    if request.method == 'POST':
        to_user = Organisation.objects.get(pk=request.POST.get('hidden_org_id'))
        from_user = request.user
        try:
            Friend.objects.add_friend(from_user, to_user)
            print('Been here, done that')
        except AlreadyExistsError as e:
            print('Exception when adding a friend ' + e)
        else:
            return HttpResponse('You added a friend')

    #return render(request, 'customer/organisation_details.html')


