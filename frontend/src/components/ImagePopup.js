export default function ImagePopup({ isOpen, onOverlayClick, onClose, card }) {
  return (
    <div className={`popup popup_action_opened-img ${isOpen ? 'popup_action_opened' : ''}`} onClick={onOverlayClick}>
      <div className="popup__container popup__container_opened-img">
        <img src={card.link} alt={card.name} className="popup__img" />
        <h2 className="popup__title popup__title_opened-img">{card.name}</h2>
        <button className="popup__btn popup__btn_action_close" aria-label="Закрыть окно" onClick={onClose}></button>
      </div>
    </div>
  );
}