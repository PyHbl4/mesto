export class Api {
    constructor(options) {
        this._apiUrl = options.apiUrl;
        this._cohort = options.cohort;
        this._token = options.token;
        this._pathToCards = options.pathToCards;
        this._pathToMyCard = options.pathToMyCard;
    }

    getInitialCards() {
        return fetch(`${this._apiUrl}${this._cohort}${this._pathToCards}`, {
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