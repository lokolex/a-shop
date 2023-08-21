import React from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../redux/slices/productsSlice/productsSlice';
import { priceFormatingToRus } from '../../../utils/priceFormatingToRus';
import { MdDelete, MdEdit } from 'react-icons/md';

const AdminProducts = () => {
  const products = useSelector(selectProducts);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500 bg-black text-white">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Брэнд
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Фото
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Название
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Цена, ₽
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => {
                  const { id, imageUrl, title, price, brand } = product;
                  return (
                    <tr
                      key={id}
                      className={
                        i % 2
                          ? `border-b dark:border-neutral-500 bg-slate-300`
                          : `border-b dark:border-neutral-500 bg-white`
                      }
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">{i + 1}</td>
                      <td className="whitespace-nowrap px-6 py-4">{brand}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <img
                          className="w-[80px] h-[80px] object-cover"
                          src={imageUrl}
                          alt={title}
                        />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{title}</td>
                      <td className="whitespace-nowrap px-6 py-4 font-semibold">
                        {priceFormatingToRus(price)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex">
                          <button className="mr-4">
                            <MdEdit className="text-2xl text-green-600" />
                          </button>
                          <button>
                            <MdDelete className="text-2xl text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
