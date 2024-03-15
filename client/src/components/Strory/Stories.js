import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/bundle";
import Story from "./Story";
import CreateStory from "../../modal/CreateStory";
// import required modules

export default function App() {
  const [storyOpen, setStoryOpen] = useState(false);
  const [createStory, setCreateStory] = useState(false);
  return (
    <>
      {storyOpen ? <Story setStoryOpen={setStoryOpen} /> : ""}
      <CreateStory createStory={createStory} setCreateStory={setCreateStory} />
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          1300: { slidesPerView: 5.5 },
          900: { slidesPerView: 4.5 },
          500: { slidesPerView: 3.5 },
          300: { slidesPerView: 2.5 },
        }}
        className="mySwiper stories"
      >
        <SwiperSlide onClick={() => setCreateStory(true)}>
          <div className="story__account">
            <div className="add-icon">+</div>
            <span>Add Story</span>
          </div>
        </SwiperSlide>
        <SwiperSlide onClick={() => setStoryOpen(true)}>
          <img src="/stories/1.jpg" alt="" />
          <div className="story__account">
            <img src="/stories/profile1.jpg" alt="" />
            <span>Shukhrat</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/stories/2.png" alt="" />
          <div className="story__account">
            <img src="/stories/profile2.jpg" alt="" />
            <span>Shukhrat</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/stories/3.jpg" alt="" />
          <div className="story__account">
            <img src="/stories/profile2.jpg" alt="" />
            <span>Shukhrat</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/stories/4.jpg" alt="" />
          <div className="story__account">
            <img src="/stories/profile4.jfif" alt="" />
            <span>Shukhrat</span>
          </div>
        </SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}
