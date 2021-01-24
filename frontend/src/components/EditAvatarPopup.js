import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onOverlayClick, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef('');
  const [buttonText, setButtonText] = React.useState('');

  React.useEffect(() => {
    avatarRef.current.value = '';
    setButtonText('Сохранить');
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setButtonText('Сохранение...');
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input type="url" className="popup__input" id="avatar-link" name="link" placeholder="Ссылка на картинку" required ref={avatarRef} />
        <span className="popup__input-error" id="link-error"></span>
      </label>
    </PopupWithForm>
  )
}
