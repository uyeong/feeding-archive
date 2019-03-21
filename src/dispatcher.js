import { Dispatcher } from 'flux';

export const ActionTypes = {
  PREPARED: 'PREPARED',
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOAD_ARCHIVES_START: 'LOAD_ARCHIVES_START',
  LOAD_ARCHIVES_SUCCESS: 'LOAD_ARCHIVES_SUCCESS',
  LOAD_ARCHIVES_FAIL: 'LOAD_ARCHIVES_FAIL'
};

const dispatcher = new Dispatcher();
const dispatch = dispatcher.dispatch.bind(dispatcher);

export default dispatcher;
export { dispatch };
