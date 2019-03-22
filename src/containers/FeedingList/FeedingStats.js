import React from 'react';
import css from './FeedingStats.module.scss';

const FeedingStats = ({ feedings }) => {
  let milkCount = '?';
  let powderCount = '?';
  let breastCount = '?';
  let milkVolume = '?';
  let powderVolume = '?';
  let arcSize = 0;
  if (feedings) {
    const milks = feedings.filter(f => f.kind === '모유');
    const powders = feedings.filter(f => f.kind === '분유');
    const breasts = feedings.filter(f => f.kind === '수유');
    milkCount = milks.length;
    powderCount = powders.length;
    breastCount = breasts.length;
    milkVolume = milks.reduce((c, v) => c + v.volume, 0);
    powderVolume = powders.reduce((c, v) => c + v.volume, 0);
    arcSize = (milkVolume / (milkVolume + powderVolume)) * 251;
  }
  return (
    <section className={css.wrapper}>
      <h2 className="blind">현황</h2>
      <div className={css.count}>
        <dl>
          <dt>모유</dt>
          <dd>{milkCount}</dd>
        </dl>
        <dl>
          <dt>분유</dt>
          <dd>{powderCount}</dd>
        </dl>
        <dl>
          <dt>수유</dt>
          <dd>{breastCount}</dd>
        </dl>
      </div>
      <div className={css.volume}>
        <div className={css.stats}>
          <h3>먹은량</h3>
          <ul>
            <li>모유: {milkVolume} ml</li>
            <li>분유: {powderVolume} ml</li>
          </ul>
        </div>
        <div className={css.graph}>
          <svg viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke={feedings ? '#36cfc9' : '#ebebeb'}
              strokeWidth="20"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#ff7875"
              strokeWidth="20"
              fill="none"
              strokeDasharray={`${arcSize},${251 - arcSize}`}
              strokeDashoffset="62.75"
            />
          </svg>
        </div>
      </div>
    </section>
  )
};

export default FeedingStats;
