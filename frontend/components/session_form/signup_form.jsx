import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      photoFile: null,
      photoUrl: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {

      this.setState({photoFile: file, photoUrl: fileReader.result});
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const formProcessor = this.props.processForm;
    const errorDispatcher = this.props.dispatchErrors
    const user = Object.assign({}, this.state);
    const formData = new FormData();
    formData.append('user[email]', this.state.email);
    formData.append('user[username]', this.state.username);
    formData.append('user[password]', this.state.password);
    if (this.state.photoFile) {
      formData.append('user[photo]', this.state.photoFile);
    }
    const email = this.state.email;
    const password = this.state.password;
    $.ajax({
      url: '/api/users',
      method: 'POST',
      data: formData,
      contentType: false,
      processData: false
    }).then(
        response => {
          const user = {email: email, password: password};
          formProcessor(user);
        },
        response => errorDispatcher(response.responseJSON)
      );

  }

  renderErrors() {
    return(
      <ul className="session-errors">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
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

  render() {
    const preview = this.state.photoUrl ? <img width='60px' height="60px" src={this.state.photoUrl} /> : null;

    return (
      <div className="login-form-container">
        <h2 className="login-form-container-logo">Logo Place Holder</h2>
        <h3 className="login-form-container-header">Create your NotGewgul Account</h3>
        <p className="login-form-container-subheader">to continue to ThouTubest</p>
        <form onClick={this.clearErrors.bind(this)} onSubmit={this.handleSubmit} className="login-form-box">

          <br/>

          {this.renderErrors()}
          <div className="login-form">
            <br/>
            <label className="login-form-label">Email
              <br/>
              <input type="text"
                className="login-form-input"
                value={this.state.email}
                onChange={this.update('email')}
              />
            </label>
            <br/>
            <label className="login-form-label">Username
              <br/>
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="login-form-input"
              />
            </label>
            <br/>
            <label className="login-form-label">Password
              <br/>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-form-input"
              />
            </label>
            <br/>
            <div className="login-form-photo-upload">
              <label className="login-form-label">Photo
                <br/>
                <input type="file"
                  className="login-form-photo-upload-button"
                  onChange={this.handleFile.bind(this)} />
              </label>
              <div className="login-form-image-preview">

                {preview}
              </div>
            </div>
            <br/>
            <div className="login-form-container-actions">
              <Link onClick={this.clearErrors.bind(this)} className="login-link" to="/login">Sign in instead</Link>
              <input className="session-submit" type="submit" value={this.props.formType} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);
