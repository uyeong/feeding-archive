import React from 'react';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from 'moment';
import imgCart from '../../images/img-cart.svg';
import imgBox from '../../images/img-box.svg';
import css from './FeedingTable.module.scss';

const FeedingTable = ({ current, feedings, onRemove }) => (
  <section className={css.wrapper}>
    <h2 className="blind">기록표</h2>
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
                <button onClick={onRemove.bind(null, feeding)}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </ReactCSSTransitionGroup>
      </table>
    )}
  </section>
);

export default FeedingTable;
