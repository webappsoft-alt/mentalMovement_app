export const validateName = name => {
  const regex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
  return regex.test(name);
};

export const validateEmail = email => {
  // const regex = /^[a-zA-Z0-9!$%&()*+,-./:;<=>?@^_`{|}~]+@[a-zA-Z0-9.-]+$/;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhoneNumber = phoneNumber => {
  const regex = /^[1-9][0-9]{11}$|^10[0-9]{8}$/;
  return regex.test(phoneNumber);
};

export const validatePassword = password => {
  const regex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  return regex.test(password);
};
export const validateMessage = password => {
  const regex = /^[^\s]{0,2000}$/;

  return regex.test(password);
};
export const validateText = text => {
  const regex = /^\s+$/;
  return !regex.test(text);
};
export const validateId = text => {
  const regex = /\b\d{4,}\b/g;

  return !regex.test(text);
};
export const validateNumber = text => {
  const regex = /^\d+$/;
  return regex.test(text);
};
export const isWhitespacePresent = text => {
  return /\s/.test(text);
};

// export const validateName = name => {
//   // const regex = /^[a-zA-Z]+$/;
//   const regex = /^[A-Za-z]+(?:\s[A-Za-z]+)?$/;
//   return regex.test(name);
// };
// export const validateFLName = name => {
//   // const regex = /^[a-zA-Z]+$/;
//   const regex = /^[a-zA-Z]+$/;
//   return regex.test(name);
// };

// export const validateEmail = email => {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return regex.test(email);
// };

// export const validatePhoneNumber = phoneNumber => {
//   const regex = /^[1-9][0-9]{9}$|^10[0-9]{8}$/;
//   return regex.test(phoneNumber);
// };

// export const validatePassword = password => {
//   const regex =
//     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
//   return regex.test(password);
// };
// export const validateMessage = password => {
//   const regex = /^[^\s]{0,2000}$/;

//   return regex.test(password);
// };
export const validateUserName = userName => {
  const regex = /^[a-zA-Z0-9_-]+$/;

  return regex.test(userName);
};
