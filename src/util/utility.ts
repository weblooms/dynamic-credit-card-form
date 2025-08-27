export const maskCardNumber = (num: string) => {
  if (!num) return "";
  return num.replace(/\d(?=\d{4})/g, "*");
};

// Utility to generate random 16-digit card number
export const generateCardNumber = () => {
  let num = "";
  for (let i = 0; i < 16; i++) {
    num += Math.floor(Math.random() * 10).toString();
  }
  return num;
};

// Utility to generate expiry date (MM/YY format)
export const generateExpiryDate = () => {
  const now = new Date();
  const futureYear = now.getFullYear() + 3; // +3 years from today
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // current month
  const year = futureYear.toString().slice(-2); // last 2 digits of year
  return `${month}/${year}`;
};
