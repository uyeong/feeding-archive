import account from '../remotes/account.js';
import feedings from '../remotes/feedings';
import { dispatch, ActionTypes } from './dispatcher';

let unsubscribe;

export default {
  async listenUser() {
    account.listen((user) => {
      dispatch({ type: ActionTypes.UPDATE_USER, user });
    })
  },

  async listenFeedings(userId, date) {
    if (unsubscribe) {
      unsubscribe();
    }
    unsubscribe = feedings.listen(userId, date, (feedings) => {
      dispatch({ type: ActionTypes.UPDATE_FEEDINGS, feedings });
    });
  },

  async login(email, password) {
    dispatch({ type: ActionTypes.LOGIN_START });
    try {
      await account.login(email, password);
      dispatch({ type: ActionTypes.LOGIN_SUCCESS });
    } catch(error) {
      dispatch({ type: ActionTypes.LOGIN_FAIL });
      throw error;
    }
  },

  async saveFeeding(userId, values) {
    dispatch({ type: ActionTypes.UPDATE_FEEDING_START });
    try {
      await feedings.create(userId, values);
      dispatch({ type: ActionTypes.UPDATE_FEEDING_SUCCESS });
    } catch (error) {
      dispatch({ type: ActionTypes.UPDATE_FEEDING_FAIL });
      throw error;
    }
  },

  async updateFeeding(userId, feedingId, values) {
    dispatch({ type: ActionTypes.UPDATE_FEEDING_START });
    try {
      await feedings.update(userId, feedingId, values);
      dispatch({ type: ActionTypes.UPDATE_FEEDING_SUCCESS });
    } catch (error) {
      dispatch({ type: ActionTypes.UPDATE_FEEDING_FAIL });
      throw error;
    }
  },

  async removeFeeding(userId, feeding) {
    await feedings.remove(userId, feeding);
  }
};
