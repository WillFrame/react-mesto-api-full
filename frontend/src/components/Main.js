import React from "react";
import Card from "./Card";
import CurrentUserContext from "../context/CurrentUserContext";

function Main({cards = [], onCardClick, onCardDelete, onCardLike, onEditAvatar, onAddPlace, onEditProfile}) {
    const currentUser = React.useContext(CurrentUserContext);
    return(
        <main className="content">
            <section className="profile">
                <img className="profile__avatar" src={currentUser.avatar} alt=" " />
                <button className="profile__avatar-button" type="button" onClick={onEditAvatar}></button>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <h2 className="profile__subname">{currentUser.about}</h2>
                    <button className="profile__edit-button button-styles" type="button" onClick={onEditProfile}></button>
                </div>
                <button className="profile__add-button button-styles" type="button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map((item) => 
                    <Card 
                        card={item}
                        onCardClick={onCardClick}
                        key={item._id}
                        onCardDelete={onCardDelete}
                        onCardLike ={onCardLike}
                    />
                )}
            </section>
        </main>
    );
}

export default Main;