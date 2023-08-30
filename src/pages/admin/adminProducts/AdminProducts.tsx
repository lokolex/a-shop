import { useSelector } from 'react-redux';
import { deleteProduct, selectProducts } from '../../../redux/slices/productsSlice/productsSlice';
import { priceFormatingToRus } from '../../../utils/priceFormatingToRus';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useAppDispatch } from '../../../redux/store';
import { Link } from 'react-router-dom';

interface IAdminProductsProps {
  totalElements: number;
  currentPage: number;
  pageSize: number;
}

const AdminProducts = (props: IAdminProductsProps) => {
  const { currentPage, pageSize, totalElements } = props;
  const products = useSelector(selectProducts);
  const dispatch = useAppDispatch();

  //functionality for displaying the sequence number
  const array: number[] = [];
  const numbers: number[][] = [];
  for (let i = 1; i <= totalElements; i++) {
    array.push(i);
  }
  for (let i = 0; i < array.length; i += pageSize) {
    const chunk = array.slice(i, i + pageSize);
    numbers.push(chunk);
  }

  const handleDeleteProduct = (id: number, title: string) => {
    if (window.confirm('Вы действительно хотите удалить продукт?')) {
      dispatch(deleteProduct({ id, title }));
    }
    return;
  };

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
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {numbers[currentPage][i]}
                      </td>
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
                          <Link to={`newProduct/${id}`} className="mr-4">
                            <MdEdit className="text-2xl text-green-600" />
                          </Link>
                          <button onClick={() => handleDeleteProduct(id, title)}>
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
