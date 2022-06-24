import React from "react";
import successLogo from '../images/registration-succes.svg';
import failLogo from '../images/registration-fail.svg';

function InfoTooltip(props) {

    return(
        <div className={`popup popup_content_registration-info ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__window">
                <img className="popup__registration-info-image" src={`${props.isSuccess ? successLogo : failLogo}`} />
                <h2 className="popup__registration-info-title">{`${props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`}</h2>
                <button className="popup__close button-styles" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip;