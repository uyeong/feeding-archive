import account from './remotes/account.js';
import dispatcher, { ActionTypes } from './dispatcher';

export default {
  async prepare() {
    const user = await account.fetch();
    dispatcher.dispatch({
      type: ActionTypes.PREPARED,
      user
    });
  },

  async login(email, password) {
    dispatcher.dispatch({ type: ActionTypes.LOGIN_START });
    try {
      await account.login(email, password);
      const user = await account.fetch();
      dispatcher.dispatch({
        type: ActionTypes.LOGIN_SUCCESS,
        user
      });
    } catch(error) {
      dispatcher.dispatch({ type: ActionTypes.LOGIN_FAIL });
      throw error;
    }
  }
};
