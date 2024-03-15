import React from "react";

export default function Loader1() {
  return (
    <div className="loader">
      <div className="loader__1">
        <img src="/icons/logo4.png" alt="" />
        <div class="wrapper">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
          <span>Loading</span>
        </div>
      </div>
    </div>
  );
}
