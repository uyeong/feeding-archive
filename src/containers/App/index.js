import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import momentTimezone from 'moment-timezone';
import actions from '../../actions';
import store from '../../store';
import Header from '../../components/Header';
import Preparing from '../Preparing';
import Login from '../Login';
import Archives from "../Archives";

momentTimezone.tz.setDefault('Asia/Seoul');

class App extends Component {
  static getStores() {
    return [store];
  }

  static calculateState() {
    return store.getState();
  }

  componentDidMount() {
    actions.prepare();
  }

  render() {
    const { user } = this.state;
    return (
      <article>
        <ReactCSSTransitionGroup
          transitionName="preparing"
          transitionEnterTimeout={0}
          transitionLeaveTimeout={800}
        >
          {user === undefined ? <Preparing /> : null}
        </ReactCSSTransitionGroup>
        {user !== undefined && (
          <Router basename={process.env.PUBLIC_URL}>
            <Header />
            <Route path={"/login"} component={Login} />
            <Switch>
              <Redirect exact from='/' to='/archives'/>
              <PrivateRoute path={"/archives/:current?"} component={Archives} authenticated={!!user} />
            </Switch>
          </Router>
        )}
      </article>
    )
  }
}

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
      }
    />
  );
}

export default Container.create(App);
