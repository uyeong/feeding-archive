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
        feedings: false,
        feeding: false
      }
    };
  }

  reduce(state, action) {
    return produce(state, draft => {
      switch (action.type) {
        case ActionTypes.PREPARED:
        case ActionTypes.LOGIN_SUCCESS:
          draft.user = action.user;
          draft.processing.login = false;
          break;
        case ActionTypes.LOGIN_START:
          draft.processing.login = true;
          break;
        case ActionTypes.LOGIN_FAIL:
          draft.processing.login = false;
          break;
        case ActionTypes.LOAD_FEEDINGS_START:
          draft.processing.feedings = true;
          break;
        case ActionTypes.LOAD_FEEDINGS_SUCCESS:
          draft.processing.feedings = false;
          draft.feedings = action.feedings;
          break;
        case ActionTypes.LOAD_FEEDINGS_FAIL:
          draft.processing.feedings = false;
          draft.feedings = undefined;
          break;
        case ActionTypes.ADD_FEEDING_START:
          draft.processing.feeding = true;
          break;
        case ActionTypes.ADD_FEEDING_SUCCESS:
        case ActionTypes.ADD_FEEDING_FAIL:
          draft.processing.feeding = false;
          break;
        default:
      }
    });
  }
}

export default new Store();
