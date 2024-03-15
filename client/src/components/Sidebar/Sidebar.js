import React from "react";
import Account from "./Account";
import NewsFeed from "./NewsFeed";
import Profile from "./Profile";

export default function Sidebar({ notificationCount }) {
  return (
    <div className="sidebar">
      <Profile />
      <NewsFeed notificationCount={notificationCount} />
      <Account />
    </div>
  );
}
