import React from "react";
import Stories from "react-insta-stories";
export default function Story({ setStoryOpen }) {
  const stories = [
    {
      url: "https://res.cloudinary.com/djdbhmqqd/video/upload/v1708828781/ShukhratMamadaliev/post_images/wi20szkir1ljzrnjr3yo.mp4",
    },
    {
      url: "https://res.cloudinary.com/djdbhmqqd/image/upload/v1708655967/ShukhratMamadaliev/profile_picture/pmtiy65xb8y0dekg5pyj.jpg",
    },
  ];

  return (
    <div className="story">
      <div className="story__exit" onClick={() => setStoryOpen(false)}>
        <i class="fas fa-times"></i>
      </div>
      <Stories
        stories={stories}
        defaultInterval={1500}
        width={432}
        height={768}
      />
    </div>
  );
}
