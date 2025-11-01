import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PrButton from "../Buttons/PrButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addFriend,
  cancelRequest,
  suggestFriends,
} from "../../actions/userAction";

export default function SuggestFriends({ friends, userInfo, sentRequests }) {
  const dispatch = useDispatch();
  const [requestSent, setRequestSent] = useState([]);

  const { loading, error, suggests } = useSelector(
    (state) => state.userSuggestFriends
  );

  useEffect(() => {
    setRequestSent(sentRequests.map((request) => request._id));
    dispatch(suggestFriends());
  }, [sentRequests, dispatch]);

  const addFriendHandler = (userId) => {
    dispatch(addFriend(userId));
    setRequestSent([...requestSent, userId]);
  };

  const cancelRequestHandler = (userId) => {
    dispatch(cancelRequest(userId));
    setRequestSent(requestSent.filter((id) => id !== userId));
  };

  const isRequestSent = (userId) => requestSent.includes(userId);

  /** ✅ FILTERS THAT APPLY TO ALL SOURCES **/
  const isNotSelf = (u) => u._id !== userInfo.id;
  const isNotFriend = (u) => !friends.some((f) => f._id === u._id);
  const isNotRequested = (u) => !requestSent.includes(u._id);

  /** ✅ FILTERED SUGGESTS (backend) **/
  const filteredSuggests =
    suggests?.filter(
      (s) => isNotSelf(s) && isNotFriend(s) && isNotRequested(s)
    ) || [];

  /** ✅ FRIENDS OF FRIENDS **/
  const filteredFriends = () => {
    if (!friends) return [];
    return friends.flatMap((friend) =>
      friend.friends.filter(
        (x) =>
          isNotSelf(x) &&
          isNotFriend(x) &&
          isNotRequested(x) // ✅ do not show users you already sent request to
      )
    );
  };

  const fof = filteredFriends();
  const numberOfFilteredFriends = fof.length;

  return (
    <div className="home__freindsSuggestion">
      <div className="home__freindsSuggestion-title">
        <h6>People you may know</h6>
        <Link>See all</Link>
      </div>

      {loading && "Loading..."}
      {error && error}

      <div className="home__freindsSuggestion-friends">
        {/* ✅ FIRST SOURCE: Friends of Friends */}
        {friends?.map((friend) =>
          friend.friends
            .filter(
              (x) =>
                isNotSelf(x) &&
                isNotFriend(x) &&
                isNotRequested(x)
            )
            .slice(0, 1)
            .map((friendF) => {
              const isSent = isRequestSent(friendF._id);
              return (
                <div
                  key={friendF._id}
                  className="home__freindsSuggestion-friend"
                >
                  <Link
                    to={`/profile/${friendF.username}`}
                    className="home__freindsSuggestion-friend-img"
                  >
                    <img src={friendF.picture} alt="" />
                    <div className="home__freindsSuggestion-friend-name">
                      <span>
                        {friendF.first_name} {friendF.last_name}
                      </span>
                      <span>Mutual friends {friendF.friends?.length}</span>
                    </div>
                  </Link>

                  <div className="home__freindsSuggestion-friend-action">
                    {isSent ? (
                      <PrButton
                        onClick={() => cancelRequestHandler(friendF._id)}
                        type="primary"
                        danger
                        ghost
                      >
                        Cancel request
                      </PrButton>
                    ) : (
                      <PrButton
                        onClick={() => addFriendHandler(friendF._id)}
                        type="primary"
                        ghost
                      >
                        Send request
                      </PrButton>
                    )}
                  </div>
                </div>
              );
            })
        )}

        {/* ✅ SECOND SOURCE: Backend Suggests */}
        {filteredSuggests
          .filter((s) => !fof.some((a) => a._id === s._id)) // avoid duplicates
          .slice(0, 4 - (numberOfFilteredFriends > 0 ? numberOfFilteredFriends : 0))
          .map((suggest) => {
            const isSent = isRequestSent(suggest._id);

            return (
              <div
                key={suggest._id}
                className="home__freindsSuggestion-friend"
              >

                <Link
                  to={`/profile/${suggest.username}`}
                  className="home__freindsSuggestion-friend-img"
                >
                  <div className="home__freindsSuggestion-friend-img">
                    <img src={suggest.picture} alt="" />
                    <div className="home__freindsSuggestion-friend-name">
                      <span>
                        {suggest.first_name} {suggest.last_name}
                      </span>
                      <span>Mutual friends {suggest.friends?.length}</span>
                    </div>
                  </div>


                </Link>

                <div className="home__freindsSuggestion-friend-action">
                  {isSent ? (
                    <PrButton
                      onClick={() => cancelRequestHandler(suggest._id)}
                      type="primary"
                      danger
                      ghost
                    >
                      Cancel request
                    </PrButton>
                  ) : (
                    <PrButton
                      onClick={() => addFriendHandler(suggest._id)}
                      type="primary"
                      ghost
                    >
                      Send request
                    </PrButton>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
