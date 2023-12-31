import Slider from 'react-slick';

import dataSlider from './assets/data-slider';
import MySliderItem from './MySliderItem';

interface IMySlider {
  productsRef: React.RefObject<HTMLDivElement>;
}

const MySlider = ({ productsRef }: IMySlider) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    // fade: true,
    arrows: false,
    draggable: false,
    pauseOnDotsHover: true,
  };
  return (
    <div>
      <Slider {...settings}>
        {dataSlider.map((slider) => (
          <MySliderItem key={slider.title} productsRef={productsRef} {...slider} />
        ))}
      </Slider>
    </div>
  );
};

export default MySlider;
