from django.shortcuts import render, get_object_or_404, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from . import models, forms


@login_required
def dashboard(request):
    '''Displays customer dashboard'''

    #set the session 'role' to customer
    request.session['role'] = 'customer'
    request.session.modified = True

    posts = models.Post.objects.all()

    comment_form = forms.CommentForm()

    if request.method == 'POST':
        if ''.join(['comment-on-post-', request.POST.get('post_id')]) in request.POST:
            comment_form = forms.CommentForm(request.POST)
            if comment_form.is_valid():
                comm = comment_form.save(commit=False)
                comm.post = models.Post.objects.get(pk=request.POST.get('post_id'))
                comment_object_type = request.user
                comm.content_type = ContentType.objects.get(model=ContentType.objects.get_for_model(comment_object_type.__class__))
                comm.object_id = comment_object_type.pk
                comm.save()
                return HttpResponseRedirect(reverse('customer:posts:dashboard'))


    return render(request, 'posts/dashboard.html', {'posts':posts, 'comment_form':comment_form})

