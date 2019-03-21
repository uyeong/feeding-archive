import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'flux/utils';
import moment from 'moment';
import { Button } from 'antd-mobile';
import store from '../../store';
import actions from '../../actions';
import imgCart from '../../images/img-cart.svg';
import imgBox from '../../images/img-box.svg';
import css from './Archives.module.scss';

class Archives extends Component {
  static getStores() {
    return [store];
  }

  static calculateState() {
    return store.getState();
  }

  componentDidMount() {
    setTimeout(() => this.requestArchives())
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const currentParams = this.props.match.params;
    const prevParams = prevProps.match.params;
    if (currentParams.current !== prevParams.current) {
      this.requestArchives();
    }
  }

  render() {
    const { current = moment().format('YYYY-MM-DD') }  = this.props.match.params;
    const prev = moment(current).subtract(1, 'days').format('YYYY-MM-DD');
    const next = moment(current).add(1, 'days').format('YYYY-MM-DD');
    const archives = this.state.archives;
    return (
      <section className={css.wrapper}>
        <div className={css.header}>
          <h1 className={css.title}>{current}</h1>
          <nav className={css.navigation}>
            <Link to={`/archives/${prev}`}><span className="blind">뒤로</span></Link>
            <Link to={`/archives/${next}`}><span className="blind">앞으로</span></Link>
          </nav>
        </div>
        <Button
          className={css.write}
          href={`/archives/${current}/write`}
          type="primary"
          size="large"
          onClick={this.onClickWrite}
        >
          기록하기
        </Button>
        <div className={css.archive}>
          {archives === undefined && (
            <div className={css.guide}>
              <img src={imgCart} alt="" />
              <p>데이터를 가져오는 중입니다.</p>
            </div>
          )}
          {archives && archives.length === 0 && (
            <div className={css.guide}>
              <img src={imgBox} alt="" />
              <p>기록이 없습니다.</p>
            </div>
          )}
          {archives && archives.length > 0 && (
            <table className={css.table}>
              <thead>
              <tr>
                <th>시간</th>
                <th>종류</th>
                <th>먹은량</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              {archives.map(({ date, kind, volume }) => (
                <tr key={date}>
                  <td>{moment(date).format('HH:mm')}</td>
                  <td>{kind}</td>
                  <td>{volume > 0 ? `${volume} ml` : '-'}</td>
                  <td>
                    <Link to={`/archives/${current}/edit/${date}`}>수정</Link>
                    <span> / </span>
                    <a href="#" role="button">삭제</a>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    )
  }

  requestArchives() {
    const userId = this.state.user.uid;
    const current = this.props.match.params.current;
    actions.loadArchives(userId, current);
  }

  onClickWrite = (event) => {
    event.preventDefault();
    const url = event.currentTarget.getAttribute('href');
    this.props.history.push(url);
  };
}

export default Container.create(Archives);
