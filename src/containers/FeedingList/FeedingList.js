import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Container } from 'flux/utils';
import moment from 'moment';
import { Button } from 'antd-mobile';
import store from '../../flux/store';
import actions from '../../flux/actions';
import imgCart from '../../images/img-cart.svg';
import imgBox from '../../images/img-box.svg';
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
    const { current = moment().format('YYYY-MM-DD') }  = this.props.match.params;
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
        <div className={css.archive}>
          {feedings === undefined && (
            <div className={css.guide}>
              <img src={imgCart} alt="" />
              <p>데이터를 가져오는 중입니다.</p>
            </div>
          )}
          {feedings && feedings.length === 0 && (
            <div className={css.guide}>
              <img src={imgBox} alt="" />
              <p>기록이 없습니다.</p>
            </div>
          )}
          {feedings && feedings.length > 0 && (
            <table className={css.table}>
              <thead>
              <tr>
                <th>시간</th>
                <th>간격</th>
                <th>종류</th>
                <th>먹은량</th>
                <th />
              </tr>
              </thead>
              <ReactCSSTransitionGroup
                component="tbody"
                transitionName="feeding"
                transitionEnterTimeout={500}
                transitionLeave={false}
              >
                {feedings.map((feeding, index) => (
                  <tr key={feeding.id}>
                    <td>{moment(feeding.date).format('HH:mm')}</td>
                    <td>{index > 0 ? (moment.utc(moment(feeding.date).diff(feedings[index - 1].date)).format('HH:mm')) : '-'}</td>
                    <td>{feeding.kind}</td>
                    <td>{feeding.volume > 0 ? `${feeding.volume} ml` : '-'}</td>
                    <td>
                      <Link to={`/feedings/${current}/edit/${feeding.id}`}>수정</Link>
                      <span> / </span>
                      <button onClick={this.onClickRemoveFeeding.bind(null, feeding)}>
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </ReactCSSTransitionGroup>
            </table>
          )}
        </div>
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

  onClickRemoveFeeding = (feeding) => {
    const { uid } = this.state.user;
    actions.removeFeeding(uid, feeding);
  }
}

export default Container.create(FeedingList);
