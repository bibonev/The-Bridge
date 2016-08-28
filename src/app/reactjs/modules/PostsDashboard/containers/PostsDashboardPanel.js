import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { loadPosts } from '../actions';
import { bindActionCreators } from 'redux';

import PostRepresentation from '../components/PostRepresentation';

class PostsDashboardPanel extends Component {
    componentWillMount() {
        const { loadPosts } = this.props;
        loadPosts();
    }

    render() {
        const { rows, count } = this.props.posts;
        const { loadPosts } = this.props;

        return (
            <div className="posts-dashboard-list">
                <PostRepresentation data={rows} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    loadPosts
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PostsDashboardPanel);