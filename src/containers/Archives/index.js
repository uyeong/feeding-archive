import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'flux/utils';
import moment from 'moment';
import { Button } from 'antd-mobile';
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
            <tr>
              <td>10:30</td>
              <td>모유</td>
              <td>50 ml</td>
              <td>
                <Link to={`/archives/${current}/edit/1`}>수정</Link>
              </td>
            </tr>
            <tr>
              <td>13:00</td>
              <td>분유</td>
              <td>60 ml</td>
              <td>
                <Link to={`/archives/${current}/edit/2`}>수정</Link>
              </td>
            </tr>
            <tr>
              <td>15:10</td>
              <td>수유</td>
              <td>-</td>
              <td>
                <Link to={`/archives/${current}/edit/3`}>수정</Link>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>
    )
  }

  onClickWrite = (event) => {
    event.preventDefault();
    const url = event.currentTarget.getAttribute('href');
    this.props.history.push(url);
  };
}

export default Container.create(Archives);
