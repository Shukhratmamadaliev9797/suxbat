import React from "react";
import { useDispatch } from "react-redux";
import { reactPost } from "../../actions/postAction";

export default function PostReacts({
  postReacts,
  setPostReacts,
  reactPostHandler,
}) {
  const reactsArray = [
    { name: "Like", image: "/reacts/like.gif" },
    { name: "Love", image: "/reacts/love.gif" },
    { name: "Haha", image: "/reacts/haha.gif" },
    { name: "Wow", image: "/reacts/wow.gif" },
    { name: "Sad", image: "/reacts/sad.gif" },
    { name: "Angry", image: "/reacts/angry.gif" },
  ];

  return (
    <div className="postReacts">
      {reactsArray.map((react, i) => {
        return (
          <div
            className="postReacts__react"
            key={i}
            onClick={() => reactPostHandler(react.name)}
          >
            <img src={react.image} alt={react.name} />
          </div>
        );
      })}
    </div>
  );
}
