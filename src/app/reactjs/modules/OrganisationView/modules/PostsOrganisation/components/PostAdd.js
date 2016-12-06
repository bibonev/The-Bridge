import React from 'react'
import Textarea from 'react-textarea-autosize'

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
                    <form className="postAddForm" onSubmit={this.handleSubmit} method="POST">
                        <Textarea className="addPostField" type="text" ref="posttext" placeholder="Write your post..."></Textarea>
                        <input type="submit" value="Post" className="addPostButton"/> 
                    </form>
               </div>
    }
}