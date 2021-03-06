import React from 'react';
import NavbarContainer from './navbar/navbar_container';
import {
  Route,
  Switch,
  HashRouter
} from 'react-router-dom';
import SignupFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import VideoIndexContainer from './video/video_index/video_index_container';
import VideoShowContainer from './video/video_show/video_show_container';
import CreateVideoFormContainer from './video/video_forms/create_video_form_container';
import UpdateVideoFormContainer from './video/video_forms/update_video_form_container';
import SearchResultsContainer from './search/search_results_container';


const App = () => {
  return (<div>
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <NavbarContainer />
    </Switch>

    <Switch>
      <Route exact path="/videos/new" component={CreateVideoFormContainer} />
      <Route exact path="/videos/:videoId/edit" component={UpdateVideoFormContainer} />
      <Route exact path="/videos/:videoId" component={VideoShowContainer} />
      <Route path="/results" component={SearchResultsContainer} />
      <Route exact path="/" component={VideoIndexContainer} />
    </Switch>

  </div>);
};

export default App;
