import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { loadPosts, addPost, loadComments, addCommentToPost } from '../actions';
import { bindActionCreators } from 'redux';

import PostAdd from '../components/PostAdd';
import PostRepresentation from '../components/PostRepresentation';

class PostsOrganisationPanel extends Component {
    getCurrentOrganisationId(){
        let curr_url = window.location.href.toString().split("/");
        let org_id = curr_url.pop();
        while(org_id == ""){
            org_id = curr_url.pop();
        }
        return org_id;
    }
    componentWillMount() {
        const { loadPosts } = this.props;
        loadPosts(this.getCurrentOrganisationId());
    }
    render(){
        const { rows, count } = this.props.posts;
        const comments = this.props.comments;
        const { loadPosts, addPost, loadComments, addCommentToPost } = this.props;

        const curr_org_id = this.getCurrentOrganisationId();
        const addPostFromCurrOrg = (post) => addPost(curr_org_id, post);
        const addCurrentComment = (post_id, comment) => addCommentToPost(post_id, curr_org_id, comment);
        const showCommentsForPost = (post_id) => loadComments(post_id);

        return (
            <div className="posts-dashboard-list">
                <PostAdd addPostFromCurrOrg={addPostFromCurrOrg}/>
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
    loadPosts, addPost, loadComments, addCommentToPost,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PostsOrganisationPanel);