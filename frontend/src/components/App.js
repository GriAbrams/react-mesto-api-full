import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import SubmitPopup from './SubmitPopup';
import InfoTooltip from './InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import { authApi } from '../utils/authApi';
import ProtectedRoute from './ProtectedRoute';

export default function App() {
  const history = useHistory();
  const isMobile = useMediaQuery({ query: '(max-width: 510px)' })

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccessAuth, setIsSuccessAuth] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isSubmitPopupOpen, setSubmitPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (loggedIn) {
    Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      }).catch((err) => console.log(err));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authApi.getItem(token)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push('/');
        }
      }).catch(err => console.log(err));
    }
  }, [history]);

  function onRegister(data) {
    authApi.registerUser(data)
    .then(() => {
      setIsInfoTooltipOpen(true);
      setIsSuccessAuth(true);
      history.push('/sign-in');
    })
    .catch((err) => {
      setIsInfoTooltipOpen(true);
      setIsSuccessAuth(false);
      console.log(err);
      }
    );
  }

  function onLogin(data) {
    authApi.loginUser(data)
    .then((res) => {
      localStorage.setItem('token', res.token);
      setLoggedIn(true);
      setEmail(data.email);
      history.push('/');
    }).catch((err) => console.log(err));
  }

  function onSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setEmail('');
    history.push('/sign-in');
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleUpdateUser(inputValues) {
    const token = localStorage.getItem('token');
    api.setUserInfo(inputValues, token)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch((err) => console.log(err));
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleUpdateAvatar(userLink) {
    const token = localStorage.getItem('token');
    api.editUserAvatar(userLink, token)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch((err) => console.log(err));
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleAddPlaceSubmit(inputValues) {
    const token = localStorage.getItem('token');
    api.addNewCard(inputValues, token)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => console.log(err));
  }

  function handleCardClick(card) {
    setSelectedCard({name: card.name, link: card.link});
    setImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const token = localStorage.getItem('token');
    api.changeLikeCardStatus(card._id, isLiked, token)
    .then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    }).catch((err) => console.log(err));
  }

  function handleDeleteClick(card) {
    setSelectedCard(card);
    setSubmitPopupOpen(true);
  }

  function handleCardDelete(card) {
    const token = localStorage.getItem('token');
    api.deleteCard(card._id, token)
    .then(() => {
      const newCards = cards.filter((c) => c !== card);
      setCards(newCards);
      closeAllPopups();
    }).catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({name: '', link: ''});
    setImagePopupOpen(false);
    setSubmitPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleCloseOverlayClick(evt) {
    if (evt.target === evt.currentTarget) { 
      closeAllPopups(); 
    } 
  }

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups(); 
      }
    }
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header 
            loggedIn={loggedIn}
            onSignOut={onSignOut}
            email={email}
            isMobile={isMobile}
          />
          <Switch>
            <ProtectedRoute
              exact path='/'
              loggedIn={loggedIn}
              component={Main}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
            />
            <Route path='/sign-in'>
              <Login
                onLogin={onLogin}
              />
            </Route>
            <Route path='/sign-up'>
              <Register
                onRegister={onRegister}
              />
            </Route>
            <Route>
              {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
            </Route>
          </Switch>
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onOverlayClick={handleCloseOverlayClick}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onOverlayClick={handleCloseOverlayClick}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onOverlayClick={handleCloseOverlayClick}
        />
        <SubmitPopup 
          card={selectedCard}
          isOpen={isSubmitPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          onOverlayClick={handleCloseOverlayClick}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={handleCloseOverlayClick}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          onOverlayClick={handleCloseOverlayClick} 
          isSuccessAuth={isSuccessAuth}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}