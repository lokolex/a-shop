export const dateFormatingToRus = (date: number | undefined) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('ru-RU', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
