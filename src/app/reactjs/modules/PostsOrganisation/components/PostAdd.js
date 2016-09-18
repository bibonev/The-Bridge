import React from 'react'

export default class PostAdd extends React.Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e){
        e.preventDefault();
        let postText = this.refs.posttext.value;
        this.refs.posttext.value = '';
        let values = {description: postText}
        this.props.addPostFromCurrOrg(values)
    }
    render(){
        return  <div>
                    <form className="postAddForm" onSubmit={this.handleSubmit}>
                        <textarea className="addPostField" type="text" ref="posttext" placeholder="Write your post..."></textarea>
                        <input type="submit" value="Post" className="addPostButton"/> 
                    </form>
               </div>
    }
}