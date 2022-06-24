import React from 'react';
import {  useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
// Временно заменил все Link в проекте на <a> т.к у меня по какой-то причине не работает react-router, ссылки меняются, но реакт не перезагружает страницу
import Logo from '../images/logo.svg';

function Header(props) {
    const location = useLocation();
    return(
        <header className="header">
            <img className="header__logo" src={Logo} alt="Логотип" />
            <div className='header__container'>
                {location.pathname === '/signup' ?
                    <Link className='header__link' to="/signin">Войти</Link>
                    : location.pathname === '/signin' ?
                        <Link className='header__link' to="/signup">Регистрация</Link>
                        : <>
                            <Link className='header__link' to="/signin" onClick={props.onSignOut}>Выйти</Link>
                            <p className='header__email'>{props.email}</p>
                        </>
                }
            </div>
        </header>
    )
}

export default Header;