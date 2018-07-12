import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user)//.then( () => {this.props.history.push('/');});
  }

  renderErrors() {
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
    this.props.clearErrors();
  }

  render() {
    return (

      <div className="login-form-container">
        <h2 className="login-form-container-logo">Logo Place Holder</h2>
        <h3 className="login-form-container-header">Sign in</h3>
        <p className="login-form-container-subheader">to continue to Eutewbz</p>
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <br/>

          {this.renderErrors()}
          <div className="login-form">
            <br/>
            <label className="login-form-label">Email
              <br/>
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className="login-form-input"
              />
            </label>
            <br/>
            <label className="login-form-label">Password
              <br/>
              <input type="password"
                className='login-form-input'
                value={this.state.password}
                onChange={this.update('password')}
              />
            </label>
            <br/>
            <div className="login-form-container-actions">
              <Link onClick={this.clearErrors.bind(this)} className="login-link" to="/signup">Create account</Link>
              <button className="demo-login-button" onClick={this.props.demoLogin.bind(this)}>Demo Login</button>
              <input className="session-submit" type="submit" value="next" />
            </div>
          </div>
        </form>
      </div>

    );
  }
}

export default withRouter(SessionForm);
