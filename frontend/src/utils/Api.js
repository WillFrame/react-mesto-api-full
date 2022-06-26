class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._setHeaders()
        })
        .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._setHeaders()
        })
        .then(this._checkResponse)
    }

    editProfile(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._setHeaders(),
            body: JSON.stringify({
                name,
                about
            })
        })
        .then(this._checkResponse)
    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._setHeaders(),
            body: JSON.stringify({
                name,
                link
            })
        })
        .then(this._checkResponse)
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._setHeaders()
        })
        .then(this._checkResponse)
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: isLiked ? "PUT" : "DELETE",
            headers: this._setHeaders()
        })
        .then(this._checkResponse)
    }

    editAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._setHeaders(),
            body: JSON.stringify({
                avatar
            })
        })
        .then(this._checkResponse)
    }

    _setHeaders() {
        return {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
            'Content-Type': 'application/json'
        }
      }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(res.status);
    }
}

const api = new Api({
    baseUrl: 'https://api.mesto.willframe.nomoredomains.xyz'
});

export default api;