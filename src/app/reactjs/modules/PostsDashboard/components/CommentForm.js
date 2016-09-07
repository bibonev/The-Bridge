import React from 'react'

export default class CommentForm extends React.Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onClickAuthorToPost = this.onClickAuthorToPost.bind(this)
        this.commentAuthorId = -1;
    }
    handleSubmit(e){
        e.preventDefault();
        let commentText = this.refs.commenttext.value;
        this.refs.commenttext.value = '';
        let values = {text: commentText}
        this.props.addCurrentComment(this.props.postId, this.commentAuthorId, values)
    }
    onClickAuthorToPost(org_id){
        this.commentAuthorId = org_id
    }
    render(){
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
                        <input type="text" ref="commenttext" placeholder="Comment"/>
                        <input type="submit" value="Comment"/> 
                    </form>
               </div>
    }
}