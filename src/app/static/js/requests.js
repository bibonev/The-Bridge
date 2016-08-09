// Ajax post requests prevending reloading page on form submit
$(function() {
    $("#request_form").submit(function(event) {
        // Stop form from submitting normally
        event.preventDefault();
        var requestForm = $(this);
        var submitButton = $('#request_organisation');
        // add submit button to the serialize array for the post request in the views to check
        var formData = requestForm.serializeArray();
        formData.push({ name: submitButton.attr('name'), value: submitButton.val() });
        // Send the data using post
        var posting = $.post( requestForm.attr('action'), formData);
        // if success:
        posting.done(function(data) {
            // success actions, maybe change submit button to 'friend added' or whatever
            alert('Request is send!')
        });
        // if failure:
        posting.fail(function(data) {
            // 4xx or 5xx response, alert user about failure
        });
    });
});

$(function() {
    $(".accept_form").submit(function(event) {
        // Stop form from submitting normally
        event.preventDefault();
        var acceptForm = $(this);
        var submitButton = $('.accept_request');
        // add submit button to the serialize array for the post request in the views to check
        var formData = acceptForm.serializeArray();
        formData.push({ name: submitButton.attr('name'), value: submitButton.val() });
        // Send the data using post
        var posting = $.post( acceptForm.attr('action'), formData);
        // if success:
        posting.done(function(data) {
            // success actions, maybe change submit button to 'friend added' or whatever
            alert('Request is approved')
        });
        // if failure:
        posting.fail(function(data) {
            // 4xx or 5xx response, alert user about failure
        });
    });
});