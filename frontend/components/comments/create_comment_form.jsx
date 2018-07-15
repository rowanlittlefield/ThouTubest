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
  // textarea.style.height = "14px";
  // if (this.state.body.length > 50) {
    textarea.style.height = 14 + (16 *(Math.floor( this.state.body.length / 130))) + "px";
  // }
  // textarea.style.height = (25+textarea.scrollHeight)+"px";
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
              />
            <div className="create-comment-form-footer">

            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(CreateCommentForm);
