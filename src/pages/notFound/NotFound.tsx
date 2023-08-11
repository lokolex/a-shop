import { Link, useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';

import notFoundImg from './notFound.png';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="container">
      <h3 className="uppercase text-center my-4 text-4xl text-gray-800 font-bold">
        Страница не найдена
      </h3>
      <img className="m-auto" src={notFoundImg} alt="Not Found" />
      <div className="uppercase my-4 flex justify-center gap-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-base font-semibold transition-all duration-200 hover:text-blue-800 text-blue-400"
        >
          <IoChevronBackOutline />
          Назад
        </button>
        <Link
          to="/"
          className="text-base font-semibold transition-all duration-200 hover:text-blue-800 text-blue-400"
        >
          На главную
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
