import account from './remotes/account.js';
import feedings from './remotes/feedings';
import { dispatch, ActionTypes } from './dispatcher';

let unsubscribe;

export default {
  async prepare() {
    const user = await account.fetch();
    dispatch({
      type: ActionTypes.PREPARED,
      user
    });
  },

  async login(email, password) {
    dispatch({ type: ActionTypes.LOGIN_START });
    try {
      await account.login(email, password);
      const user = await account.fetch();
      dispatch({
        type: ActionTypes.LOGIN_SUCCESS,
        user
      });
    } catch(error) {
      dispatch({ type: ActionTypes.LOGIN_FAIL });
      throw error;
    }
  },

  async listenFeedings(userId, date) {
    dispatch({ type: ActionTypes.LOAD_FEEDINGS_START });
    try {
      if (unsubscribe) {
        unsubscribe();
      }
      unsubscribe = feedings.listen(userId, date, (data) => {
        dispatch({
          type: ActionTypes.LOAD_FEEDINGS_SUCCESS,
          feedings: data
        });
      });
    } catch (error) {
      dispatch({ type: ActionTypes.LOAD_FEEDINGS_FAIL });
      throw error;
    }
  },

  async saveFeeding(userId, values) {
    dispatch({ type: ActionTypes.ADD_FEEDING_START });
    try {
      await feedings.create(userId, values);
      dispatch({ type: ActionTypes.ADD_FEEDING_SUCCESS });
    } catch (error) {
      dispatch({ type: ActionTypes.ADD_FEEDING_FAIL });
      throw error;
    }
  },

  async updateFeeding(userId, feedingId, values) {
    dispatch({ type: ActionTypes.ADD_FEEDING_START });
    try {
      await feedings.update(userId, feedingId, values);
      dispatch({ type: ActionTypes.ADD_FEEDING_SUCCESS });
    } catch (error) {
      dispatch({ type: ActionTypes.ADD_FEEDING_FAIL });
      throw error;
    }
  },

  async removeFeeding(userId, feedingId, date) {
    dispatch({ type: ActionTypes.ADD_FEEDING_START });
    try {
      await feedings.remove(userId, feedingId, date);
      dispatch({ type: ActionTypes.ADD_FEEDING_SUCCESS });
    } catch (error) {
      dispatch({ type: ActionTypes.ADD_FEEDING_FAIL });
      throw error;
    }
  }
};
