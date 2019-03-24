import React, { useContext, useEffect, useCallback, useRef } from 'react';
import actions from '../../flux/actions';
import { AppContext } from '../../App';
import Form from './Form';
import css from './FeedingEditor.module.scss';

const FeedingEditor = ({ match, history }) => {
  const { user, feedings, processing: { feeding } } = useContext(AppContext);
  const { current, id } = match.params;
  const target = useRef();
  if (id && feedings && feedings.length > 0) {
    target.current = feedings.find(a => a.id === id);
  }
  const fnOnCancel = useCallback(() => {
    history.goBack();
  }, []);
  const fnOnSubmit = useCallback(async (values) => {
    try {
      if (target.current) {
        await actions.updateFeeding(user.uid, target.current.id, values);
      } else {
        await actions.saveFeeding(user.uid, values);
      }
      history.goBack();
    }
    catch (e) {}
  }, []);
  useEffect(() => {
    if (feedings === undefined) {
      actions.listenFeedings(user.uid, current);
    }
  }, [current]);
  return (
    <article className={css.wrapper}>
      <h1 className="blind">기록하기</h1>
      <div className={css['input-wrap']}>
        <Form
          current={current}
          feeding={target.current}
          loading={feeding}
          onCancel={fnOnCancel}
          onSubmit={fnOnSubmit}
        />
      </div>
    </article>
  );
};

export default FeedingEditor;
