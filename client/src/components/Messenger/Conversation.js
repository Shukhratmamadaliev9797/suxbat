import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Conversation({
  conversation,
  userId,
  notificationCount,
  lastMessage,
}) {
  const [user, setUser] = useState();

  useEffect(() => {
    const friendId = conversation.members?.find((m) => m !== userId);
    const getUser = async () => {
      try {
        const res = await axios.get(`/getUser/${friendId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [conversation.members, userId]);

  return (
    <div className="messages__receiver">
      <div className="messages__receiver-img">
        <img src={user?.picture} alt="" />
      </div>
      <div className="messages__receiver-name">
        <span>
          {user?.first_name} {user?.last_name}
        </span>
        <span>{lastMessage?.text.substring(0, 25)}...</span>
      </div>
      <div>{notificationCount}</div>
    </div>
  );
}
