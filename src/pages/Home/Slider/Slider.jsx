import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import slider1 from '../../../assets/slide1.jpg';
import slider2 from '../../../assets/slider2.jpg';
import slider3 from '../../../assets/slider3.jpg';
import slider4 from '../../../assets/slider4.jpg';
import slider5 from '../../../assets/slider5.jpg';
import slider6 from '../../../assets/slider6.jpg';



const Slider = () => {

  return (
    <div className="container sliderBG">
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      }}
      pagination={{ el: '.swiper-pagination', clickable: true }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        clickable: true,
      }}
      modules={[EffectCoverflow, Pagination, Navigation]}
      className="swiper_container"
    >
     <div>
     <SwiperSlide>
        <img src={slider1} alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slider2} alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slider3} alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slider4} alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slider5} alt="slide_image" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={slider6} alt="slide_image" />
      </SwiperSlide>
     </div>
      <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow">
          <BsFillArrowLeftCircleFill className='text-orange-500 text-4xl' name="arrow-back-outline"></BsFillArrowLeftCircleFill>
        </div>
        <div className="swiper-button-next slider-arrow">
          <BsFillArrowRightCircleFill className='text-orange-500 text-4xl' name="arrow-forward-outline"></BsFillArrowRightCircleFill>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </Swiper>
  </div>
  );
};

export default Slider;