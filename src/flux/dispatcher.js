import { Dispatcher } from 'flux';

export const ActionTypes = {
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_FEEDINGS: 'UPDATE_FEEDINGS',
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  UPDATE_FEEDING_START: 'UPDATE_FEEDING_START',
  UPDATE_FEEDING_SUCCESS: 'UPDATE_FEEDING_SUCCESS',
  UPDATE_FEEDING_FAIL: 'UPDATE_FEEDING_FAIL'
};

const dispatcher = new Dispatcher();
const dispatch = dispatcher.dispatch.bind(dispatcher);

export default dispatcher;
export { dispatch };
