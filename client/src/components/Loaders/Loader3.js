import React from "react";
import { Oval } from "react-loader-spinner";
export default function Loader3({ height, width, color }) {
  return (
    <Oval
      visible={true}
      height={height ? height : "20"}
      width={width ? width : "20"}
      color={color ? color : "#fff"}
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
