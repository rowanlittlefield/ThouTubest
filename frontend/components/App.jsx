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
import VideoIndexContainer from './video/video_index_container';
import VideoPlayerContainer  from './video/video_player_container';

const App = () => {

  return (<div>
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <NavbarContainer />
    </Switch>


      <Route exact path="/videos/:videoId" component={VideoPlayerContainer} />
      <Route exact path="/" component={VideoIndexContainer} />
    

  </div>);
};

export default App;
