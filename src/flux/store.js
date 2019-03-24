import { ReduceStore } from 'flux/utils';
import dispatcher  from './dispatcher';
import actionTypes from './actionTypes';
import produce from 'immer';

class Store extends ReduceStore {
  constructor() {
    super(dispatcher);
  }

  getInitialState() {
    return {
      user: undefined,
      feedings: undefined,
      processing: {
        login: false,
        feeding: false
      }
    };
  }

  reduce(state, action) {
    return produce(state, draft => {
      switch (action.type) {
        case actionTypes.UPDATE_USER:
          draft.user = action.user;
          break;
        case actionTypes.UPDATE_FEEDINGS:
          draft.feedings = action.feedings;
          break;
        case actionTypes.LOGIN_SUCCESS:
        case actionTypes.LOGIN_FAIL:
          draft.processing.login = false;
          break;
        case actionTypes.LOGIN_START:
          draft.processing.login = true;
          break;
        case actionTypes.LOGOUT:
          draft.user = null;
          draft.feedings = undefined;
          break;
        case actionTypes.UPDATE_FEEDING_START:
          draft.processing.feeding = true;
          break;
        case actionTypes.UPDATE_FEEDING_SUCCESS:
        case actionTypes.UPDATE_FEEDING_FAIL:
          draft.processing.feeding = false;
          break;
        default:
      }
    });
  }
}

export default new Store();
