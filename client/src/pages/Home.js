import React, { useEffect, useState } from "react";
import CreatePostHome from "../components/CreatePost/CreatePostHome";
import Stories from "../components/Strory/Stories";
import EmailVerification from "../components/EmailVerification";
import { useDispatch, useSelector } from "react-redux";
import Posts from "../components/AllPosts/Posts";
import Friends from "../components/Home/Friends";
import { detailsProfile, getUserFriendsInfo } from "../actions/userAction";
import Requests from "../components/Home/Requests";
import SuggestFriends from "../components/Home/SuggestFriends";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const [check, setCheck] = useState();
  const dispatch = useDispatch();
  const userGetFriendsInfo = useSelector((state) => state.userGetFriendsInfo);
  const { loading, error, friends, requests, sentRequests } =
    userGetFriendsInfo;

  const profileDeleteRequest = useSelector(
    (state) => state.profileDeleteRequest
  );
  const { success: successDeleteRequest } = profileDeleteRequest;

  const profileAcceptRequest = useSelector(
    (state) => state.profileAcceptRequest
  );
  const { success: successAcceptRequest } = profileAcceptRequest;

  const [requestss, setRequestss] = useState(requests);
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const tablet = useMediaQuery({
    query: "(min-width: 1200px)",
  });

  useEffect(() => {
    if (friends) {
      if (friends.length === 1) {
        if (friends[0]._id === userInfo._id) {
          setCheck(true);
        }
      }
    }
  }, [friends, userInfo]);

  useEffect(() => {
    dispatch(detailsProfile(userInfo.username));
    dispatch(getUserFriendsInfo());
    if (requests) {
      setRequestss(requests);
    }
  }, [dispatch, userInfo, successDeleteRequest, successAcceptRequest]);

  const [verified, setVerified] = useState();
  useState(() => {
    if (userInfo) {
      setVerified(userInfo.verified);
    }
  }, [userInfo]);

  useEffect(() => {
    if (successDeleteRequest || successAcceptRequest) {
      // Filter out the user from requests array
      const updatedRequests = requests?.filter(
        (request) =>
          request._id !== successDeleteRequest ||
          request._id !== successAcceptRequest
      );
      setRequestss(updatedRequests);
    }
  }, [successDeleteRequest, successAcceptRequest, requests]);

  return (
    <div className="home">
      <div className="home__main">
        <Stories />
        {verified ? "" : <EmailVerification />}
        <CreatePostHome />
        <Posts />
      </div>
      {tablet && (
        <div className="home__right">
          {loading ? (
            "loading"
          ) : error ? (
            error
          ) : (
            <>
              <SuggestFriends
                friends={friends}
                userInfo={userInfo}
                sentRequests={sentRequests}
              />
              {friends?.length > 0 && <Friends friends={friends} />}
              {requests?.length > 0 && <Requests requests={requests} />}
            </>
          )}
        </div>
      )}
    </div>
  );
}
