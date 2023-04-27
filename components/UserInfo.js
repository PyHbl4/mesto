export class UserInfo {
    constructor(nameSelector, infoSelector, avatarImageSelector) {
        this.nameElement = document.querySelector(nameSelector);
        this.infoElement = document.querySelector(infoSelector);
        this.avatarImageElement = document.querySelector(avatarImageSelector);
    }

    getUserInfo() {
        return {
            name: this.nameElement.textContent,
            info: this.infoElement.textContent
        };
    }

    setUserInfo(name, info) {
        this.nameElement.textContent = name;
        this.infoElement.textContent = info;
    }

    setUserAvatar(avatarSrc) {
        this.avatarImageElement.src = avatarSrc;
    }
}