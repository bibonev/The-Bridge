import React from 'react';
import CommentRepresentation from '../../../../../shared_components/comment-representation'
import CommentForm from '../../../../../shared_components/comment-form'

export default (props) => {
    const data = props.data.map(post =>
      <div key={post.id} className="posts-dashboard">
      <div>
        <a href={"//localhost:8000/organisations/" + post.organisation.id} className="post-title">
          <img src={"//localhost:8000" + post.organisation.front_picture} width="40" height="40" />
          <span className="post-author">{post.organisation.title}</span>
          <span className="post-comment-dateTime">{post.timestamp}</span>
        </a>
      </div>
        <div className="post-description">{post.description}</div>
        <CommentRepresentation comments={props.comments} postId={post.id} showCommentsForPost={props.showCommentsForPost}/>
        <CommentForm org_u_rows={props.org_u_rows} postId={post.id} addCurrentComment={props.addCurrentComment} updateAuthorId={props.updateAuthorId} author_id={props.author_id}/>
      </div>
    )
    return <div>
        {data}
    </div>
}