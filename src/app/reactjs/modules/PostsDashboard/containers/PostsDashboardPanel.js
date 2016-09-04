import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { loadPosts, loadComments, addCommentToPost } from '../actions';
import { bindActionCreators } from 'redux';

import PostRepresentation from '../components/PostRepresentation';

class PostsDashboardPanel extends Component {
    componentWillMount() {
        const { loadPosts } = this.props;
        loadPosts();
    }

    render() {
        const { rows, count } = this.props.posts;
        const comments = this.props.comments;
        const { loadPosts, loadComments, addCommentToPost } = this.props;

        const addCurrentComment = (post_id, comment) => addCommentToPost(post_id, comment);
        const showCommentsForPost = (post_id) => loadComments(post_id);

        return (
            <div className="posts-dashboard-list">
                <PostRepresentation data={rows} comments={comments} showCommentsForPost={showCommentsForPost} addCurrentComment={addCurrentComment}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
    comments: state.comments,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    loadPosts, loadComments, addCommentToPost
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PostsDashboardPanel);