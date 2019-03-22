import firebase from 'firebase/app';
import config from "../config";
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp(config);
const auth = app.auth();
const store = app.firestore();

export default firebase;
export { app, auth, store };
