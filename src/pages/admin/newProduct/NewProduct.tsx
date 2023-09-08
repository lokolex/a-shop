import React, { useState, useEffect } from 'react';
import { TEInput, TERipple } from 'tw-elements-react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../../redux/store';
import {
  editProduct,
  postProduct,
  selectProducts,
} from '../../../redux/slices/productsSlice/productsSlice';
import { CategoriesProduct } from '../../../redux/slices/productsSlice/types';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BarLoader } from 'react-spinners';
import { setCurrentPage } from '../../../redux/slices/filterSlice/filterSlice';

import styles from './NewProduct.module.css';

interface IInitialValuesFormik {
  title: string;
  brand: string;
  categories: CategoriesProduct | string;
  price: number;
  description: string;
  imageUrl: string;
}

const NewProduct = () => {
  const [imageValue, setImageValue] = useState('');
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const products = useSelector(selectProducts);
  const product = products.find((p) => {
    if (id) {
      return p.id === +id;
    }
    return p;
  });

  const [imageURL, setImageURL] = useState(id === 'add' ? '' : product ? product.imageUrl : '');

  const uploadToImgBB = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageValue(e.target.value);
    const form = new FormData();
    form.set('key', '2dae7200ac62f6bd0eced6cee40b615b');
    if (e.target.files?.length) {
      const name = e.target.files[0].name.split('.')[0] + '-' + Date.now();
      form.append('image', e.target.files[0]);
      form.append('name', name);
    }
    setIsLoadingImage(true);
    axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: form,
    })
      .then(({ data }) => setImageURL(data.data.image.url))
      .catch((err) => console.warn(err))
      .finally(() => setIsLoadingImage(false));
  };

  const formik = useFormik<IInitialValuesFormik>({
    initialValues: {
      title: id === 'add' ? '' : product ? product.title : '',
      brand: id === 'add' ? '' : product ? product.brand : '',
      categories:
        id === 'add'
          ? CategoriesProduct.EMPTY
          : product
          ? product.categories
          : CategoriesProduct.EMPTY,
      price: id === 'add' ? 0 : product ? product.price : 0,
      description: id === 'add' ? '' : product ? product.description : '',
      imageUrl: imageURL,
    },

    validationSchema: Yup.object({
      title: Yup.string().required('Обязательное поле'),
      brand: Yup.string().required('Обязательное поле'),
      categories: Yup.string().required('Выберите категорию'),
      price: Yup.number()
        .max(150000, 'Максимальная цена 150 000 руб')
        .min(1, 'Минимальная цена 1 руб')
        .required('Введите цену'),
      description: Yup.string().required('Введите описание товара'),
      imageUrl: id === 'add' ? Yup.string().required('Загрузите фото товара') : Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      if (id === 'add') {
        dispatch(postProduct(values));
      } else {
        const params = { ...values, id: id ? +id : 0 };
        dispatch(editProduct(params));
      }
      setImageURL('');
      setImageValue('');
      resetForm();
      navigate('/admin');
      dispatch(setCurrentPage(0));
    },
  });

  useEffect(() => {
    formik.setFieldValue('imageUrl', imageURL);
    // eslint-disable-next-line
  }, [imageURL]);

  return (
    <div className="bg-gray-100">
      <div className="container md:max-w-full">
        <div className="py-5">
          <h2 className="text-center mb-3 text-xl font-semibold">
            {id === 'add' ? 'Добавить новый продукт' : `Изменить ${product?.title}`}
          </h2>
          <div className={styles['form-wrapper']}>
            <form onSubmit={formik.handleSubmit}>
              <TEInput
                type="text"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                label="Наименование"
                className="mb-6"
              ></TEInput>
              {formik.touched.title && formik.errors.title ? (
                <div className={styles.error}>{formik.errors.title}</div>
              ) : null}

              <TEInput
                type="text"
                label="Брэнд"
                name="brand"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.brand}
                className="mb-6"
              ></TEInput>
              {formik.touched.brand && formik.errors.brand ? (
                <div className={styles.error}>{formik.errors.brand}</div>
              ) : null}

              <select
                className="w-full mb-6 border p-2 rounded"
                name="categories"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.categories}
              >
                <option className="text-secondary-700" value="">
                  -- Выберите категорию --
                </option>
                <option value="phones">Телефоны</option>
                <option value="garment">Одежда</option>
                <option value="electronics">Электроника</option>
                <option value="laptops">Ноутбуки</option>
              </select>
              {formik.touched.categories && formik.errors.categories ? (
                <div className={styles.error}>{formik.errors.categories}</div>
              ) : null}

              <TEInput
                type="number"
                label="Цена"
                name="price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                className="mb-6"
              ></TEInput>
              {formik.touched.price && formik.errors.price ? (
                <div className={styles.error}>{formik.errors.price}</div>
              ) : null}

              <div className="relative">
                <h4>Описание товара:</h4>
                <textarea
                  className={styles.description}
                  id="exampleFormControlTextarea13"
                  rows={3}
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                ></textarea>
                {formik.touched.description && formik.errors.description ? (
                  <div className={styles.error}>{formik.errors.description}</div>
                ) : null}
              </div>

              <div className="mb-3 w-96">
                <label
                  htmlFor="formFile"
                  className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                >
                  Выберите изображение продукта
                </label>
                <input
                  onChange={uploadToImgBB}
                  value={imageValue}
                  disabled={id === 'add' && Boolean(imageURL)}
                  className={styles['input-file']}
                  type="file"
                  id="formFile"
                />
              </div>

              <div className="w-full mb-2">
                {<BarLoader color="#c2410c" loading={isLoadingImage} width={'100%'} />}
              </div>

              <TEInput
                value={imageURL}
                name="image"
                onChange={() => formik.values.imageUrl}
                onBlur={formik.handleBlur}
                type="text"
                label="URL картинки"
                disabled
                className="mb-6"
              ></TEInput>
              {formik.touched.imageUrl && formik.errors.imageUrl ? (
                <div className={styles.error}>{formik.errors.imageUrl}</div>
              ) : null}

              <TERipple rippleColor="light" className="w-full">
                <button type="submit" className={`bg-primary ${styles['button-add']}`}>
                  {id === 'add' ? 'Добавить' : 'Применить изменения'}
                </button>
              </TERipple>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
