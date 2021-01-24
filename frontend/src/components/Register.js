import React from 'react';
import { Link } from 'react-router-dom';

export default function Register({ onRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({ email, password });
  }

  return (
    <section className="sign" name="register">
    <h2 className="sign__title">Регистрация</h2>
    <form className="sign__form" action="#" onSubmit={handleSubmit}>
      <input className="sign__input" type="email" placeholder="Email" value={email} onChange={handleChangeEmail} required />
      <input className="sign__input" type="password" placeholder="Пароль" value={password} onChange={handleChangePassword} required />
      <button className="sign__button">Зарегистрироваться</button>
    </form>
    <p className="sign__text">
      Уже зарегистрированы?&nbsp;
      <Link to="sign-in" className="sign__link">Войти</Link>
    </p>
  </section>
  )
}