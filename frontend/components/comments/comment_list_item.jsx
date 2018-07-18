import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import CommentList from './comment_list';
import CreateCommentFormContainer from './create_comment_form_container';
import { getComments, deleteComment } from '../../actions/comment_actions';

class CommentListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayChildren: false,
      displayReplyForm: false,
      showChildrenText: `View all ${this.props.comment.child_comment_ids.length} replies`
    };
  }

  // componentWillReceiveProps(newProps) {
  // }

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

  renderReplyForm() {
    if (this.state.displayReplyForm) {
      return (
        <CreateCommentFormContainer type={'reply'} parentCommentId={this.props.comment.id}/>
      );
    } else {
      return null;
    }
  }

  toggleActionMenu() {
    const actionMenu = document.getElementById(`${this.props.comment.id}-comment-action-menu`);
    const dropDown = document.getElementById(`${this.props.comment.id}-action-menu-dropdown`);
    actionMenu.classList.toggle('hidden');
    if (!Array.from(dropDown.classList).includes('hidden')) {
      dropDown.classList.toggle('hidden');
    }
  }

  render() {
    const comment = this.props.comment;
    const user = this.props.user;
    const type = this.props.type;
    return (<li id={`${comment.id}-comment-list-el`} className={`${type}-comment-listitem`}
      onMouseEnter={this.toggleActionMenu.bind(this)}
      onMouseLeave={this.toggleActionMenu.bind(this)}>
      <div className={`${type}-comment-listitem-div`}>
        <img src={user.image_url} className={`${type}-comment-show-listitem-image`} />
        <div className={`${type}-comment-show-listitem-content`}>
          <div className={`${type}-comment-show-listitem-content-toprow`}>
            <span className={`${type}-comment-show-listitem-content-username`}>{user.username} &nbsp;&nbsp;</span>
            <span className={`${type}-comment-show-listitem-content-timestamp`}>_ days ago</span>
          </div>
          <span className={`${type}-comment-show-listitem-content-body`}>{comment.body}</span>
          <span onClick={() => {
              console.log('clicking reply button');
              const boolean = !this.state.displayReplyForm;
              this.setState( {displayReplyForm: boolean});
            }} className={`${type}-comment-show-listitem-content-reply-like-bar`}>reply</span>
          {this.renderReplyForm()}
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
      <div id={`${comment.id}-comment-action-menu`} className={"comment-listitem-action-menu" + " hidden"}
        onClick={() => {
          if (this.props.comment && this.props.currentUserId === this.props.comment.user_id) {
            const dropDown = document.getElementById(`${comment.id}-action-menu-dropdown`);
            dropDown.classList.toggle('hidden');
          }
        }}>

          <ul id="no-list-bullets">
            <li>
              <img src={window.tripleDotIcon} width="20px" height="20px" />
            </li>
            <li>
              <ul id={`${comment.id}-action-menu-dropdown`} className={"action-menu-dropdown" + " hidden"}>
                <li>
                  <ul>
                    <li><span>Edit</span></li>
                    <li onClick={this.props.deleteComment.bind(this, comment.id)}><span>Delete</span></li>
                  </ul>
                </li>
              </ul>

            </li>
          </ul>


      </div>
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

const mdp = (dispatch, ownProps) => {

  return {
    deleteComment: id => dispatch(deleteComment(id))
  };
}

export default withRouter(connect(msp, mdp)(CommentListItem));
