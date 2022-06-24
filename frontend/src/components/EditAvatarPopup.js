import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const refAvatar = React.useRef()

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: refAvatar.current.value,
        });
    }

    React.useEffect(() => {
        refAvatar.current.value = '';
    });

    return(
        <PopupWithForm 
            name="edit-avatar"
            title="Обновить аватар"
            submitText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input 
                className="popup__input popup__input_content_avatar" name="avatar" placeholder="Ссылка на картинку" type="url" required
                ref={refAvatar}
            />
            <span className="popup__error avatar-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;