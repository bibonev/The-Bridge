import React from 'react'

export default class CommentForm extends React.Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onClickAuthorToPost = this.onClickAuthorToPost.bind(this)
    }
    handleSubmit(e){
        e.preventDefault();
        let commentText = this.refs.commenttext.value;
        this.refs.commenttext.value = '';
        let commentAuthorId = parseInt(this.refs.authorid.value); // CHANGE THIS - pass a variable to the handleSubmit function instaed of using a hidden input
        let values = {text: commentText}
        this.props.addCurrentComment(this.props.postId, commentAuthorId, values)
    }
    onClickAuthorToPost(org_id){
        this.props.updateAuthorId(org_id)
    }
    render(){
        const commentAuthorId = this.props.author_id || -1;
        const commentAuthorIdStr = commentAuthorId.toString();
        const currUserOrg = this.props.org_u_rows.map(org => 
                <button onClick={() => this.onClickAuthorToPost(org.id)} key={org.id}>
                    {org.title} |
                </button>
            )
        return  <div>
                    <div>
                        <button onClick={() => this.onClickAuthorToPost(-1)}>You</button>
                        {currUserOrg}
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="hidden" ref="authorid" readOnly = "readonly" value={commentAuthorIdStr}/>
                        <input type="text" ref="commenttext" placeholder="Comment"/>
                        <input type="submit" value="Comment"/> 
                    </form>
               </div>
    }
}