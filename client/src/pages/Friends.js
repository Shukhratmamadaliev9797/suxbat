import React, { useEffect, useState } from "react";
import { Collapse, Space, Avatar, Card, Tooltip, Breadcrumb } from "antd";
import {
  UserOutlined,
  UserDeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  XOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptRequest,
  addFriend,
  cancelRequest,
  deleteRequest,
  detailsProfile,
  unfriend,
} from "../actions/userAction";
import { Link } from "react-router-dom";

export default function Friends() {
  const { Meta } = Card;
  const dispatch = useDispatch();
  const [localFriends, setLocalFriends] = useState([]); // Local state for friends
  const [localRequests, setLocalRequests] = useState([]); // Local state for requests
  const [localSentRequests, setLocalSentRequests] = useState([]); // Local state for requests

  const userGetFriendsInfo = useSelector((state) => state.userGetFriendsInfo);
  const { loading, error, friends, requests, sentRequests } =
    userGetFriendsInfo;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  useEffect(() => {
    dispatch(detailsProfile(userInfo.username));
  }, [dispatch, userInfo]);

  useEffect(() => {
    setLocalFriends(friends); // Update local state when friends change
  }, [friends]);

  useEffect(() => {
    setLocalRequests(requests); // Update local state when requests change
  }, [requests]);

  useEffect(() => {
    setLocalSentRequests(sentRequests);
  }, [sentRequests]);

  const unfriendHandler = (userId) => {
    dispatch(unfriend(userId)); // Dispatch action to unfriend
    setLocalFriends(localFriends.filter((friend) => friend._id !== userId)); // Update local state
  };

  const deleteRequestHandler = (userId) => {
    dispatch(deleteRequest(userId)); // Dispatch action to delete request
    setLocalRequests(localRequests.filter((request) => request._id !== userId)); // Update local state
  };

  const acceptRequestHandler = (userId) => {
    dispatch(acceptRequest(userId)); // Dispatch action to accept request
    const acceptedRequest = localRequests.find(
      (request) => request._id === userId
    );
    setLocalFriends([...localFriends, acceptedRequest]); // Add accepted request to friends
    setLocalRequests(localRequests.filter((request) => request._id !== userId)); // Remove accepted request from requests
  };

  const cancelRequestHandler = (userId) => {
    dispatch(cancelRequest(userId));
    setLocalSentRequests(
      localSentRequests.filter((request) => request._id !== userId)
    );
  };

  const addFriendHandler = (userId) => {
    dispatch(addFriend(userId));
  };

  return (
    <Space direction="vertical" style={{ display: "flex", width: "100%" }}>
      <Breadcrumb
        className="breadcrumb"
        items={[
          {
            title: <Link to="/">Home</Link>,
          },

          {
            title: "Friends",
          },
        ]}
      />
      <Collapse
        className="friends__container"
        collapsible="header"
        defaultActiveKey={["1"]}
        items={[
          {
            key: "1",
            label: <h5>Friends</h5>,
            children: (
              <div className="friends__friends">
                {loading
                  ? "loading"
                  : error
                  ? error
                  : localFriends?.map((friend) => {
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
            ),
          },
        ]}
      />
      <Collapse
        className="friends__container"
        collapsible="header"
        defaultActiveKey={["1"]}
        items={[
          {
            key: "1",
            label: <h5>Requests</h5>,
            children: (
              <div className="friends__friends">
                {loading
                  ? "loading"
                  : error
                  ? error
                  : localRequests?.map((request) => {
                      return (
                        <Card
                          key={request._id} // Add a unique key
                          style={{
                            width: 250,
                            marginRight: "1rem",
                          }}
                          cover={
                            <img
                              className="friends__friend-cover"
                              alt="example"
                              src={
                                request.cover
                                  ? request.cover
                                  : "/images/default_cover1.jpeg"
                              }
                            />
                          }
                          actions={[
                            <Tooltip title="Accept">
                              <CheckOutlined
                                onClick={() =>
                                  acceptRequestHandler(request._id)
                                }
                                className="friends__friend-friendProfileBtn"
                                key="profile"
                              />
                            </Tooltip>,
                            <Tooltip title="Reject">
                              <CloseOutlined
                                className="friends__friend-unfriendBtn"
                                onClick={() =>
                                  deleteRequestHandler(request._id)
                                }
                              />
                            </Tooltip>,
                          ]}
                        >
                          <Meta
                            avatar={<Avatar src={request.picture} />}
                            title={request.first_name + " " + request.last_name}
                            description={`Mutual friends ${request.friends.length} `}
                          />
                        </Card>
                      );
                    })}
              </div>
            ),
          },
        ]}
      />
      <Collapse
        className="friends__container"
        collapsible="header"
        defaultActiveKey={["1"]}
        items={[
          {
            key: "1",
            label: <h5>Sent Requests</h5>,
            children: (
              <div className="friends__friends">
                {loading
                  ? "loading"
                  : error
                  ? error
                  : localSentRequests?.length
                  ? localSentRequests?.map((request) => {
                      return (
                        <Card
                          key={request._id} // Add a unique key
                          style={{
                            width: 250,
                            marginRight: "1rem",
                          }}
                          cover={
                            <img
                              className="friends__friend-cover"
                              alt="example"
                              src={
                                request.cover
                                  ? request.cover
                                  : "/images/default_cover1.jpeg"
                              }
                            />
                          }
                          actions={[
                            <Tooltip title="Cancel request">
                              <XOutlined
                                className="friends__friend-unfriendBtn"
                                onClick={() =>
                                  cancelRequestHandler(request._id)
                                }
                              />
                            </Tooltip>,
                          ]}
                        >
                          <Meta
                            avatar={<Avatar src={request.picture} />}
                            title={request.first_name + " " + request.last_name}
                            description={`Mutual friends ${request.friends?.length} `}
                          />
                        </Card>
                      );
                    })
                  : "No sent requests"}
              </div>
            ),
          },
        ]}
      />
    </Space>
  );
}
