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
    const comment = Object.assign({}, this.state);
    comment.userId = this.props.currentUserId;
    comment.videoId = this.props.currentUserId;
    this.props.processForm(comment)//.then( () => {this.props.history.push('/');});
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

  render() {
    return(
      <div className="create-comment-form-div">
        <img className="create-comment-form-image" width="40px" height="40px"/>
        <form className="create-comment-form">
          {this.renderErrors()}
          <div onClick={this.clearErrors.bind(this)} className="create-comment-form-error-clearer">
            <textarea
              id="create-comment-form-body"
              value={this.state.body}
              onChange={this.update('body')}
              className="create-comment-form-body"
              onKeyUp={this.textAreaAdjust.bind(this)}
              onClick={this.toggleFormFooter.bind(this)}
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
