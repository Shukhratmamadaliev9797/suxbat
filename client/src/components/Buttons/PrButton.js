import { Button } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";

export default function PrButton({
  children,
  onClick,
  type,
  htmlType,
  loading,
  ...props
}) {
  const tablet = useMediaQuery({
    query: "(max-width: 992px)",
  });

  return (
    <Button
      onClick={onClick}
      type={type}
      htmlType={htmlType}
      size={tablet ? "middle" : "large"}
      loading={loading}
      {...props}
      style={{ width: "100%" }}
    >
      {children}
    </Button>
  );
}
