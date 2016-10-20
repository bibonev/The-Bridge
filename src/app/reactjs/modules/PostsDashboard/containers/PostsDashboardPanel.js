import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { loadPosts, loadComments, addCommentToPost, currentAuthorId, bookmarkOrganisation } from '../actions';
import { bindActionCreators } from 'redux';

import PostRepresentation from '../components/PostRepresentation';

class PostsDashboardPanel extends Component {
    componentWillMount() {
        const { loadPosts } = this.props;
        loadPosts();
    }

    render() {
        const { rows, count } = this.props.posts;
        const { org_u_rows, bookmark_orgs } = this.props.organisations_user;
        const { author_id } = this.props.comment_author_id
        const comments = this.props.comments;
        const { loadPosts, loadComments, addCommentToPost, currentAuthorId, bookmarkOrganisation } = this.props;

        const addCurrentComment = (post_id, author_id, comment) => addCommentToPost(post_id, author_id, comment);
        const showCommentsForPost = (post_id) => loadComments(post_id);
        const updateAuthorId = (author_id) => currentAuthorId(author_id);
        const bookmarkCurrentOrganisation = (org_id) => bookmarkOrganisation(org_id);

        return (
            <div className="posts-dashboard-list">
                <PostRepresentation data={rows} comments={comments} org_u_rows={org_u_rows} showCommentsForPost={showCommentsForPost} addCurrentComment={addCurrentComment} 
                updateAuthorId={updateAuthorId} author_id={author_id} bookmarkCurrentOrganisation={bookmarkCurrentOrganisation} bookmark_orgs={bookmark_orgs}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
    comments: state.comments,
    organisations_user: state.organisations_user,
    comment_author_id: state.comment_author_id
})

const mapDispatchToProps = dispatch => bindActionCreators({
    loadPosts, loadComments, addCommentToPost, currentAuthorId, bookmarkOrganisation
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PostsDashboardPanel);