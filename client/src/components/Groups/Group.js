import React, { useState } from "react";
import PrButton from "../Buttons/PrButton";
import { Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { joinGroup, leaveGroup } from "../../actions/groupAction";
import { Link } from "react-router-dom";

export default function Group({ group }) {
  const dispatch = useDispatch();
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
    <div className="groups__group">
      <div className="groups__group-cover">
        <img src={group.cover} alt="" />
      </div>
      <div className="groups__group-title">
        <h5>{group.title}</h5>
        {userInfo.id === group.owner._id && (
          <PrButton width="5rem" type="primary" ghost danger>
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
            >
              Leave
            </PrButton>
          </>
        )}
        {userInfo.id !== group.owner._id && isMember === false && (
          <>
            <PrButton onClick={joinHandler} width="5rem" type="primary" ghost>
              Join
            </PrButton>
          </>
        )}
      </div>
      <div className="groups__group-description">
        <p>{group.description}</p>
      </div>
      <div className="groups__group-members">
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
    </div>
  );
}
