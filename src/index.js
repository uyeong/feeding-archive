import React from 'react';
import { render } from 'react-dom';
import moment from 'moment-timezone';
import * as serviceWorker from './serviceWorker';
import App from './App';
import './remotes/init';

moment.tz.setDefault('Asia/Seoul');
render(<App />, document.getElementById('root'));
serviceWorker.register();
