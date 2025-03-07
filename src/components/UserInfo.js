class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector, userAvatarSelector }) {
    this._userNameSelector = userNameSelector;
    this._userDescriptionSelector = userDescriptionSelector;
    this._userAvatarSelector = userAvatarSelector;
    this._userNameElement = document.querySelector(this._userNameSelector);
    this._userDescriptionElement = document.querySelector(this._userDescriptionSelector);
    this._userAvatarElement = document.querySelector(this._userAvatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent,
      userAvatar: this._userAvatarElement.src,
    };
  }

  setUserinfo({ userName, userDescription, userAvatar }) {
    this._userNameElement.textContent = userName;
    this._userDescriptionElement.textContent = userDescription;
    this._userAvatarElement.src = userAvatar;
  }
}

export default UserInfo;