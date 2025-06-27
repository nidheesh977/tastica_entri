  export const generateStaffId = (prefix) => {
    const randomNumber = Math.floor(Math.random() * 1000);
    const randomNumberOneToNine = Math.floor(Math.random() * 10) 
    const paddedNumber = String(randomNumber).padStart(4, randomNumberOneToNine.toString());
    return `${prefix}${paddedNumber}`;
  }