export class Api {
    constructor(options) {
        this._apiUrl = options.apiUrl;
        this._cohort = options.cohort;
        this._token = options.token;
        this._pathToCards = options.pathToCards;
        this._pathToMyCard = options.pathToMyCard;
    }

    _getApiData(requestUrl) {
        return fetch(requestUrl, {
            headers: {
                authorization: this._token,
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err;
            })
    }

    _setApiData(requestUrl, options, method) {
        return fetch(requestUrl, {
            method: method,
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then((result) => {
                return result;
            })
            .catch((err) => {
                return err;
            })
    }

    getInitialCards() {
        return this._getApiData(`${this._apiUrl}${this._cohort}${this._pathToCards}`);
    }

    getUserInfo() {
        return this._getApiData(`${this._apiUrl}${this._cohort}${this._pathToMyCard}`);
    }

    setUserInfo(options) {
        return this._setApiData(`${this._apiUrl}${this._cohort}${this._pathToMyCard}`, options, 'PATCH');
    }

    setNewCard(options) {
        return this._setApiData(`${this._apiUrl}${this._cohort}${this._pathToCards}`, options, 'POST');
    }

    toggleLike(id, method) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}${this._pathToCards}/${id}/likes`, {
            method: method,
            headers: {
                authorization: this._token
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err;
            })
    }
}