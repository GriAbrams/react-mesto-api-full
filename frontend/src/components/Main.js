import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  if (cards.length === 0) {
    return (
      <main className="content">
        <div className="content__loader"></div>
      </main>
    )
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar" />
          <button className="profile__avatar-btn" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__job">{currentUser.about}</p>
          <button className="profile__btn profile__btn_action_edit" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
        </div>
        <button className="profile__btn profile__btn_action_add" aria-label="Добавить новую карточку" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        {cards.map(card => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
          )
        )}
      </section>
    </main>
  )
}