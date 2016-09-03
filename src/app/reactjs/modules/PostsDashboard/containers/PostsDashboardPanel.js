import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { loadPosts, loadComments, addCommentToPost } from '../actions';
import { bindActionCreators } from 'redux';

import PostRepresentation from '../components/PostRepresentation';

class PostsDashboardPanel extends Component {
    componentWillMount() {
        const { loadPosts,  } = this.props;
        loadPosts();
    }

    render() {
        const { rows, count } = this.props.posts;
        const { loadPosts, loadComments, addCommentToPost } = this.props;

        const addCurrentComment = (comment, id) => addCommentToPost(comment, id);
        const showCommentsForPost = (comments, id) => loadComments(comments, id);

        return (
            <div className="posts-dashboard-list">
                <PostRepresentation data={rows} addCurrentComment={addCurrentComment} showCommentsForPost={showCommentsForPost}/>
            </div>
        );
    }
}
//////////////
// THE ACTION IS NOT DISPATCHED - PROBLEMMMMM!!!!!!!
////////////////

const mapStateToProps = state => ({
    posts: state.posts,
    comments: state.comments,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    loadPosts, loadComments, addCommentToPost
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PostsDashboardPanel);