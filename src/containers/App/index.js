import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from 'moment';
import actions from '../../actions';
import store from '../../store';
import Header from '../../components/Header';
import Preparing from '../Preparing';
import Login from '../Login';
import Editor from '../FeedingEditor';
import Feedings from "../FeedingList";

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
    const isAuthenticated = !!user;
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
              <Redirect
                exact
                from='/'
                to={`/feedings/${moment().format('YYYY-MM-DD')}`}
              />
              <PrivateRoute
                path={"/feedings/:current/(write|edit)/:id?"}
                component={Editor}
                authenticated={isAuthenticated}
              />
              <PrivateRoute
                path={"/feedings/:current?"}
                component={Feedings}
                authenticated={isAuthenticated}
              />
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
