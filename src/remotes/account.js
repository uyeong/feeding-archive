import firebase, { auth } from './init';

export default {
  listen(callback) {
    auth.onAuthStateChanged(user => {
      callback(user)
    });
  },

  async login(email, password) {
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    await auth.signInWithEmailAndPassword(email, password);
  },

  logout() {
    return auth.signOut();
  }
}
