import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(email, password);
    }

    return(
        <div className="auth">
            <h2 className="auth__title">Регистрация</h2>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input 
                    className="auth__input" type="email" placeholder="Email" name="email" maxLength="20" minLength="2" required 
                    onChange={handleEmailChange} 
                    value={email || ''}
                />
                <input 
                    className="auth__input" type="password" placeholder="Пароль" name="password" maxLength="20" minLength="8" required 
                    onChange={handlePasswordChange} 
                    value={password || ''}
                />
                <button className="auth__button" type="submit">Зарегистрироваться</button>
            </form>
            <p className="auth__text">Уже зарегестрированы? <Link className="auth__link" to='/signin'>Войти</Link></p>
        </div>
    )
}

export default Register;