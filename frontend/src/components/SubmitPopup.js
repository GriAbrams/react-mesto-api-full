import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function SubmitPopup({ isOpen, onOverlayClick, onClose, onCardDelete, card }) {
  const [buttonText, setButtonText] = React.useState('');

  React.useEffect(() => {
    setButtonText('Да');
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setButtonText('Удаление...');
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name='confirm'
      title='Вы уверены?'
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onCardDelete={onCardDelete}
      onSubmit={handleSubmit}
    />
  )
}