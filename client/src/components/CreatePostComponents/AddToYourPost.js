import React from "react";
import { Photo, Feeling, Dots } from "../../svg";
export default function AddToYourPost({ setShowPrev }) {
  return (
    <div className="addToYourPost">
      <div className="addToYourPost__icons">
        <div onClick={setShowPrev}>
          <Photo color="#45bd62" />
        </div>
      </div>
    </div>
  );
}
