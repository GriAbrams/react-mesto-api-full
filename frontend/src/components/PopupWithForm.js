export default function PopupWithForm({ isOpen, onOverlayClick, onClose, onSubmit, name, title, children, buttonText }) {
  return (
    <div className={`popup popup_action_${name} ${isOpen ? 'popup_action_opened' : ''}`} onClick={onOverlayClick}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form action="#" className={`popup__form popup__form_${name}`} name={name} noValidate onSubmit={onSubmit}>
          {children}
          <button className="popup__btn popup__btn_action_save">{buttonText}</button>
        </form>
        <button className="popup__btn popup__btn_action_close" aria-label="Закрыть окно" onClick={onClose}></button>
      </div>
    </div>
  )
}