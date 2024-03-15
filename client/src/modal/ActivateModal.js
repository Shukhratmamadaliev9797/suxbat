import React from "react";
import { Message } from "rsuite";
import { Loader } from "rsuite";

export default function ActivateModal({ loading, error, success }) {
  return (
    <div className="activateModal">
      <div className="activateModal__box">
        {loading ? (
          <Message
            showIcon
            type="info"
            header="Verifying Email"
            style={{ fontSize: "1.5rem" }}
          >
            <Loader style={{ marginTop: "1.5rem" }} size="md" />
          </Message>
        ) : error ? (
          <Message showIcon type="error" header="Error">
            {error}
          </Message>
        ) : (
          <Message
            showIcon
            type="success"
            header="Email Verified"
            style={{ fontSize: "1.3rem" }}
          >
            Your account activated successfully
          </Message>
        )}
      </div>
    </div>
  );
}
