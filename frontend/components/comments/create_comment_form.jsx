import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class CreateCommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

componentDidMount() {
  if (this.props.type === 'reply') {
    document.getElementById(`${this.props.type}-create-comment-form-body`).focus();
  }
}

  handleSubmit(e) {
    e.preventDefault();
    const comment = Object.assign({}, this.state);
    comment.user_id = this.props.currentUserId;
    comment.video_id = this.props.currentVideoId;
    comment.parent_comment_id = this.props.parentCommentId;
    this.props.processForm({comment}).then(this.pressCancel.bind(this));
  }

  update(field) {
    return e => {
      return this.setState({[field]: e.currentTarget.value});
    } ;
  }

  renderErrors() {
    if (this.props.errors.length === 0) {
      return null;
    }
    return(
      <ul className="session-errors">
        {this.props.errors.map((error, i) => (
          <li className="session-error" key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  clearErrors() {
    if (this.props.errors.length > 0) {
      this.props.clearErrors();
    }
  }

textAreaAdjust() {
  const textarea = document.getElementById(`${this.props.type}-create-comment-form-body`);
  textarea.style.height = 14 + (16 *(Math.floor( this.state.body.length / 130))) + "px";
}

toggleFormFooter() {
  const footer = document.getElementById(`${this.props.type}-create-comment-form-footer`);
  footer.setAttribute('style', "display: flex");
}

redirectUnlessSignedInt() {
  if (!this.props.currentUserId) {
    this.props.history.push('/login');
  }
}

pressCancel() {
  if (this.props.type === 'reply') {
    const boolean = !this.props.commentListItem.state.displayReplyForm
    this.props.commentListItem.setState({displayReplyForm: boolean});
  } else {
    const footer = document.getElementById(`${this.props.type}-create-comment-form-footer`);
    footer.setAttribute('style', "display: none");
    this.setState({body: ''});
  }
}

  render() {
    const currentUser = this.props.currentUser;
    const type = this.props.type;

    return(
      <div className={`${type}-create-comment-form-div`}>
        <img src={currentUser.image_url ? currentUser.image_url : window.batmanPicture} className={`${type}-create-comment-form-image`} width="40px" height="40px"/>
        <form className={`${type}-create-comment-form`} onSubmit={this.handleSubmit} onClick={this.redirectUnlessSignedInt.bind(this)}>
          {this.renderErrors()}
          <div onClick={this.clearErrors.bind(this)} className={`${type}-create-comment-form-error-clearer`}>
            <textarea
              id={`${type}-create-comment-form-body`}
              value={this.state.body}
              onChange={this.update('body')}
              className={`${type}-create-comment-form-body`}
              onKeyUp={this.textAreaAdjust.bind(this)}
              onClick={this.toggleFormFooter.bind(this)}
              placeholder={`Add a public ${this.props.type === 'tl' ? 'comment' : 'reply'}...`}
              />
            <div id={`${type}-create-comment-form-footer`} className={`${type}-create-comment-form-footer`}>
              <span className={`${type}-create-comment-cancel`} onClick={this.pressCancel.bind(this)}>cancel</span>
              <input type="submit" value={type === 'tl' ? "comment" : "reply"}
                className={`${type}-create-comment-submit`} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(CreateCommentForm);
