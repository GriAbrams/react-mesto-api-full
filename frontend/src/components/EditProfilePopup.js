import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onOverlayClick, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [buttonText, setButtonText] = React.useState('');

  React.useEffect(() => {
    setButtonText('Сохранить');
  }, [isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setButtonText('Сохранение...');
    onUpdateUser({
      name,
      about: description,
    });
  }
  
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  return (
    <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input type="text" className="popup__input" id="user-name" name="name" placeholder="Ваше имя" minLength="2" maxLength="40" required value={name || ''} onChange={handleNameChange} />
        <span className="popup__input-error" id="user-name-error"></span>
      </label>
      <label className="popup__label">
        <input type="text" className="popup__input" id="about" name="about" placeholder="Расскажите о себе" minLength="2" maxLength="200" required value={description || ''} onChange={handleDescriptionChange} />
        <span className="popup__input-error" id="about-error"></span>
      </label>
    </PopupWithForm>
  )
}