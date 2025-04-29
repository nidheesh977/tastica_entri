export const validateData = (
  name,
  email,
  mobile,
  password,
  confirmPassword
) => {
  const isNameValid = /^[0-9A-Za-z]{3,16}$/.test(name);
  const emailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isMobileValid = /^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile);
  const isPasswordValid =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );
  const isConfirmPasswordValid = password === confirmPassword;

  if (!isNameValid) return "Name is not valid!";
  if (!emailValid) return "Email id is not valid!";
  if (!isMobileValid) return "Mobile number is not valid!";
  if (!isPasswordValid)
    return "Password must be at least 8 characters long and include at least one special character and one uppercase letter.";
  if (!isConfirmPasswordValid)
    return "Password and Confirm password do not match!";

  return null;
};
