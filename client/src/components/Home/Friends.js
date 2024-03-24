import React from "react";
import { Link } from "react-router-dom";
import PrButton from "../Buttons/PrButton";

export default function Friends({ friends }) {
  return (
    <div className="home__friends">
      <div className="home__friends-title">
        <h6>Friends</h6>
        <Link>See all</Link>
      </div>
      <div className="home__friends-friends">
        {friends?.map((friend, i) => {
          return (
            <Link
              key={i}
              to={`/profile/${friend.username}`}
              className="home__friends-friend"
            >
              <div className="home__friends-friend-img">
                <img src={friend.picture} alt="" />
                <div className="home__friends-friend-name">
                  <span>
                    {friend.first_name.length >= 15
                      ? friend.first_name
                      : friend.first_name + " " + friend.last_name}
                  </span>
                  <span>Mutual friends {friend.friends?.length}</span>
                </div>
              </div>
              <div className="home__friends-friend-action">
                <i className="fas fa-chevron-right"></i>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
