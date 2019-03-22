import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'flux/utils';
import moment from 'moment';
import { Button } from 'antd-mobile';
import store from '../../flux/store';
import actions from '../../flux/actions';
import FeedingTable from './FeedingTable';
import css from './FeedingList.module.scss';

class FeedingList extends Component {
  static getStores() {
    return [store];
  }

  static calculateState() {
    return store.getState();
  }

  componentDidMount() {
    setTimeout(() => this.listenFeedings());
  }

  componentDidUpdate(prevProps, prevState) {
    const currentParams = this.props.match.params;
    const prevParams = prevProps.match.params;
    if (currentParams.current !== prevParams.current) {
      this.listenFeedings();
    }
  }

  render() {
    const { feedings } = this.state;
    const { current } = this.props.match.params;
    const prev = moment(current).subtract(1, 'days').format('YYYY-MM-DD');
    const next = moment(current).add(1, 'days').format('YYYY-MM-DD');
    return (
      <section className={css.wrapper}>
        <div className={css.header}>
          <h1 className={css.title}>{current}</h1>
          <nav className={css.navigation}>
            <Link to={`/feedings/${prev}`}><span className="blind">뒤로</span></Link>
            <Link to={`/feedings/${next}`}><span className="blind">앞으로</span></Link>
          </nav>
        </div>
        <Button
          className={css.write}
          href={`/feedings/${current}/write`}
          type="primary"
          size="large"
          onClick={this.onClickWriteFeeding}
        >
          기록하기
        </Button>
        <FeedingTable current={current} feedings={feedings} onRemove={this.onRemoveFeeding} />
      </section>
    )
  }

  listenFeedings() {
    const { uid } = this.state.user;
    const { current } = this.props.match.params;
    actions.listenFeedings(uid, current);
  }

  onClickWriteFeeding = (event) => {
    event.preventDefault();
    const url = event.currentTarget.getAttribute('href');
    this.props.history.push(url);
  };

  onRemoveFeeding = (feeding) => {
    const { uid } = this.state.user;
    actions.removeFeeding(uid, feeding);
  }
}

export default Container.create(FeedingList);
