export const validateData = (userName, email, phoneNumber, password) => {
  const isNameValid = /^[0-9A-Za-z]{3,16}$/.test(userName);
  const emailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isMobileValid = /^(\+\d{1,3}[- ]?)?\d{10}$/.test(phoneNumber);
  const isPasswordValid = /^(?=.*\d).{8,}$/.test(password);

  if (!isNameValid) return "Invalid name!";
  if (!emailValid) return "Invalid! email id!";
  if (!isMobileValid) return "Invalid mobile number!";
  if (!isPasswordValid)
    return "Password must be at least 8 characters long and include at least one number.";

  return null;
};
