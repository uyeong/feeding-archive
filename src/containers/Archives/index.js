import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'flux/utils';
import moment from 'moment';
import store from '../../store';
import css from './Archives.module.scss';

class Archives extends Component {
  static getStores() {
    return [store];
  }

  static calculateState() {
    return store.getState();
  }

  render() {
    const { current = moment().format('YYYY-MM-DD') }  = this.props.match.params;
    const prev = moment(current).subtract(1, 'days').format('YYYY-MM-DD');
    const next = moment(current).add(1, 'days').format('YYYY-MM-DD');
    return (
      <section className={css.wrapper}>
        <div className={css.header}>
          <h1 className={css.title}>{current}</h1>
          <nav className={css.navigation}>
            <Link to={`/archives/${prev}`}><span className="blind">뒤로</span></Link>
            <Link to={`/archives/${next}`}><span className="blind">앞으로</span></Link>
          </nav>
        </div>
      </section>
    )
  }
}

export default Container.create(Archives);
