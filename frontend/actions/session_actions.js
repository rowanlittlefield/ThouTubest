import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const receiveCurrentUser = ({user, likes}) => {
  return {
  type: RECEIVE_CURRENT_USER,
  currentUser: user,
  likes: likes ? likes : {}
};
};

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const signup = user => dispatch => (
  APIUtil.signup(user).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const login = user => dispatch => {
  return APIUtil.login(user).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
};

export const showCurrentUser = () => dispatch => {
  return APIUtil.showCurrentUser().then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
};

export const logout = () => dispatch => (
  APIUtil.logout().then(user => (
    dispatch(logoutCurrentUser())
  ))
);

export const clearErrors = () => dispatch => {
  return dispatch(receiveErrors([]));
};

export const dispatchErrors = errors => dispatch => {
  return dispatch(receiveErrors(errors));
};
