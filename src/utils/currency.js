// Currency conversion utility
// Exchange rate: 1 USD = 83 INR (approximate)
export const USD_TO_INR = 83;

export const convertToINR = (usdAmount) => {
  return usdAmount * USD_TO_INR;
};

export const formatPrice = (amount, currency = 'INR') => {
  if (currency === 'INR') {
    return `₹${amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }
  return `$${amount.toFixed(2)}`;
};

export const convertAndFormat = (usdAmount) => {
  const inrAmount = convertToINR(usdAmount);
  return formatPrice(inrAmount, 'INR');
};

