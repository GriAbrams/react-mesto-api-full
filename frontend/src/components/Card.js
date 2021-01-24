import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButton = (`card__btn ${isOwn ? 'card__btn_action_delete-visible' : 'card__btn_action_delete-none'}`);
  
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButton = (`card__btn ${isLiked ? 'card__btn_action_like-active' : 'card__btn_action_like-inactive'}`); 

  
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <div className="card">
      <button className={cardDeleteButton} aria-label="Удалить карточку" onClick={handleCardDelete}></button>
      <img className="card__img" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="card__descr">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-wrapper">
          <button className={cardLikeButton} aria-label="Поставить лайк" onClick={handleLikeClick}></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div> 
    </div>
  );
}