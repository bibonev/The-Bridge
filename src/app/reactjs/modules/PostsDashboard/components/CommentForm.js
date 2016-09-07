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
        const currUserOrg = this.props.org_u_rows.map(org => 
                <span key={org.id}>
                    {org.title} |
                </span>
            )
        return <form onSubmit={this.handleSubmit}>
                    <div>
                    {currUserOrg}
                    </div>
                    <input type="text" ref="commenttext" placeholder="Comment"/>
                    <input type="submit" value="Comment"/> 
               </form>
    }
}