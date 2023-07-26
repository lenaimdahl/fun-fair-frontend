import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../css/slider.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

function Slider() {
    return (
      <div className="slider-box">
        <Swiper
        pagination={{
          type: 'progressbar',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        style={{
            "--swiper-pagination-color": "#ed6ea0",
            "--swiper-navigation-color": "#ed6ea0"
        
        }}
      >
        <SwiperSlide>
        <span>
            <p id="preview-emoji">🙍‍♀️🙍‍♂️</p>
            <h4>Add a friend!</h4>
            <p>
              You can add a friend to your friendlist in the friend zone. So you
              can add the friend when creating a event.
            </p>
          </span>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
     
      </div>
    );
  }
  
  export default Slider;
