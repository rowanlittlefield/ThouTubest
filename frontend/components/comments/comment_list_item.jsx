import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import CommentList from './comment_list';
import CreateCommentFormContainer from './create_comment_form_container';
import EditCommentFormContainer from './edit_comment_form_container';
import { getComments, deleteComment } from '../../actions/comment_actions';

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
        <CreateCommentFormContainer commentListItem={this} type={'reply'} parentCommentId={this.props.comment.id}/>
      );
    } else {
      return null;
    }
  }

  toggleActionMenu() {
    if (!this.state.displayEditForm) {
      const actionMenu = document.getElementById(`${this.props.comment.id}-comment-action-menu`);
      const dropDown = document.getElementById(`${this.props.comment.id}-action-menu-dropdown`);
      actionMenu.classList.toggle('hidden');
      if (!Array.from(dropDown.classList).includes('hidden')) {
        dropDown.classList.toggle('hidden');
      }
    }
  }

  showActionMenu() {
    if (!this.state.displayEditForm) {
      const actionMenu = document.getElementById(`${this.props.comment.id}-comment-action-menu`);
      const dropDown = document.getElementById(`${this.props.comment.id}-action-menu-dropdown`);
      actionMenu.setAttribute('style', 'display: block');
      if (!Array.from(dropDown.classList).includes('hidden')) {
        dropDown.classList.toggle('hidden');
      }
    }
  }

  hideActionMenu() {
    if (!this.state.displayEditForm) {
      const actionMenu = document.getElementById(`${this.props.comment.id}-comment-action-menu`);
      const dropDown = document.getElementById(`${this.props.comment.id}-action-menu-dropdown`);
      actionMenu.setAttribute('style', 'display: none');
      if (!Array.from(dropDown.classList).includes('hidden')) {
        dropDown.classList.toggle('hidden');
      }
    }
  }

  renderEditForm() {
    return (<EditCommentFormContainer commentComponent={this} comment={this.props.comment}/>);
  }

  showChildrenText() {
    const boolean = this.state.displayChildren;
    const text = boolean ? 'Hide comments' : `View all ${this.props.comment.child_comment_ids.length} replies`;
    return text;
  }

  redirectUnlessSignedIn() {
    if (!this.props.currentUserId) {
      this.props.history.push('/login');
    }
  }

  render() {
    const comment = this.props.comment;
    const user = this.props.user;
    const type = this.props.type;

    if (this.state.displayEditForm) {
      return (
        <li id={`${comment.id}-comment-list-el`} className={`${type}-comment-listitem`}
          onMouseEnter={this.showActionMenu.bind(this)}
          onMouseOut={this.hideActionMenu.bind(this)}>
          {this.renderEditForm()}
        </li>
      );
    }

    let whenUploaded
    if (comment) {
      const createdAtString = comment.created_at;
      const dateString = createdAtString.slice(0,10);
      const [year, month, day] = dateString.split('-');
      const today = new Date();
      const [currentYear, currentMonth, currentDay] = [today.getFullYear(), today.getMonth() + 1, today.getDate()];
      whenUploaded = ((currentYear - year) * 365) + ((currentMonth - month) * 30) + (currentDay - day);
      if(whenUploaded < 0) whenUploaded = 0;
    } else {
      whenUploaded = '0';
    }

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
          <span onClick={() => {
              this.redirectUnlessSignedIn();
              const boolean = !this.state.displayReplyForm;
              this.setState( {displayReplyForm: boolean});
            }} className={`${type}-comment-show-listitem-content-reply-like-bar`}>reply</span>
          {this.renderReplyForm()}
          <div id={`comment-${comment.id}-reply-button-div`}>
            <span id={`comment-${comment.id}-reply-button`}
              className={`${type}-comment-show-listitem-child-comments-button`} onClick={() => {
                const boolean = !this.state.displayChildren;
                const text = boolean ? 'Hide comments' : `View all ${this.props.comment.child_comment_ids.length} replies`;

                this.setState({
                  displayChildren: boolean,
                })
              }}>{this.showChildrenText()}<span className={`${type}-down-carrot`}>&or;</span>
            </span>
            {this.renderChildren()}
          </div>
        </div>
      </div>
      <div id={`${comment.id}-comment-action-menu`} className={"comment-listitem-action-menu"}
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
                    <li onClick={() => {
                        this.setState({displayEditForm: true});
                      }}><span>Edit</span></li>
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
