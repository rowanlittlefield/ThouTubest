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


  handleSubmit(e) {
    e.preventDefault();
    const that = this;
    const comment = Object.assign({}, this.state);
    comment.user_id = this.props.currentUserId;
    comment.video_id = this.props.currentVideoId;
    this.props.processForm({comment})
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
  const textarea = document.getElementById('create-comment-form-body');
  textarea.style.height = 14 + (16 *(Math.floor( this.state.body.length / 130))) + "px";
}

toggleFormFooter() {
  const footer = document.getElementById('create-comment-form-footer');
  footer.setAttribute('style', "display: flex");
}

redirectUnlessSignedInt() {
  if (!this.props.currentUserId) {
    this.props.history.push('/login');
  }
}

  render() {
    const currentUser = this.props.currentUser;

    return(
      <div className="create-comment-form-div">
        <img src={currentUser ? currentUser.image_url : ''} className="create-comment-form-image" width="40px" height="40px"/>
        <form className="create-comment-form" onSubmit={this.handleSubmit} onClick={this.redirectUnlessSignedInt.bind(this)}>
          {this.renderErrors()}
          <div onClick={this.clearErrors.bind(this)} className="create-comment-form-error-clearer">
            <textarea
              id="create-comment-form-body"
              value={this.state.body}
              onChange={this.update('body')}
              className="create-comment-form-body"
              onKeyUp={this.textAreaAdjust.bind(this)}
              onClick={this.toggleFormFooter.bind(this)}
              placeholder="Add a public comment..."
              />
            <div id="create-comment-form-footer" className="create-comment-form-footer">
              <span className="create-comment-cancel">cancel</span>
              <input type="submit" value="comment" className="create-comment-submit" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(CreateCommentForm);
