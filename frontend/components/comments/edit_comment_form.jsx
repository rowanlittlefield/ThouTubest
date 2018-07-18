import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class EditCommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: props.comment.body
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    const comment = Object.assign({}, this.props.comment, this.state);
    this.props.processForm(comment);
    this.pressCancel();
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

redirectUnlessSignedInt() {
  if (!this.props.currentUserId) {
    this.props.history.push('/login');
  }
}

pressCancel() {
  this.props.commentComponent.setState({displayEditForm: false},
    this.props.commentComponent.hideActionMenu.bind(this.props.commentComponent));
}

  render() {
    const currentUser = this.props.currentUser;
    const type = this.props.type;

    return(
      <div className={`${type}-create-comment-form-div`}>
        <img src={currentUser ? currentUser.image_url : ''} className={`${type}-create-comment-form-image`} width="40px" height="40px"/>
        <form className={`${type}-create-comment-form`} onSubmit={this.handleSubmit} onClick={this.redirectUnlessSignedInt.bind(this)}>
          {this.renderErrors()}
          <div onClick={this.clearErrors.bind(this)} className={`${type}-create-comment-form-error-clearer`}>
            <textarea
              id={`${type}-create-comment-form-body`}
              value={this.state.body}
              onChange={this.update('body')}
              className={`${type}-create-comment-form-body`}
              onKeyUp={this.textAreaAdjust.bind(this)}
              placeholder={`Add a public ${this.props.type === 'tl' ? 'comment' : 'reply'}...`}
              />
            <div id={`${type}-create-comment-form-footer`} className={`${type}-create-comment-form-footer`}>
              <span className={`${type}-create-comment-cancel`} onClick={this.pressCancel.bind(this)}>cancel</span>
              <input type="submit" value='save'
                className={`${type}-create-comment-submit`} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(EditCommentForm);
