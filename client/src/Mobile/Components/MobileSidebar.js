import React from "react";
import { FloatButton } from "antd";
import { CommentOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
export default function MobileSidebar() {
  return (
    <FloatButton.Group
      trigger="click"
      shape="square"
      type="primary"
      style={{
        right: 35,
      }}
      icon={<i class="fas fa-question-circle"></i>}
    >
      <FloatButton href="/setting" />
    </FloatButton.Group>
  );
}
