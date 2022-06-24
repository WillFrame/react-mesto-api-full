import React from "react";

function PopupWithForm(props) {
    return(
        <div className={`popup popup_content_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__window">
                <button className="popup__close button-styles" type="button" onClick={props.onClose}></button>
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="popup__save-button" type="submit">{props.submitText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;