import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header.js';
import Login from './Login.js';
import Register from './Register.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ProtectedRoute from './ProtectedRoute.js';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip.js';
import api from '../utils/Api';
import { register, authorize, getContent } from '../utils/Auth.js';
import CurrentUserContext from '../context/CurrentUserContext';
import '../App.css';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [IsInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] =  React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = React.useState(true);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [email, setEmail] = React.useState('');
    const [cards, setCards] = React.useState([]);
    const navigate = useNavigate();

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                const newCards = cards.data.map((c) => (c._id === card._id ? newCard.data : c));
                setCards({ data: newCards });
            })
            .catch(err => console.log(err));
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.data.filter((c) => c._id !== card._id)
                setCards({data: newCards})
            })
            .catch(err => console.log(err));
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddCardClick() {
        setIsAddPlacePopupOpen(true);
    }    

    function handleUpdateUser(data) {
        api.editProfile(data.name, data.about)
            .then(data => {
                setCurrentUser(data.data);
                closeAllPopups();
            })
            .catch(err => console.log(err));
    }

    function handleUpdateAvatar(data) {
        api.editAvatar(data.avatar)
            .then(data => {
                setCurrentUser(data.data);
                closeAllPopups();
            })
            .catch(err => console.log(err));
    }

    function handleAddPlace(data) {
        api.addCard(data.name, data.link)
            .then(newCard => {
                setCards({data: [newCard.data, ...cards.data]});
                closeAllPopups();
            })
            .catch(err => console.log(err));
    }

    function handleCardClick(card) {
        setIsImagePopupOpen(true);
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setIsInfoTooltipOpen(false);
    }

    function handleRegister(email, password) {
        register(email, password)
            .then(() => {
                setIsInfoTooltipSuccess(true);
                setIsInfoTooltipOpen(true);
                navigate('/signin');
            })
            .catch((err) => {
                console.log(err);
                setIsInfoTooltipSuccess(false);
                setIsInfoTooltipOpen(true);
            })
    }

    function handleLogin(email, password) {
        authorize(email, password)
            .then((res) => {
                localStorage.setItem('jwt', res.token)
                setIsLoggedIn(true);
                setEmail(email);
                navigate('/');
            })
            .catch((err) => {
                console.log(err)
                setIsInfoTooltipSuccess(false);
                setIsInfoTooltipOpen(true);
            })
    }

    function handleSignOut() {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        setEmail('');
        navigate('/signin');
    }

    React.useEffect(() => {
        if (isLoggedIn) {
            api.getProfile()
            .then(res => {
                setCurrentUser(res.data);
            })
            .catch(err => console.log(err));

            api.getInitialCards()
            .then((cardList) => {
                setCards(cardList);
            })
            .catch(err => console.log(err));
        }
    }, [isLoggedIn]);

    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            getContent(jwt)
                .then((res) => {
                    if (res) {
                        setEmail(res.data.email)
                        setIsLoggedIn(true);
                        navigate('/');
                    }
                })
                .catch((err) => console.log(err));
        }
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header email={email} onSignOut={handleSignOut} />

            <Routes>
                <Route path="/signup" element={
                    <>
                        <Register onRegister={handleRegister} />
                        <InfoTooltip isOpen={IsInfoTooltipOpen} onClose={closeAllPopups} isSuccess={isInfoTooltipSuccess} />
                    </>
                }/>
                <Route path="/signin" element={
                    <>
                        <Login onLogin={handleLogin} />
                        <InfoTooltip isOpen={IsInfoTooltipOpen} onClose={closeAllPopups} isSuccess={isInfoTooltipSuccess} />
                    </>
                }/>
                <Route exact path="/" element={
                    <>
                        <ProtectedRoute
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddCardClick} 
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            onCardLike = {handleCardLike}
                            onCardDelete = {handleCardDelete}
                            cards = {cards.data}
                            component={Main}
                            isLoggedIn={isLoggedIn}
                        />
                        <Footer />
                    </>
                }/>
                <Route path="*" element={isLoggedIn ? <Navigate to='/' /> : <Navigate to='/signin' />} />
            </Routes>

            <EditProfilePopup 
                isOpen={isEditProfilePopupOpen} 
                onClose={closeAllPopups} 
                onUpdateUser={handleUpdateUser} 
            />

            <EditAvatarPopup 
                isOpen={isEditAvatarPopupOpen} 
                onClose={closeAllPopups} 
                onUpdateAvatar={handleUpdateAvatar} 
            />

            <AddPlacePopup 
                isOpen={isAddPlacePopupOpen} 
                onClose={closeAllPopups} 
                onAddPlace={handleAddPlace} 
            />

            <PopupWithForm 
                name="close-submit" 
                title="Вы уверены?" 
                submitText="Да" 
            />

            <ImagePopup 
                card={selectedCard} 
                isOpen={isImagePopupOpen} 
                onClose={closeAllPopups} 
            />
        </CurrentUserContext.Provider>
    );
}

export default App;