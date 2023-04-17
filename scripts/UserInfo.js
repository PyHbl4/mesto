export class UserInfo {
    constructor({ nameSelector, infoSelector }) {
        this.nameElement = document.querySelector(nameSelector);
        this.infoElement = document.querySelector(infoSelector);
    }

    getUserInfo() {
        return {
            name: this.nameElement.textContent,
            info: this.infoElement.textContent
        };
    }

    setUserInfo({ name, info }) {
        this.nameElement.textContent = name;
        this.infoElement.textContent = info;
    }
}