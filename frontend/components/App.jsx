import React from 'react';
import NavbarContainer from './navbar/navbar_container';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import SignupFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import VideoPlayerContainer  from './video/video_player_container'

const App = () => {

  return (<div>
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <NavbarContainer />
    </Switch>

    <Route exact path="/videos/:videoId" component={VideoPlayerContainer} />

  </div>);
};

export default App;
