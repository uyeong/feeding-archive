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
      archives: undefined,
      processing: {
        login: false,
        archives: false
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
        case ActionTypes.LOAD_ARCHIVES_START:
          draft.processing.archives = true;
          break;
        case ActionTypes.LOAD_ARCHIVES_SUCCESS:
          draft.processing.archives = false;
          draft.archives = action.archives;
          break;
        case ActionTypes.LOAD_ARCHIVES_FAIL:
          draft.processing.archives = false;
          draft.archives = undefined;
          break;
        default:
      }
    });
  }
}

export default new Store();
