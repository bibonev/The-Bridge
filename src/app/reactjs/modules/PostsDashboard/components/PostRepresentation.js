import React from 'react';
import CommentForm from '../components/CommentForm';
import CommentRepresentation from '../components/CommentRepresentation';

export default (props) => {
    const data = props.data.map(post =>
      <div key={post.id} className="posts-dashboard">
        {post.description}
        {/*<ul>
          {post.comments.map(comment =>
          <li key={comment.id}>{comment.text}</li>
          )}
        </ul>*/}
        <CommentRepresentation postId={post.id} showCommentsForPost={props.showCommentsForPost}/>
        <CommentForm postId={post.id} addCurrentComment={props.addCurrentComment}/>
   </div>
    )
    return <div>
        {data}
    </div>
}