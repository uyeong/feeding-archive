import firebase from 'firebase/app';

export default {
  fetch() {
    return new Promise((resolve) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        resolve(user);
        unsubscribe();
      });
    });
  },

  async login(email, password) {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    await firebase.auth().signInWithEmailAndPassword(email, password);
  },

  logout() {
    return firebase.auth().signOut();
  }
}
