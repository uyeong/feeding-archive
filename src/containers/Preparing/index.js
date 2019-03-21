import React from 'react';
import css from './style.module.scss';

const Preparing = () => (
  <section className={css.wrapper}>
    <div className={css.dimmed} />
    <div className={css.loader} />
    <span className="blind">준비중</span>
  </section>
);

export default Preparing;
