import React from "react";
import CurrentUserContext from "../context/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `elements__card-heart ${isLiked ? 'elements__card-heart_active' : ''}`
    );

    const cardDeleteButtonClassName = (
        `elements__card-delete-button button-styles ${isOwn ? 'elements__card-delete-button_visible' : 'elements__card-delete-button_hidden'}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return(
        <div className="elements__card">
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
            <img className="elements__card-photo" src={props.card.link} onClick={handleClick} />
            <div className="elements__card-info">
                <h2 className="elements__card-title">{props.card.name}</h2>
                <div className="elements__like-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <span className="elements__card-like-count">{props.card.likes.length}</span>
                </div>
            </div>
        </div>
    )
}

export default Card;