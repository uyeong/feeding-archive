import React, { useContext, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button, Modal } from 'antd-mobile';
import actions from '../../flux/actions';
import { AppContext } from '../../App';
import FeedingStats from './FeedingStats';
import FeedingTable from './FeedingTable';
import css from './FeedingList.module.scss';

const FeedingList = ({ match, history }) => {
  const { user, feedings } = useContext(AppContext);
  const { current } = match.params;
  const prev = moment(current).subtract(1, 'days').format('YYYY-MM-DD');
  const next = moment(current).add(1, 'days').format('YYYY-MM-DD');
  const fnListenFeedings = useCallback(() => {
    actions.listenFeedings(user.uid, current)
  }, [current]);
  const fnOnClickWriteFeeding = useCallback((event) => {
    event.preventDefault();
    const url = event.currentTarget.getAttribute('href');
    history.push(url);
  }, []);
  const fnOnRemoveFeeding = useCallback((feeding) => {
    Modal.alert('삭제', '정말 삭제합니까?', [
      { text: '취소' },
      { text: '확인', onPress: () => {
        actions.removeFeeding(user.uid, feeding);
      } },
    ]);
  }, []);
  useEffect(() => fnListenFeedings(), [current]);
  return (
    <article className={css.wrapper}>
      <div className={css.header}>
        <h1 className={css.title}>{current}</h1>
        <nav className={css.navigation}>
          <Link to={`/feedings/${prev}`}><span className="blind">뒤로</span></Link>
          <Link to={`/feedings/${next}`}><span className="blind">앞으로</span></Link>
        </nav>
      </div>
      <FeedingStats feedings={feedings} />
      <FeedingTable current={current} feedings={feedings} onRemove={fnOnRemoveFeeding} />
      <Button
        className={css.write}
        href={`/feedings/${current}/write`}
        type="primary"
        size="large"
        onClick={fnOnClickWriteFeeding}
      >
        기록하기
      </Button>
    </article>
  );
};

export default FeedingList;
