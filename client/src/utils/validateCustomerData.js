export const validateCustomerData = (customerName, phoneNumber) => {
  
  
  const isNameValid = /^[0-9A-Za-z]{3,16}$/.test(customerName);
  const isMobileValid = /^(\+\d{1,3}[- ]?)?\d{10}$/.test(phoneNumber);
  if (!isNameValid) return "Invalid name!";
  if (!isMobileValid) return "Invalid mobile number!";
  return null;
};
