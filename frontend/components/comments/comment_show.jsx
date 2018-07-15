import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import CommentList from './comment_list';
import CreateCommentFormContainer from './create_comment_form_container'

class CommentShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: props.match.params.videoId,
      comments: {},
      commentIds: props.commentIds
    };
  }

    componentDidMount() {
    this.props.getComments(this.state.videoId, null).then(response => {
      return this.setState({
        comments: response.comments,
        commentIds: this.props.commentIds
      });
    });
  }

  componentDidUpdate() {

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      commentIds: nextProps.commentIds
    });
  }

  render() {
    // const commentIds = this.props.video ? this.props.video.comment_ids : [];
    const commentIds = this.state.commentIds ? this.state.commentIds: [];


    return (
      <div>
        <div className="comment-show-header">
          <h2 className="comment-show-number">{commentIds.length} Comments</h2>
          <CreateCommentFormContainer />
        </div>

        <CommentList getComments={this.props.getComments}
           comments={this.state.comments}
           commentIds={commentIds}
           videoId={this.state.videoId}
           type={'tl'}/>
      </div>
    );
  }
}

export default withRouter(CommentShow);
