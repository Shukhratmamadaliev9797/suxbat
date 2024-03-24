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

  const userSuggestFriends = useSelector((state) => state.userSuggestFriends);
  const { loading, error, suggests } = userSuggestFriends;

  useEffect(() => {
    setRequestSent(sentRequests.map((request) => request._id));
    dispatch(suggestFriends());
  }, [sentRequests, dispatch]);

  const addFriendHandler = (userId) => {
    dispatch(addFriend(userId));
    // Update requestSent state to include the userId
    setRequestSent([...requestSent, userId]);
  };

  const cancelRequestHandler = (userId) => {
    dispatch(cancelRequest(userId));
    // Remove the canceled request from requestSent state
    setRequestSent(requestSent.filter((id) => id !== userId));
  };

  const isRequestSent = (userId) => {
    return requestSent.includes(userId);
  };
  const filteredFriends = () => {
    return (
      friends?.flatMap((friend) => {
        return friend.friends.filter((x) => {
          return !friends.some((f) => f._id === x._id) && x._id !== userInfo.id;
        });
      }) ?? []
    );
  };

  const numberOfFilteredFriends = filteredFriends().length;
  return (
    friends.length > 0 && (
      <div className="home__freindsSuggestion">
        <div className="home__freindsSuggestion-title">
          <h6>People you may know</h6>
          <Link>See all</Link>
        </div>
        <div className="home__freindsSuggestion-friends">
          {friends?.map((friend) => {
            return friend.friends
              .filter(
                (x) =>
                  !friends.some((f) => f._id === x._id) && x._id !== userInfo.id
              )
              .slice(0, 1)
              .map((friendF, i) => {
                const isSent = isRequestSent(friendF._id);
                return (
                  <div key={i} className="home__freindsSuggestion-friend">
                    <div className="home__freindsSuggestion-friend-img">
                      <img src={friendF.picture} alt="" />
                      <div className="home__freindsSuggestion-friend-name">
                        <span>
                          {friendF.first_name.length >= 15
                            ? friendF.first_name
                            : friendF.first_name + " " + friendF.last_name}
                        </span>
                        <span>Mutual friends {friendF.friends?.length}</span>
                      </div>
                    </div>
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
              });
          })}
          {suggests
            ?.filter(
              (x) =>
                !friends.some((f) => f._id === x._id) &&
                x._id !== userInfo.id &&
                !filteredFriends().some((a) => a._id === x._id)
            )
            ?.slice(
              0,
              4 - numberOfFilteredFriends > 0 ? 4 - numberOfFilteredFriends : 4
            )
            ?.map((suggest, i) => {
              const isSent = isRequestSent(suggest._id);

              return (
                <div key={i} className="home__freindsSuggestion-friend">
                  <div className="home__freindsSuggestion-friend-img">
                    <img src={suggest.picture} alt="" />
                    <div className="home__freindsSuggestion-friend-name">
                      <span>
                        {suggest.first_name} {suggest.last_name}
                      </span>
                      <span>Mutual friends {suggest.friends?.length}</span>
                    </div>
                  </div>
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
    )
  );
}
