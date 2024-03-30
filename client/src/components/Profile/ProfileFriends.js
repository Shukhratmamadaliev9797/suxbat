import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFriendsInfo } from "../../actions/userAction";

export default function ProfileFriends() {
  const userGetFriendsInfo = useSelector((state) => state.userGetFriendsInfo);
  const {
    loading,
    error,
    friends,
    following,
    followers,
    requests,
    sentRequests,
  } = userGetFriendsInfo;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserFriendsInfo());
  }, [dispatch]);

  return <div>ProfileFriends</div>;
}
