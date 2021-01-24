import React from 'react';
import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ loggedIn, onSignOut, email, isMobile }) {
  const { pathname } = useLocation();
  const pathText = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
  const pathRoute = `${pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;

  const [isOpen, setIsOpen] = React.useState(false);

  function handleMenuClick() {
    setIsOpen(!isOpen);
  }

  return (
    isMobile
      ? (<>
          <header className="header-mobile">
            <div className={`header-mobile__menu ${loggedIn && isOpen ? 'header-mobile__menu_opened' : ''}`}>
              <p className="header-mobile__email">{email}</p>
              <Link to="" className="header-mobile__link header-mobile__link_action_exit" onClick={onSignOut}>Выйти</Link>
            </div>
            <div className="header-mobile__wrapper">
              <img src={logo} alt="Логотип сайта Место" className="header-mobile__logo" />
              {loggedIn
                ? (<button className={`header-mobile__btn ${isOpen ? 'header-mobile__btn_action_close' : 'header-mobile__btn_action_menu'}`} onClick={handleMenuClick}></button>)
                : (<Link to={pathRoute} className="header__link">{pathText}</Link>)
              }
            </div>
          </header>
        </>)
      : (<>
          <header className="header">
            <img src={logo} alt="Логотип сайта Место" className="header__logo" />
            <div className="header__wrapper">
              {loggedIn
                ? (<>
                    <p className="header__email">{email}</p>
                    <Link to="" className="header__link header__link_action_exit" onClick={onSignOut}>Выйти</Link>
                  </>)
                : (<Link to={pathRoute} className="header__link">{pathText}</Link>)
              }
            </div>
          </header>
        </>)
  )
}