export const BASE_URL = "https://api.mesto.willframe.nomoredomains.xyz";

function checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            password, 
            email
        })
    })
    .then(res => checkResponse(res))
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            password,
            email
        })
    })
    .then(res => checkResponse(res))
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
    .then(res => checkResponse(res))
}

