import React from 'react';
import successIcon from '../images/success-icon.svg';
import errorIcon from '../images/error-icon.svg';

export default function InfoTooltip({ isOpen, onClose, onOverlayClick, isSuccessAuth }) {
  return (
    <div className={`popup ${isOpen ? 'popup_action_opened' : ''}`} onClick={onOverlayClick}>
      <div className="popup__container">
        {isSuccessAuth
          ? (<>
              <img src={successIcon} className="popup__icon" alt="success img" />
              <p className="popup__text">Вы успешно зарегистрировались!</p>
            </>)
          : (<>
              <img src={errorIcon} className="popup__icon" alt="error img" />
              <p className="popup__text">Что-то пошло не так! Попробуйте ещё раз.</p>
            </>)
        }
        <button className="popup__btn popup__btn_action_close" aria-label="Закрыть окно" onClick={onClose}></button>
      </div>
    </div>
  )
}