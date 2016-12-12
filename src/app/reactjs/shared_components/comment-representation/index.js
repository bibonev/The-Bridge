import React from 'react'

export default class CommentRepresentation extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount() {
        this.props.showCommentsForPost(this.props.postId);
    }
    render(){
        const comments = this.props.comments[this.props.postId] || []
        const userOrOrganisation = (comment) => {
            let author = comment.author;
            if(author.first_name){
                return <div className="authorCommentDetails">
                            <img src={`//localhost:${port}` + author.front_picture} width="32" height="32" />
                            <span className="comment-author">{author.first_name} {author.last_name}</span>
                            <span className="post-comment-dateTime">{comment.timestamp}</span>
                        </div>
            }else if(author.title){
                return  <div className="authorCommentDetails">
                            <a href={`//localhost:${port}/organisations/` + author.id}>
                                <img src={`//localhost:${port}` + author.front_picture} width="32" height="32" />
                                <span className="comment-author">{author.title}</span>
                                <span className="post-comment-dateTime">{comment.timestamp}</span>
                            </a>
                        </div>
            }else{
                return "No author"
            }
        }
        const commentsResult = comments.map(comment =>
                           <li key={comment.id} className="comments-dashboard">
                               <div>
                                {userOrOrganisation(comment)}
                                {comment.text}
                               </div>
                           </li>
                   )
        return <ul className="commentsDisplay">
                {commentsResult}
            </ul>
    }
}