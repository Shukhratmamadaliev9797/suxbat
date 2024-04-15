import React from "react";
import { Divider, Empty } from "antd";
import { Link } from "react-router-dom";

export default function GroupMembers({ group }) {
  return (
    <div className="groupMembers">
      <h6>Group members</h6>
      <Divider />
      <div>
        {group.members.length <= 0 && (
          <Empty description={<span>No members</span>} />
        )}
      </div>
      <div className="groupMembers__members">
        {group.members.map((member) => {
          return (
            <Link
              to={`/profile/${member.username}`}
              className="groupMembers__member"
            >
              <img src={member.picture} alt="" />
              <span>
                {member.first_name} {member.last_name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
