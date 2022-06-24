import React from "react";

function ImagePopup(props) {
    return(
        <div className={`popup popup_content_view-image ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__view-image-window">
                <img className="popup__image" src={props.card.link} alt={props.card.name} />
                <h2 className="popup__view-image-title">{props.card.name}</h2>
                <button className="popup__close button-styles" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup;