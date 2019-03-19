import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import actions from '../../actions';
import store from '../../store';
import Header from '../../components/Header';
import Preparing from '../Preparing';
import Home from "../Home";
import Login from '../Login';

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
            <PrivateRoute path={"/"} exact component={Home} authenticated={!!user} />
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
