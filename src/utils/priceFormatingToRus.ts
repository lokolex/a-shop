export const priceFormatingToRus = (num: number) => {
  return new Intl.NumberFormat('ru-RU').format(num);
};
