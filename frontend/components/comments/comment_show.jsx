import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import CommentList from './comment_list';
import CreateCommentFormContainer from './create_comment_form_container'

class CommentShow extends React.Component {
  constructor(props) {
    super(props);
  }

    componentDidMount() {
    this.props.getComments(this.props.currentVideoId, null);
  }

  render() {
    return (
      <div>
        <div className="comment-show-header">
          <h2 className="comment-show-number">{this.props.commentIds.length} Comments</h2>
          <CreateCommentFormContainer />
        </div>

        <CommentList
           commentIds={this.props.commentIds}
           parentCommentId={null}
           type={'tl'}/>
      </div>
    );
  }
}

export default withRouter(CommentShow);
