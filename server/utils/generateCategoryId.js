export const generateCategoryId = () => {
    const prefix = 'CATE';
    const randomNumber = Math.floor(Math.random() * 1000);
    const paddedNumber = String(randomNumber).padStart(3, '0');
    return `${prefix}${paddedNumber}`;
  }