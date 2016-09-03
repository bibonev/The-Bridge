import React from 'react'

const submit = (props, values) => {
    let post_id = props.postId;
    let url = `http://localhost:8000/api/v1/comments/create/?type=user&post_id=${post_id}`
    let type = 'POST'
    
    $.ajax({
        type,
        url,
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        },
        data: values,
        success: (d) => {
            props.addCurrentComment(d, post_id)
        },
        error: (d) => {
            console.log(d);
        }
    });
}

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrfSafeMethod = (method) => {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

const CommentForm = React.createClass({
    handleSubmit(e){
        e.preventDefault();
        let commentText = this.refs.commenttext.value;
        let values = {text: commentText}
        submit(this.props, values);
    },
    render(){
        return <form onSubmit={this.handleSubmit}>
                    <input type="text" ref="commenttext" placeholder="Comment"/>
                    <input type="submit" value="Comment"/> 
               </form>
    }
});

export default CommentForm;