export interface ISlider {
  title: string;
  descr: string;
  imageURL: string;
}

const dataSlider: ISlider[] = [
  {
    title: 'Наушники SONY',
    descr: 'Новая модель наушников уже в нашем магазине. Успей купить новинку по выгодной цене',
    imageURL: 'https://i.ibb.co/74XGDXX/slider-1.jpg',
  },
  {
    title: 'Скидки 50% на электронику',
    descr: 'В нашем магазине скидки 50% на электронику, успей купить до конца месяца',
    imageURL: 'https://i.ibb.co/qNZ39nr/slider-2.jpg',
  },
  {
    title: 'Новая коллекция',
    descr:
      'Новая коллекция дамских сумочек от Avianty, стильный дизайн, залог успешных переговоров',
    imageURL: 'https://i.ibb.co/1zgBVZn/slider-3.jpg',
  },
  {
    title: 'Скидка % на технику LG',
    descr:
      'Срочно! Скидка на технику LG 2022 года выпуска. Мы не держим в закромах то, что может принести Вам пользу.',
    imageURL: 'https://i.ibb.co/YTyHJvy/slider-4.jpg',
  },
];

export default dataSlider;
