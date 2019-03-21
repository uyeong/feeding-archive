import account from './remotes/account.js';
import archives from './remotes/archives';
import { dispatch, ActionTypes } from './dispatcher';

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

  async loadArchives(userId, date) {
    dispatch({ type: ActionTypes.LOAD_ARCHIVES_START });
    try {
      const data = await archives.fetchAll(userId, date);
      dispatch({
        type: ActionTypes.LOAD_ARCHIVES_SUCCESS,
        archives: data
      });
    } catch (error) {
      dispatch({ type: ActionTypes.LOAD_ARCHIVES_FAIL });
      throw error;
    }
  }
};
