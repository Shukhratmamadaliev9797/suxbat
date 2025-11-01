import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFriendsInfo } from "../../actions/userAction";
import { Avatar } from "antd";
import { Link } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();

  const userGetFriendsInfo = useSelector((state) => state.userGetFriendsInfo);
  const { loading, error, user, friends, followers, following } =
    userGetFriendsInfo;

  useEffect(() => {
    dispatch(getUserFriendsInfo());
  }, [dispatch]);
  const total = user?.first_name.length + user?.last_name.length;

  return (
    <div className="sidebar__profile">
      {loading ? (
        "loading"
      ) : error ? (
        error
      ) : (
        <>
          <div className="sidebar__profile-img">
            <Link
              to={`/profile/${user?.username}`}
              className="home__freindsSuggestion-friend-img"
            >
              <Avatar
                className="sidebar__profile-img-avatar"
                shape="round"
                size={60}
                src={user.picture}
              />
              <div className="sidebar__profile-name">
                <span>
                  {user.first_name} {total > 20 ? <br /> : ""} {user.last_name}
                </span>
                {total > 20 ? "" : <span>{user.username}</span>}
              </div>

            </Link>

          </div>
          <ul className="sidebar__profile-info">
            <li>
              <span>{friends?.length}</span>
              <span>Friends</span>
            </li>
            <li>
              <span>{followers?.length}</span>
              <span>Followers</span>
            </li>
            <li>
              <span>{following?.length}</span>
              <span>Following</span>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
