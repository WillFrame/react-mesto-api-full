import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name,
            link
        })
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    return (        
        <PopupWithForm
            name="add-card"
            title="Новое место"
            submitText="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input 
                className="popup__input popup__input_content_title" name="name" placeholder="Название" maxLength="30" minLength="2" required
                onChange={handleNameChange} value={name}
            />
            <span className="popup__error name-error"></span>
            <input 
                className="popup__input popup__input_content_image" name="link" placeholder="Ссылка на картинку" type="url" required
                onChange={handleLinkChange} value={link}
            />
            <span className="popup__error link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;