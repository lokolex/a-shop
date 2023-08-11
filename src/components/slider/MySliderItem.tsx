import { ISlider } from './assets/data-slider';
import styles from './MySlider.module.css';

const MySliderItem = ({ title, descr, imageURL }: ISlider) => {
  return (
    <div className="w-screen relative mb-6">
      <div className="w-full">
        <img className="max-h-96 min-w-full object-cover" src={imageURL} alt={title} />
      </div>
      <div className={styles.card}>
        <h3 className="text-center font-bold text-4xl uppercase">{title}</h3>
        <p className="mt-3 text-2xl">{descr}</p>
      </div>
    </div>
  );
};

export default MySliderItem;
