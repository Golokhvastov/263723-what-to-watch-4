export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const checkEmail = (email) => {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test(email);
};

export const formatReviewDate = (date) => {
  const formatDate = new Date(date).toLocaleString(`en-us`, {
    month: `long`,
    year: `numeric`,
    day: `numeric`
  });
  return formatDate;
};

export const checkText = (text) => {
  if (text.length >= 50 && text.length <= 400) {
    return true;
  }
  return false;
};
