import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.USER;

const SERVER_URL = `https://4.react.pages.academy`;

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].authorizationStatus;
};

const adaptUserData = (userData) => {
  if (userData) {
    if (userData.avatar_url) {
      return {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        avatarUrl: SERVER_URL + userData.avatar_url,
      };
    }
  }

  return userData;
};

export const getUserInfo = (state) => {
  return adaptUserData(state[NAME_SPACE].userInfo);
};
