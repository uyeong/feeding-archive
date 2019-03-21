import { Dispatcher } from 'flux';

export const ActionTypes = {
  PREPARED: 'PREPARED',
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOAD_FEEDINGS_START: 'LOAD_FEEDINGS_START',
  LOAD_FEEDINGS_SUCCESS: 'LOAD_FEEDINGS_SUCCESS',
  LOAD_FEEDINGS_FAIL: 'LOAD_FEEDINGS_FAIL',
  ADD_FEEDING_START: 'ADD_FEEDING_START',
  ADD_FEEDING_SUCCESS: 'ADD_FEEDING_SUCCESS',
  ADD_FEEDING_FAIL: 'ADD_FEEDING_FAIL'
};

const dispatcher = new Dispatcher();
const dispatch = dispatcher.dispatch.bind(dispatcher);

export default dispatcher;
export { dispatch };
