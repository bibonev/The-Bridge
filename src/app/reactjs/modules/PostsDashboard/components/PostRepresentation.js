import React from 'react';

export default (props) => {
    const data = props.data.map(post =>
      <div key={post.id} className="posts-dashboard">
        {post.description}
      </div>
    )
    return <div>
        {data}
    </div>
}