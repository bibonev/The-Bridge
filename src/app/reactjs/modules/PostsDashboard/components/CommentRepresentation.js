import React from 'react'

export default class CommentRepresentation extends React.Component{
    constructor(props){
        super(props)
        this.showCommentsAPI = this.showCommentsAPI.bind(this)
        this.state = {data: []}
    }
    showCommentsAPI(){
        let post_id = this.props.postId;
        let url = `http://localhost:8000/api/v1/comments/?post=${post_id}`
        // GET request using async data - ability to save the data and use it afterwards
        // $.ajax({
        //     type: 'GET',
        //     dataType: 'json',
        //     url: url,
        //     async: false,
        //     success:function(data) {
        //         this.props.showCommentsForPost(data, post_id)
        //         this.setState({
        //             data: data
        //         });
        //     }.bind(this),
        //     error: function(data) {
        //         console.log(data)
        //     }.bind(this)
        // });

        $.get(url, data => {
            this.props.showCommentsForPost(data, post_id)
                this.setState({
                    data: data
                });
        });

    }
    componentDidMount() {
        this.showCommentsAPI();
    }
    render(){
        const commentsResult = this.state.data.map(comment =>
                           <li key={comment.id} className="comments-dashboard">
                               {comment.text}
                           </li>
                   )
        return <ul>
                {commentsResult}
            </ul>
    }
}