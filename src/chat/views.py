from django.shortcuts import render
from . import models
from organisation import models as organisation_models

def conversation(request, label):
    # Get the conversation
    conversation, created = models.Conversation.objects.get_or_create(user=request.user, organisation=organisation_models.Organisation.objects.get(pk=1),label=label)

    # We want to show the last 50 messages, ordered most-recent-last
    messages = reversed(conversation.messages.order_by('-timestamp')[:50])

    return render(request, "chat/conversation.html", {
        'conversation': conversation,
        'messages': messages,
    })