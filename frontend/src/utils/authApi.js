class Api {
  constructor (config) {
    this._url = config.url;
    this._headers = config.headers;
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

  registerUser(data) {
    return this._sendRequest(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: data.password,
        email: data.email
      })
    });
  }

  loginUser(data) {
    return this._sendRequest(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: data.password,
        email: data.email
      })
    });
  }

  getItem(token) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }
}

export const authApi = new Api({
  url: 'https://api.abrams.students.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json'
  }
});