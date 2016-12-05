from django.shortcuts import render

def conversation(request, label):
    # Get the conversation
    conversation = Conversation.objects.get(label=label)

    # We want to show the last 50 messages, ordered most-recent-last
    messages = reversed(conversation.messages.order_by('-timestamp')[:50])

    return render(request, "chat/conversation.html", {
        'conversation': conversation,
        'messages': messages,
    })