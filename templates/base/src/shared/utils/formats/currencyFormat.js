export const currencyFormat = (amount) => {
  amount = Number(amount);

  return Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })
    .format(amount)
    .replace(",", ".");
};

export const tengeFormat = (value) => `${currencyFormat(value)} ₸`;
