import { ReduceStore } from 'flux/utils';
import dispatcher, { ActionTypes } from './dispatcher';
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
        case ActionTypes.UPDATE_USER:
          draft.user = action.user;
          break;
        case ActionTypes.UPDATE_FEEDINGS:
          draft.feedings = action.feedings;
          break;
        case ActionTypes.LOGIN_SUCCESS:
        case ActionTypes.LOGIN_FAIL:
          draft.processing.login = false;
          break;
        case ActionTypes.LOGIN_START:
          draft.processing.login = true;
          break;
        case ActionTypes.UPDATE_FEEDING_START:
          draft.processing.feeding = true;
          break;
        case ActionTypes.UPDATE_FEEDING_SUCCESS:
        case ActionTypes.UPDATE_FEEDING_FAIL:
          draft.processing.feeding = false;
          break;
        default:
      }
    });
  }
}

export default new Store();
