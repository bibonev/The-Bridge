import React from 'react';
import CommentForm from '../components/CommentForm';
import CommentRepresentation from '../components/CommentRepresentation';

export default class PostRepresentation extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const bookmarkOrganisation = (org_id) => this.props.bookmarkCurrentOrganisation(org_id)
        const buttonDisplay = (org_id) => {
          for(var org of this.props.bookmark_orgs){
            if(org.id == org_id){
              return <i className="fa fa-bookmark booked-org" aria-hidden="true"></i>
            }
          }
          return <i className="fa fa-bookmark non-booked-org" aria-hidden="true"></i>
        }

        const request_status = (org) => {
          for(var pending_request of this.props.pending_requests){
            if(pending_request.organisation.id == org.id){
              return <i className="fa fa-clock-o request-status pending-status-icon" aria-hidden="true"></i>
            }
          }
          for(var relation of this.props.relations){
            if(relation.organisation.id == org.id){
              return <i className="fa fa-users request-status relation-status-icon" aria-hidden="true"></i>
            }
          }
          return <button onClick={() => bookmarkOrganisation(org.id)} className="bookmark-button">{buttonDisplay(org.id)}</button>
        }

        const data = this.props.data.map(post =>
          <div key={post.id} className="posts-dashboard">
          <div className="post-main-details">
            <a href={"//localhost:8000/organisations/" + post.organisation.id} className="post-title">
              <img src={"//localhost:8000" + post.organisation.front_picture} width="40" height="40" />
              <span className="post-author">{post.organisation.title}</span>
              <div className="rating-org"><span className="ratingNum">{post.organisation.rating}</span><span className="glyphicon glyphicon-star ratingStar" aria-hidden="true"></span></div>
              <span className="post-comment-dateTime">{post.timestamp}</span>
            </a>
            {request_status(post.organisation)}
          </div>
            <div className="post-description">{post.description}</div>
            <CommentRepresentation comments={this.props.comments} postId={post.id} showCommentsForPost={this.props.showCommentsForPost}/>
            <CommentForm org_u_rows={this.props.org_u_rows} postId={post.id} addCurrentComment={this.props.addCurrentComment} updateAuthorId={this.props.updateAuthorId} author_id={this.props.author_id}/>
          </div>
        )
        return <div>
                {data}
            </div>
    }
}