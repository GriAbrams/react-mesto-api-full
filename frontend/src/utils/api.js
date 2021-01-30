class Api {
  constructor (config) {
    this._url = config.url;
  }

  _sendRequest(link, params) {
    return fetch(link, params)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getUserInfo(token) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  getInitialCards(token) {
    return this._sendRequest(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  setUserInfo(data, token) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  addNewCard(data, token) {
    return this._sendRequest(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
  }

  changeLikeCardStatus(card, like, token) {
    if (like) {
      return this._sendRequest(`${this._url}/cards/${card}/likes`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    } else {
      return this._sendRequest(`${this._url}/cards/${card}/likes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    }
  }

  deleteCard(cardId, token) {
    return this._sendRequest(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  editUserAvatar(data, token) {
    return this._sendRequest(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
  }
}

export const api = new Api({
  // url: 'https://api.griabrams.students.nomoredomains.rocks'
  url: 'http://localhost:3000'
});