import { Button } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";

export default function PrButton({
  children,
  onClick,
  type,
  htmlType,
  loading,
  width,
  size,
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
      size={size ? size : tablet ? "middle" : "large"}
      loading={loading}
      {...props}
      style={{ width: `${width ? width : "100%"}` }}
    >
      {children}
    </Button>
  );
}
