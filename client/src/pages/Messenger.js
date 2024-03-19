import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";
import Conversation from "../components/Messenger/Conversation";
import Message from "../components/Messenger/Message";
import { listConversation } from "../actions/conversationActions";
import { listMessage } from "../actions/messageActions";
import { MESSAGES_CREATE_RESET } from "../constants/messageConstants";

export default function Messages({ notificationCount, setNotificationCount }) {
  const [currentChat, setCurrentChat] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState();

  const scrollRef = useRef();
  const socket = useRef();

  const dispatch = useDispatch();

  const conversationList = useSelector((state) => state.conversationList);
  const {
    loading: listLoading,
    error: listError,
    conversationLists,
  } = conversationList;

  const messageCreate = useSelector((state) => state.messageCreate);
  const { success } = messageCreate;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  useEffect(() => {
    localStorage.setItem(
      "notificationCount",
      JSON.stringify(notificationCount)
    );
  }, [notificationCount]);

  useEffect(() => {
    const serverUrl = window.location.origin;
    socket.current = io(serverUrl);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });

      setNotificationCount((prevCount) => prevCount + 1);
    });
  }, []);

  useEffect(() => {
    const friendId = currentChat?.members?.find((m) => m !== userInfo.id);
    const getUser = async () => {
      try {
        const res = await axios.get(`/getUser/${friendId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentChat?.members, userInfo]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]) &&
      setNotificationCount((prev) => prev + 1);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userInfo.id);
    socket.current.on("getUsers", (users) => {});
  }, [userInfo]);

  // Fetch conversation list only when userInfo._id changes
  useEffect(() => {
    if (userInfo && userInfo.id) {
      dispatch(listConversation(userInfo.id));
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (currentChat && currentChat?._id) {
      dispatch(listMessage(currentChat?._id));
    }

    if (success) {
      dispatch({ type: MESSAGES_CREATE_RESET });
    }
  }, [dispatch, currentChat, success]);

  useEffect(() => {
    if (success) {
      getMessages();
    }
    const getMessages = async () => {
      try {
        const res = await axios.get(`/listMessages/${currentChat?._id}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat, success]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: userInfo.id,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== userInfo.id
    );

    socket.current.emit("sendMessage", {
      senderId: userInfo.id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post("/createMessages", message);

      setMessages([...messages, res.data]);

      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="messages">
      <div className="messages__receivers">
        <div className="messages__receivers-title">
          <h6>
            Chat
            {notificationCount > 0 && <span>({notificationCount} new)</span>}
          </h6>
        </div>
        <div className="messages__chaters">
          {listLoading
            ? "Loading"
            : listError
            ? listError
            : conversationLists.map((conversation) => {
                // Find the last message for this conversation
                const lastMessage = messages.find(
                  (message) => message.conversationId === conversation._id
                );

                return (
                  <div
                    key={conversation._id}
                    onClick={() => {
                      setCurrentChat(conversation.conversation);
                      setNotificationCount(0);
                    }}
                  >
                    <Conversation
                      userId={userInfo.id}
                      conversation={conversation.conversation}
                      lastMessage={conversation.lastMessage}
                    />
                  </div>
                );
              })}
        </div>
      </div>
      <div className="messages__chat">
        {currentChat ? (
          <>
            {" "}
            <div className="messages__receivers-title">
              <h6>
                {user?.first_name} {user?.last_name}
              </h6>
            </div>
            <div className="messages__chatBox">
              {messages?.map((message) => {
                return (
                  <div ref={scrollRef} key={message._id}>
                    <Message
                      message={message}
                      own={message?.sender?._id === userInfo.id}
                      user={user}
                    />
                  </div>
                );
              })}
            </div>
            <form
              onSubmit={submitHandler}
              className="messages__chat-input"
              action=""
            >
              <input
                type="text"
                placeholder="Message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                required
              />
              <button type="submit">Send</button>
            </form>{" "}
          </>
        ) : (
          <div className="messages__noChat">
            <span>Select user to start chatting</span>
          </div>
        )}
      </div>
    </div>
  );
}
