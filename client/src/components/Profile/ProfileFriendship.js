import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../../helper/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptRequest,
  addFriend,
  cancelRequest,
  deleteRequest,
  follow,
  unfollow,
  unfriend,
} from "../../actions/userAction";
import { createConversation } from "../../actions/conversationActions";

export default function ProfileFriendship({ friendshipp, profile }) {
  const [friendsMenu, setFriendsMenu] = useState(false);
  const [respondMenu, setRespondMenu] = useState(false);
  const [friendship, setFriendship] = useState(friendshipp);
  const friendsMenuRef = useRef(null);
  const respondMenuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const conversationCreate = useSelector((state) => state.conversationCreate);
  const {
    loading: createChatLoading,
    error: createChatError,
    success,
  } = conversationCreate;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  useEffect(() => {
    if (success) {
      navigate("/messenger");
    }
  }, [success, navigate]);

  useEffect(() => {
    setFriendship(friendshipp);
  }, [friendshipp]);

  useClickOutside(friendsMenuRef, () => {
    setFriendsMenu(false);
  });
  useClickOutside(respondMenuRef, () => {
    setRespondMenu(false);
  });

  const addFriendHandler = () => {
    setFriendship({ ...friendship, requestSent: true, following: true });
    dispatch(addFriend(profile?._id));
  };

  const cancelRequestHandler = () => {
    setFriendship({ ...friendship, requestSent: false, following: false });
    dispatch(cancelRequest(profile?._id));
  };

  const followHandler = () => {
    setFriendship({ ...friendship, following: true });
    dispatch(follow(profile?._id));
    setFriendsMenu(false);
  };

  const unfollowHandler = () => {
    setFriendship({ ...friendship, following: false });
    dispatch(unfollow(profile?._id));
    setFriendsMenu(false);
  };

  const acceptRequestHandler = () => {
    setFriendship({
      ...friendship,
      friends: true,
      following: true,
      requestSent: false,
      requestReceived: false,
    });
    dispatch(acceptRequest(profile?._id));
    setRespondMenu(false);
  };

  const unfriendHandler = () => {
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
    dispatch(unfriend(profile?._id));
    setFriendsMenu(false);
  };

  const deleteRequestHandler = () => {
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
    dispatch(deleteRequest(profile?._id));
    setRespondMenu(false);
  };

  const chatCreate = () => {
    if (profile?._id !== userInfo._id) {
      dispatch(createConversation(userInfo.id, profile?._id));
    } else {
      alert("opps");
    }
  };
  return (
    <div className="profile__header-user-action">
      {friendship?.friends ? (
        <>
          <button
            className="profile__header-user-action-friendsBtn"
            onClick={() => setFriendsMenu((prev) => !prev)}
          >
            <i class="fas fa-user-check"></i>
            <span>Friends</span>
          </button>
        </>
      ) : (
        !friendship?.requestSent &&
        !friendship?.requestReceived && (
          <button onClick={() => addFriendHandler()}>
            <i class="fas fa-user-plus"></i>
            <span>Add friend</span>
          </button>
        )
      )}
      {friendship?.requestSent ? (
        <button onClick={() => cancelRequestHandler()}>
          <i class="fas fa-user-minus"></i>
          <span>Cancel request</span>
        </button>
      ) : (
        friendship?.requestReceived && (
          <>
            <button onClick={() => setRespondMenu((prev) => !prev)}>
              <i class="fas fa-user-check"></i>
              <span>Respond</span>
            </button>
          </>
        )
      )}

      {friendship?.following ? (
        <button
          onClick={() => {
            unfollowHandler();
          }}
        >
          <i class="fas fa-comment-dots"></i>
          <span>Following</span>
        </button>
      ) : (
        <button
          onClick={() => {
            followHandler();
          }}
        >
          <i class="fas fa-user-friends"></i>
          <span>Follow</span>
        </button>
      )}
      <button onClick={chatCreate}>
        <i class="fas fa-comment-dots"></i>
        <span>Message</span>
      </button>
      {friendsMenu ? (
        <ul
          ref={friendsMenuRef}
          className="profile__header-friendship-friendsMenu"
        >
          {friendship?.following ? (
            <li
              onClick={() => {
                unfollowHandler();
              }}
            >
              <i class="fas fa-user-times"></i> <span>Unfollow</span>
            </li>
          ) : (
            <li
              onClick={() => {
                followHandler();
              }}
            >
              <i class="fas fa-user-times"></i> <span>Follow</span>
            </li>
          )}

          <li
            onClick={() => {
              unfriendHandler();
            }}
          >
            <i class="fas fa-user-alt-slash"></i> <span>Unfriend</span>{" "}
          </li>
        </ul>
      ) : (
        ""
      )}
      {respondMenu ? (
        <ul
          ref={respondMenuRef}
          className="profile__header-friendship-friendsMenu"
        >
          <li onClick={() => acceptRequestHandler()}>
            <i class="fas fa-check-square"></i> <span>Accept</span>{" "}
          </li>
          <li onClick={() => deleteRequestHandler()}>
            <i class="fas fa-trash-alt"></i> <span>Reject</span>{" "}
          </li>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}
