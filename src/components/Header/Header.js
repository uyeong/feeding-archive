import React from 'react';
import actions from '../../flux/actions';
import css from './Header.module.scss';

const Header = ({ useLogoutBtn }) => (
  <header className={css.wrapper}>
    <div className={css.inner}>
      <h1 className={css.title}>Feeding Archive</h1>
      {useLogoutBtn && (
        <button className={css.logout} onClick={() => actions.logout() }>
          <span className="blind">로그아웃</span>
        </button>
      )}
    </div>
  </header>
);

export default Header;
