import React from 'react';
import { render } from 'react-dom';
import firebase from 'firebase/app';
import moment from 'moment-timezone';
import * as serviceWorker from './serviceWorker';
import config from './config';
import App from './containers/App';
import 'firebase/auth';
import 'firebase/firestore';
import './style.scss';

moment.tz.setDefault('Asia/Seoul');
firebase.initializeApp(config);
render(<App />, document.getElementById('root'));
serviceWorker.register();
