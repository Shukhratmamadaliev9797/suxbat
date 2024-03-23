import React, { useState } from "react";
import { useSelector } from "react-redux";
import PrButton from "../Buttons/PrButton";
import { Avatar, Tabs } from "antd";
import { Link } from "react-router-dom";

export default function GroupHeader({ group, setGroupPage }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  // State to track whether the user is a member of the group or not
  const [isMember, setIsMember] = useState(
    group.members.some((member) => member._id === userInfo.id)
  );

  const joinHandler = () => {
    dispatch(joinGroup(group._id));
    setIsMember(true); // Update state when user joins the group
  };

  const leaveHandler = () => {
    dispatch(leaveGroup(group._id));
    setIsMember(false); // Update state when user leaves the group
  };

  return (
    <div className="groupHeader">
      <div className="groupHeader__cover">
        <img src={group.cover} alt="" />
      </div>
      <div className="groupHeader__title">
        <div>
          <h5>{group.title}</h5>
          <p>{group.description}</p>
        </div>

        <div className="groupHeader__action">
          {userInfo.id === group.owner._id && (
            <PrButton width="5rem" type="primary" ghost danger size="medium">
              Delete
            </PrButton>
          )}
          {userInfo.id !== group.owner._id && isMember === true && (
            <>
              <PrButton
                onClick={leaveHandler}
                width="5rem"
                type="primary"
                ghost
                danger
                size="medium"
              >
                Leave
              </PrButton>
            </>
          )}
          {userInfo.id !== group.owner._id && isMember === false && (
            <>
              <PrButton
                onClick={joinHandler}
                width="5rem"
                type="primary"
                ghost
                size="medium"
              >
                Join
              </PrButton>
            </>
          )}
        </div>
      </div>
      <div className="groupHeader__members">
        {group.members.length > 0 ? (
          <Avatar.Group>
            {group.members.map((member) => {
              return (
                <Link to={`/profile/${member.username}`}>
                  <Avatar shape="round" size="large" src={member.picture} />
                </Link>
              );
            })}
          </Avatar.Group>
        ) : (
          "No members"
        )}
      </div>
      <ul className="groupHeader__navbar">
        <li onClick={() => setGroupPage(0)}>
          <span>Discussion</span>
        </li>
        <li onClick={() => setGroupPage(1)}>
          <span>Members</span>
        </li>
        <li onClick={() => setGroupPage(2)}>
          <span>Photos</span>
        </li>
        <li onClick={() => setGroupPage(3)}>
          <span>Events</span>
        </li>
      </ul>
    </div>
  );
}
