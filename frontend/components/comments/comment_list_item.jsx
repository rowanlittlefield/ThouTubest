import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import CommentList from './comment_list';
import { getComments } from '../../actions/comment_actions';

class CommentListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayChildren: false,
      showChildrenText: `View all ${this.props.comment.child_comment_ids.length} replies`
    };
  }

  renderChildren() {
    if (this.state.displayChildren) {
      return (<CommentList
         commentIds={this.props.comment.child_comment_ids}
         parentCommentId={this.props.comment.id}
         type={'nested'}/>);
    } else {
      return null;
    }
  }

  render() {
    const comment = this.props.comment;
    const user = this.props.user;
    const type = this.props.type;
    return (<li className={`${type}-comment-listitem`}>
      <div className={`${type}-comment-listitem-div`}>
        <img src={user.image_url} className={`${type}-comment-show-listitem-image`} />
        <div className={`${type}-comment-show-listitem-content`}>
          <div className={`${type}-comment-show-listitem-content-toprow`}>
            <span className={`${type}-comment-show-listitem-content-username`}>{user.username} &nbsp;&nbsp;</span>
            <span className={`${type}-comment-show-listitem-content-timestamp`}>_ days ago</span>
          </div>
          <span className={`${type}-comment-show-listitem-content-body`}>{comment.body}</span>
          <span className={`${type}-comment-show-listitem-content-reply-like-bar`}>reply</span>
          <div id={`comment-${comment.id}-reply-button-div`}>
            <span id={`comment-${comment.id}-reply-button`}
              className={`${type}-comment-show-listitem-child-comments-button`} onClick={() => {
                console.log("Hello");
                const boolean = !this.state.displayChildren;
                const text = boolean ? 'Hide comments' : `View all ${this.props.comment.child_comment_ids.length} replies`;

                this.setState({
                  displayChildren: boolean,
                  showChildrenText: text
                })
              }}>{this.state.showChildrenText}<span className={`${type}-down-carrot`}>&or;</span>
            </span>
            {this.renderChildren()}
          </div>
        </div>
      </div>
    </li>);
  }
}

const msp = (state, ownProps) => {
  const comment = state.entities.comments[ownProps.id];

  return {
   comment: comment,
   user: comment ? state.entities.users[comment.user_id] : null
 };
};

export default withRouter(connect(msp, null)(CommentListItem));
