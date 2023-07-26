import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../css/slider.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

import activityTip from "../assets/activity-tip.png";
import addEvent from "../assets/add-event.png";
import addText from "../assets/add-text.png";
import createEvent from "../assets/create-event.png";
import dayView from "../assets/day-view.png";
import firendZone from "../assets/friend-zone.png";
import fullCalendar from "../assets/full-calendar.png";
import moodChart from "../assets/mood-chart.png";
import pointsImg from "../assets/points.png";
import selectMood from "../assets/select-mood.png";

function Slider() {
  return (
    <div className="slider-box">
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        style={{
          "--swiper-pagination-color": "#ed6ea0",
          "--swiper-navigation-color": "#ed6ea0",
        }}
      >
        <SwiperSlide>
          <div className="slider-card">
            <img src={activityTip} alt="activityTip"></img>
            <h2>Daily Activity Suggestion</h2>
            <p>
              While on home page, don't forget to have a sneak peak at our daily
              activity suggestion. Who knows? Maybe it's something you'd like to
              add to your events list?
            </p>
          </div>
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
