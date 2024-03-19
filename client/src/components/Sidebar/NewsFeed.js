import React from "react";

import { Link, NavLink } from "react-router-dom";

export default function NewsFeed({ notificationCount }) {
  return (
    <div className="newsFeed">
      <div className="newsFeed__container">
        <div className="newsFeed__title">News Feed</div>
        <div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive && window.location.pathname === "/"
                ? "newsFeed__link-active"
                : "newsFeed__link-link"
            }
          >
            <div className="newsFeed__link-img">
              <img src="/left/feed.png" alt="" />
            </div>
            <span>Feed</span>
          </NavLink>
        </div>
        <div className="newsFeed__link">
          <NavLink
            to="/friends"
            className={({ isActive }) =>
              isActive ? "newsFeed__link-active" : "newsFeed__link-link"
            }
          >
            <div className="newsFeed__link-img">
              <img src="/left/friends.png" alt="" />
            </div>

            <span>Friends</span>
          </NavLink>
        </div>
        <div className="newsFeed__link">
          <NavLink
            to="/messenger"
            className={({ isActive }) =>
              isActive ? "newsFeed__link-active" : "newsFeed__link-link"
            }
          >
            <div className="newsFeed__link-img">
              <img src="/left/messenger.png" alt="" />
            </div>
            <span>Messenger</span>
          </NavLink>
        </div>
        <div className="newsFeed__link">
          <Link to="" className="newsFeed__link-link">
            <div className="newsFeed__link-img">
              <img src="/left/groups.png" alt="" />
            </div>
            <span>Groups</span>
          </Link>
        </div>
        <div className="newsFeed__link">
          <Link to="" className="newsFeed__link-link">
            <div className="newsFeed__link-img">
              <img src="/left/marketplace.png" alt="" />
            </div>
            <span>Marketplace</span>
          </Link>
        </div>
        <div className="newsFeed__link">
          <Link to="" className="newsFeed__link-link">
            <div className="newsFeed__link-img">
              <img src="/left/watch.png" alt="" />
            </div>
            <span>Watch</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
