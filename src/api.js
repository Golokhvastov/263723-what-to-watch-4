import axios from "axios";

const Error = {
  UNAUTHORIZED: 401,
  SERVER_ERRORS: 500
};

const createAPI = (onUnauthorized, onServerUnavailable) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/wtw`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;
    if (!response || response.status >= Error.SERVER_ERRORS) {
      onServerUnavailable();
      throw err;
    }
    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();
      throw err;
    }
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export {createAPI};
