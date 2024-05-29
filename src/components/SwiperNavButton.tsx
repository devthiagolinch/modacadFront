import { useSwiper } from 'swiper/react';

export function SwiperNavButtons() {
  const swiper = useSwiper();

  return (
    <div className="swiper-nav-btns">
      <button onClick={() => swiper.allowSlidePrev}>Prev</button>
      <button onClick={() => swiper.allowSlideNext}>Next</button>
    </div>
  );
};