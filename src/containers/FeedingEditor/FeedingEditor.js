import React, { Component } from 'react';
import { Container } from 'flux/utils';
import store from '../../flux/store';
import actions from '../../flux/actions';
import Form from './Form';
import css from './FeedingEditor.module.scss';

let target;

class FeedingEditor extends Component {
  static getStores() {
    return [store];
  }

  static calculateState() {
    return store.getState();
  }

  componentDidMount() {
    if (this.state.feedings === undefined) {
      const { uid } = this.state.user;
      const { current } = this.props.match.params;
      setTimeout(() => actions.listenFeedings(uid, current));
    }
  }

  render() {
    const { feedings, processing: { feeding } } = this.state;
    const { current, id } = this.props.match.params;
    target = undefined;
    if (id && feedings && feedings.length > 0) {
      target = feedings.find(a => a.id === id);
    }
    return (
      <article className={css.wrapper}>
        <h1 className="blind">기록하기</h1>
        <div className={css['input-wrap']}>
          <Form
            date={current}
            feeding={target}
            loading={feeding}
            onCancel={this.onCancel}
            onSubmit={this.onSubmit}
          />
        </div>
      </article>
    );
  }

  onCancel = () => {
    this.props.history.goBack();
  };

  onSubmit = async (values) => {
    try {
      if (target) {
        const { user: { uid } } = this.state;
        await actions.updateFeeding(uid, target.id, values);
      } else {
        await actions.saveFeeding(this.state.user.uid, values);
      }
    }
    catch (e) {}
    finally {
      this.props.history.goBack();
    }
  };
}

export default Container.create(FeedingEditor);
