export const transformPrice = (price: number, frequency: number) => {
  const installmentPrice = Number(price) / frequency;
  const priceParts = Number(installmentPrice).toFixed(2).split('.');
  const integerPart = priceParts[0];
  const decimalPart = priceParts[1];
  return {
    integerPart,
    decimalPart,
  };
};
