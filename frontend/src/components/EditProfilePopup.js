import React from "react";
import CurrentUserContext from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm 
            name="edit-profile" 
            title="Редактировать профиль"
            submitText="Отправить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input 
                className="popup__input popup__input_content_name" name="name" maxLength="40" minLength="2" required 
                value={name || ''} 
                onChange={handleNameChange} 
            />
            <span className="popup__error name-error"></span>
            <input 
                className="popup__input popup__input_content_subname" name="info" maxLength="200" minLength="2" required 
                value={description || ''}
                onChange={handleDescriptionChange}
            />
            <span className="popup__error info-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;