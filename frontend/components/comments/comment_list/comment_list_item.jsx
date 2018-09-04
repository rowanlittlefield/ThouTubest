import React from 'react';
import { connect } from 'react-redux';
// import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import CommentList from './comment_list';
import CreateCommentFormContainer from '../comment_form/create_comment_form_container';
import EditCommentFormContainer from '../comment_form/edit_comment_form_container';
import CommentActionMenu from './comment_action_menu';
import CommentLikeMenu from './comment_like_menu';
import { resourceAge } from '../../../util/resource_age_util';

class CommentListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayChildren: false,
      displayReplyForm: false,
      displayEditForm: false,
      showChildrenText: `View all ${this.props.comment.child_comment_ids.length} replies`
    };
  }

  optionalComponentRender(flag, component) {
    return (flag ? component : null);
  }

  renderChildren() {
    const children = <CommentList commentIds={this.props.comment.child_comment_ids}
       parentCommentId={this.props.comment.id} type={'nested'}/>
     return this.optionalComponentRender(this.state.displayChildren, children);
  }

  renderReplyForm() {
    const form = <CreateCommentFormContainer commentListItem={this}
      type={'reply'} parentCommentId={this.props.comment.id}/>
    return this.optionalComponentRender(this.state.displayReplyForm, form);
  }

  toggleActionMenu(cb) {
    if (!this.state.displayEditForm) {
      const actionMenu = document.getElementById(`${this.props.comment.id}-comment-action-menu`);
      const dropDown = document.getElementById(`${this.props.comment.id}-action-menu-dropdown`);
      cb(actionMenu);
      if (!Array.from(dropDown.classList).includes('hidden')) {
        dropDown.classList.toggle('hidden');
      }
    }
  }

  showActionMenu() {
    const cb = actionMenu => actionMenu.setAttribute('style', 'display: block');
    this.toggleActionMenu(cb);
  }

  hideActionMenu() {
    const cb = actionMenu => actionMenu.setAttribute('style', 'display: none');
    this.toggleActionMenu(cb);
  }

  renderEditForm() {
    return (<EditCommentFormContainer commentComponent={this} comment={this.props.comment}/>);
  }

  showChildrenText() {
    const boolean = this.state.displayChildren;
    const text = (boolean ? 'Hide comments' :
     `View all ${this.props.comment.child_comment_ids.length} replies`);
    return text;
  }

  redirectUnlessSignedIn() {
    if (!this.props.currentUserId) this.props.history.push('/login');
  }

  render() {
    const comment = this.props.comment;
    const user = this.props.user;
    const type = this.props.type;

    if (this.state.displayEditForm) {
      return (
        <li id={`${comment.id}-comment-list-el`}
          className={`${type}-comment-listitem`}
          onMouseEnter={this.showActionMenu.bind(this)}
          onMouseOut={this.hideActionMenu.bind(this)}>
          {this.renderEditForm()}
        </li>
      );
    }

    const whenUploaded = comment ? resourceAge(comment.created_at) : 0;

    return (<li id={`${comment.id}-comment-list-el`} className={`${type}-comment-listitem`}
      onMouseEnter={this.showActionMenu.bind(this)}
      onMouseLeave={this.hideActionMenu.bind(this)}>
      <div className={`${type}-comment-listitem-div`}>
        <img src={user.image_url} className={`${type}-comment-show-listitem-image`} />
        <div className={`${type}-comment-show-listitem-content`}>
          <div className={`${type}-comment-show-listitem-content-toprow`}>
            <span className={`${type}-comment-show-listitem-content-username`}>{user.username} &nbsp;&nbsp;</span>
            <span className={`${type}-comment-show-listitem-content-timestamp`}>{whenUploaded} days ago</span>
          </div>
          <span className={`${type}-comment-show-listitem-content-body`}>{comment.body}</span>
          <CommentLikeMenu />
          <span onClick={() => {
              this.redirectUnlessSignedIn();
              const boolean = !this.state.displayReplyForm;
              this.setState( {displayReplyForm: boolean});
            }} className={`${type}-comment-show-listitem-content-reply-like-bar`}>reply</span>
          {this.renderReplyForm()}
          <div id={`comment-${comment.id}-reply-button-div`}>
            <span id={`comment-${comment.id}-reply-button`}
              className={`${type}-comment-show-listitem-child-comments-button`}
              onClick={() => {
                const boolean = !this.state.displayChildren;
                const text = (boolean ? 'Hide comments' :
                `View all ${this.props.comment.child_comment_ids.length} replies`);
                this.setState({ displayChildren: boolean });
              }}>{this.showChildrenText()}<span className={`${type}-down-carrot`}>&or;</span>
            </span>
            {this.renderChildren()}
          </div>
        </div>
      </div>
      <CommentActionMenu id={comment.id}
        currentUserId={this.props.currentUserId}
        commentUserId={this.props.comment.user_id}
        displayEditForm={() => this.setState({displayEditForm: true})}
        />
    </li>);
  }
}

const msp = (state, ownProps) => {
  const comment = state.entities.comments[ownProps.id];

  return {
   comment: comment,
   user: comment ? state.entities.users[comment.user_id] : null,
   currentUserId: state.session.id
 };
};

export default withRouter(connect(msp)(CommentListItem));
