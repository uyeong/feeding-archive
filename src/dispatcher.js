import { Dispatcher } from 'flux';

export const ActionTypes = {
  PREPARED: 'PREPARED',
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
};

export default new Dispatcher();
