import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFriendsInfo } from "../../actions/userAction";
import { Avatar } from "antd";

export default function Profile() {
  const dispatch = useDispatch();

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const userGetFriendsInfo = useSelector((state) => state.userGetFriendsInfo);
  const { loading, error, friends, followers, following } = userGetFriendsInfo;

  useEffect(() => {
    dispatch(getUserFriendsInfo());
  }, [dispatch]);
  return (
    <div className="sidebar__profile">
      <div className="sidebar__profile-img">
        <Avatar
          className="sidebar__profile-img-avatar"
          shape="round"
          size={60}
          src={userInfo.picture}
        />
        <div className="sidebar__profile-name">
          <span>
            {userInfo.first_name} {userInfo.last_name}
          </span>
          <span>{userInfo.username}</span>
        </div>
      </div>
      {loading ? (
        "loading"
      ) : error ? (
        error
      ) : (
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
      )}
    </div>
  );
}
