import React from 'react';

export default function Login({ onLogin }) {
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
    onLogin({ email, password });
  }

  return (
    <section className="sign" name="login">
      <h2 className="sign__title">Вход</h2>
      <form className="sign__form" action="#" onSubmit={handleSubmit}>
        <input className="sign__input" type="email" placeholder="Email" value={email} onChange={handleChangeEmail} required />
        <input className="sign__input" type="password" placeholder="Пароль" value={password} onChange={handleChangePassword} required />
        <button className="sign__button">Войти</button>
      </form>
    </section>
  )
}