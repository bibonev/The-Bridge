import React from 'react'

export default class CommentForm extends React.Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e){
        e.preventDefault();
        let commentText = this.refs.commenttext.value;
        this.refs.commenttext.value = '';
        let values = {text: commentText}
        this.props.addCurrentComment(this.props.postId, values)
    }
    render(){
        return  <div>
                    <form className="commentForm" onSubmit={this.handleSubmit} method="POST">
                        <input type="text" ref="commenttext" placeholder="Write your comment..." className="commentFormInput"/>
                        <input className="commentFormSubmitButton" type="submit" value="Comment" hidden/> 
                    </form>
               </div>
    }
}