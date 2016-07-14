from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Create your views here.

@login_required
def home_page(request):
    # set the session 'role' to supplier
    request.session['role'] = 'supplier'
    request.session.modified = True
    return render(request, 'supplier/home.html')
