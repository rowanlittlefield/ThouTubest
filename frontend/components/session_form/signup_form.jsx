import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      image_url: 'dummy',
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
    const user = Object.assign({}, this.state);
    // this.props.processForm(user)//.then( () => {this.props.history.push('/');});
    const formData = new FormData();
    formData.append('user[email]', this.state.email);
    formData.append('user[username]', this.state.username);
    formData.append('user[password]', this.state.password);
    formData.append('user[image_url]', this.state.image_url);
    formData.append('user[photo]', this.state.photoFile);
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
        response => console.log(response.responseJSON)
      );

  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    console.log(this.state);
    const preview = this.state.photoUrl ? <img src={this.state.photoUrl} /> : null;

    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          Welcome to Eutewbz!
          <br/>
          Please {this.props.formType} or {this.props.navLink}
          {this.renderErrors()}
          <div className="login-form">
            <br/>
            <label>Email:
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className="login-input"
              />
            </label>
            <br/>
            <label>Username:
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="login-input"
              />
            </label>
            <br/>
            <label>Password:
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
            </label>
            <br/>

            <label>Photo
              <input type="file"
                onChange={this.handleFile.bind(this)} />
            </label>

            <h3>Image preview</h3>
            {preview}
            <br/>

            <input className="session-submit" type="submit" value={this.props.formType} />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);
