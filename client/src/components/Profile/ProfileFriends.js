import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFriendsInfo } from "../../actions/userAction";
import { Avatar, Card, Tooltip } from "antd";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  UserDeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  XOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

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

  return (
    <div className="profileFriends">
      {loading
        ? "loading"
        : error
        ? error
        : friends?.map((friend) => {
            return (
              <Card
                key={friend._id} // Add a unique key
                style={{
                  width: 250,
                  marginRight: "1rem",
                }}
                cover={
                  <img
                    className="friends__friend-cover"
                    alt="example"
                    src={
                      friend.cover
                        ? friend.cover
                        : "/images/default_cover1.jpeg"
                    }
                  />
                }
                actions={[
                  <Tooltip title="Profile">
                    <Link to={`/profile/${friend.username}`}>
                      <UserOutlined
                        className="friends__friend-friendProfileBtn"
                        key="profile"
                      />
                    </Link>
                  </Tooltip>,
                  <Tooltip title="Unfriend">
                    <UserDeleteOutlined
                      className="friends__friend-unfriendBtn"
                      onClick={() => unfriendHandler(friend._id)}
                    />
                  </Tooltip>,
                ]}
              >
                <Meta
                  avatar={<Avatar src={friend.picture} />}
                  title={friend.first_name + " " + friend.last_name}
                  description={`Mutual friends ${friend.friends.length} `}
                />
              </Card>
            );
          })}
    </div>
  );
}
