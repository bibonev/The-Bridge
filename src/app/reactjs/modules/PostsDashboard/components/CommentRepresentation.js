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
        const userOrOrganisation = (comment) => {
            let author = comment.author;
            if(author.first_name){
                return comment.author.first_name
            }else if(author.title){
                return comment.author.title
            }else{
                return "No author"
            }
        }
        const commentsResult = comments.map(comment =>
                           <li key={comment.id} className="comments-dashboard">
                               <div>
                                <a href="#" className="authorCommentLink">{userOrOrganisation(comment)}</a>
                                {comment.text}
                                <span className="post-comment-dateTime">{comment.timestamp}</span>
                               </div>
                           </li>
                   )
        return <ul className="commentsDisplay">
                {commentsResult}
            </ul>
    }
}