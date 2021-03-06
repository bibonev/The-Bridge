import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { loadPosts, addPost, loadComments, addCommentToPost, currentAuthorId } from '../actions';
import { bindActionCreators } from 'redux';

import PostAdd from '../components/PostAdd';
import PostRepresentation from '../components/PostRepresentation';

class PostsOrganisationPanel extends Component {
    getCurrentOrganisationId(){
        let curr_url = window.location.href.toString().split("/");
        let org_id = curr_url.pop();
        while(org_id == "" || isNaN(org_id)){
            org_id = curr_url.pop();
        }
        return org_id;
    }
    componentWillMount() {
        const { loadPosts } = this.props;
        loadPosts(this.getCurrentOrganisationId());
    }
    render(){
        const { rows, count, ownOrganisation } = this.props.posts;
        const { org_u_rows } = this.props.organisations_user;
        const { author_id } = this.props.comment_author_id;
        const comments = this.props.comments;
        const { loadPosts, addPost, loadComments, addCommentToPost, currentAuthorId } = this.props;

        const curr_org_id = this.getCurrentOrganisationId();
        const addPostFromCurrOrg = (post) => addPost(curr_org_id, post);
        const addCurrentComment = (post_id, author_id, comment) => addCommentToPost(post_id, author_id, comment);
        const showCommentsForPost = (post_id) => loadComments(post_id);
        const updateAuthorId = (author_id) => currentAuthorId(author_id);

        var addPostField;
        if (ownOrganisation) {
            addPostField = <PostAdd addPostFromCurrOrg={addPostFromCurrOrg}/>;
        }

        return (
            <div className="posts-dashboard-list">
                {addPostField}
                <PostRepresentation data={rows} comments={comments} org_u_rows={org_u_rows} showCommentsForPost={showCommentsForPost} addCurrentComment={addCurrentComment} updateAuthorId={updateAuthorId} author_id={author_id}/>
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
    loadPosts, addPost, loadComments, addCommentToPost, currentAuthorId
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PostsOrganisationPanel);