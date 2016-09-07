import React from 'react'

export default class CommentRepresentation extends React.Component{
    constructor(props){
        super(props)
    }
    componentWillMount() {
        this.props.showCommentsForPost(this.props.postId);
    }
    render(){
        const comments = this.props.comments[this.props.postId] || []
        const commentsResult = comments.map(comment =>
                           <li key={comment.id} className="comments-dashboard">
                               <span>{comment.author.first_name}</span>
                               {comment.text}
                           </li>
                   )
        return <ul>
                {commentsResult}
            </ul>
    }
}