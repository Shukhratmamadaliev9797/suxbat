import { Empty } from "antd";
import React from "react";

export default function GroupEvents() {
  return (
    <>
      <br />
      <div className="background-help">
        <Empty description={<span>No events</span>} />
      </div>
      );
    </>
  );
}
