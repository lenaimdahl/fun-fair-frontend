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
            <h2>Welcome to FunFair 🥳</h2>
            <p>
            FunFair is an innovative and delightful application designed to help you add fun events and activities to your daily schedule, encouraging you to appreciate and embrace the small joys that can often be overlooked in the midst of busy routines, calorie counting, and constant pressure for self-improvement. 
            <br></br><br></br>
            In a world that often emphasizes achievement and productivity, FunFair aims to remind you that life's true essence lies in the simple pleasures and moments of happiness that can be found in the everyday.
            <br></br><br></br>
            Go to the next slide for a short demo fo how to use this application.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slider-card">
            <img 
            src={activityTip} 
            alt="activityTip"
            style={{ width: "40%" }}>
            </img>
            <h2>Daily Activity Suggestion</h2>
            <p>
              While on home page, don't forget to have a sneak peak at our daily
              activity suggestion. Who knows? Maybe it's something you'd like to
              add to your events list?
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="slider-card">
            <img 
            src={pointsImg} 
            alt="pointsImg" 
            style={{ width: "90%" }}>
            </img>
            <h2>Weekly Points Goal</h2>
            <p>
              Sign up or log in to see your weekly goal. Add new events to your calnedar to improve your weekly score. Does it have a green halo? Awesome! You've achieved or exceeded your weely goal! 🥳
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="slider-card">
            <img 
            src={addEvent} 
            alt="pointsImg" 
            style={{ width: "50%" }}>
            </img>
            <h2>Add Events</h2>
            <p>
              To bump up your score, add an event. To make it more fun you can plan it together with your friend. Use select menus to brows through your friend list and event suggestions. Don't forget to add points. 
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="slider-card">
            <img 
            src={fullCalendar} 
            alt="pointsImg" 
            style={{ width: "50%" }}>
            </img>
            <h2>Check Out Your Calendar</h2>
            <p>
              To bump up your score, add an event. To make it more fun you can plan it together with your friend. Use select menus to brows through your friend list and event suggestions. Don't forget to add points. 
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="slider-card">
            <img 
            src={createEvent} 
            alt="pointsImg" 
            style={{ width: "50%" }}>
            </img>
            <h2>Create Events Suggestions</h2>
            <p>
              You couldn't find something that you want to do in the select menu while adding an event to your calendar? No problem. Create your own suggestion 😊. Feel free to use activity tip from the home page. 
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="slider-card">
            <img 
            src={firendZone} 
            alt="pointsImg" 
            style={{ width: "50%" }}>
            </img>
            <h2>Add Friends</h2>
            <p>
              First place where friend zone is something cool. Brows through the list of users to find your friends. The moment you add them, you will be able to find them in a select menu while adding a new event to your calendar 👍
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="slider-card">
            <img 
            src={addText} 
            alt="pointsImg" 
            style={{ width: "60%" }}>
            </img>
            <h2>Dear Diary</h2>
            <p>
              Something cool happened and you want to save this memory forever? Add a note to your diary using a button under Friend Zone section.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="slider-card">
            <img 
            src={dayView} 
            alt="pointsImg" 
            style={{ width: "70%" }}>
            </img>
            <h2>Day View Page</h2>
            <p>
              To see your diary entries and events planned for the day, go to Day View section. If you want to check out some other day, just change the date with a date picker. Also here you can easily edit and delete your diary entries or cancel appointments.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="slider-card">
            <img 
            src={selectMood} 
            alt="pointsImg" 
            style={{ width: "70%" }}>
            </img>
            <h2>Whats's Up?</h2>
            <p>
              Feel free to express your emotions by selecting your mood for the day. You can select it once a day. 
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="slider-card">
            <img 
            src={moodChart} 
            alt="pointsImg" 
            style={{ width: "70%" }}>
            </img>
            <h2>No pressure</h2>
            <p>
              Wanna see how your week was? Go to Weekly Mood section. There you can find chart(s) showing your mood journey. New day, new chances so no need to be too serious about it 😉
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;
