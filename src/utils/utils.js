export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const checkEmail = (email) => {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test(email);
};
