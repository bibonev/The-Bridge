from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Create your views here.

@login_required
def home_page(request):
    # set the session 'role' to customer
    request.session['role'] = 'customer'
    request.session.modified = True
    return render(request, 'customer/home.html')
