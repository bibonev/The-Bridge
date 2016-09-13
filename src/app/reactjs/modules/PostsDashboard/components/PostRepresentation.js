import React from 'react';
import CommentForm from '../components/CommentForm';
import CommentRepresentation from '../components/CommentRepresentation';

export default (props) => {
    const data = props.data.map(post =>
      <div key={post.id} className="posts-dashboard">
        <a href="#" className="post-title">{post.organisation.title}</a>
        <div className="post-description">{post.description}</div>
        <CommentForm org_u_rows={props.org_u_rows} postId={post.id} addCurrentComment={props.addCurrentComment} updateAuthorId={props.updateAuthorId} author_id={props.author_id}/>
        <CommentRepresentation comments={props.comments} postId={post.id} showCommentsForPost={props.showCommentsForPost}/>
      </div>
    )
    return <div>
        {data}
    </div>
}