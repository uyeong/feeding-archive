import React from 'react';
import { render } from 'react-dom';
import firebase from 'firebase/app';
import * as serviceWorker from './serviceWorker';
import config from './config';
import App from './containers/App';
import 'firebase/auth';
import 'firebase/firestore';
import './style.scss';

firebase.initializeApp(config);
render(<App />, document.getElementById('root'));
serviceWorker.register();
