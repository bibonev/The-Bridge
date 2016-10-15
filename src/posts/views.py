from django.contrib.auth.decorators import login_required


@login_required
def dashboard(request):
    '''Displays dashboard with all posts'''
    return render(request, 'posts/dashboard.html')

