import React from 'react';
import css from './Header.module.scss';

const Header = () => (
  <header className={css.wrapper}>
    <div className={css.inner}>
      <h1 className={css.title}>Feeding Archive</h1>
    </div>
  </header>
);

export default Header;
