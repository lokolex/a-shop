import { EBrands } from '../../../redux/slices/filterSlice/types';
import { CategoriesProduct } from '../../../redux/slices/productsSlice/types';

export interface ISlider {
  title: string;
  descr: string;
  imageURL: string;
  categories?: CategoriesProduct;
  brands?: EBrands;
  id?: number;
}

const dataSlider: ISlider[] = [
  {
    title: 'Наушники SONY',
    descr: 'Новая модель наушников уже в нашем магазине. Успей купить новинку по выгодной цене',
    imageURL: 'https://i.ibb.co/74XGDXX/slider-1.jpg',
    id: 27,
  },
  {
    title: 'Скидки на электронику',
    descr: 'В нашем магазине мощные скидки на электронику, успей купить до конца месяца',
    imageURL: 'https://i.ibb.co/qNZ39nr/slider-2.jpg',
    categories: CategoriesProduct.ELECTRONICS,
  },
  {
    title: 'Apple',
    descr: 'Вся новая линейка товаров Apple представлена в нашем магазине уже сегодня.',
    imageURL: 'https://i.ibb.co/tcGDvnL/Apple-products-1392x508.jpg',
    brands: EBrands.APPLE,
  },
  {
    title: 'Скидка % на технику LG',
    descr:
      'Срочно! Скидка на технику LG 2022 года выпуска. Мы не держим в закромах то, что может принести Вам пользу.',
    imageURL: 'https://i.ibb.co/YTyHJvy/slider-4.jpg',
    brands: EBrands.LG,
  },
];

export default dataSlider;
