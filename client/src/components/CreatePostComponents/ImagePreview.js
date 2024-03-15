import React, { useRef } from "react";
import EmojiBackground from "./EmojiBackground";

export default function ImagePreview({
  text,
  user,
  setText,
  images,
  setImages,
  setShowPrev,
  setImageCheck,
}) {
  const imageInputRef = useRef(null);
  const getMediaType = (dataURL) => {
    const prefix = dataURL.substring(0, dataURL.indexOf(";"));
    return prefix.includes("image")
      ? "image"
      : prefix.includes("video")
      ? "video"
      : null;
  };

  const handleMedia = (e) => {
    let files = Array.from(e.target.files);

    files.forEach((media) => {
      if (
        (media.type.startsWith("image/") || media.type.startsWith("video/")) &&
        isSupportedFormat(media.type)
      ) {
        if (media.size > 1024 * 1024 * 40) {
          setImageCheck(`${media.name} size is too large. Max 5MB allowed.`);
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(media);
          reader.onload = (readerEvent) => {
            setImages((prevImages) => [
              ...prevImages,
              readerEvent.target.result,
            ]);
          };
        }
      } else {
        setImageCheck(`${media.name} format is not supported.`);
      }
    });
  };

  const isSupportedFormat = (type) => {
    return (
      type === "image/jpeg" ||
      type === "image/png" ||
      type === "image/webp" ||
      type === "image/gif" ||
      type === "video/mp4" ||
      type === "video/webm" ||
      type === "video/quicktime"
    );
  };
  return (
    <div className="imagePreview">
      <EmojiBackground text={text} user={user} setText={setText} type2 />
      <div>
        <input
          type="file"
          multiple
          accept="image/*, video/*"
          hidden
          ref={imageInputRef}
          onChange={handleMedia}
        />
        {images && images.length ? (
          <div className="imagePreview__images">
            <div className="imagePreview__images-action-editAdd">
              <button
                onClick={() => imageInputRef.current.click()}
                className="imagePreview__images-action-add"
              >
                <i className="addPhoto_icon"></i> Add Photo
              </button>
            </div>
            <div className="imagePreview__images-action-exit">
              <i className="exit_icon" onClick={() => setImages([])}></i>
            </div>

            <div
              className={`imagePreview__${
                images.length === 1
                  ? "imagePreview1"
                  : images.length === 2
                  ? "imagePreview2"
                  : images.length === 3
                  ? "imagePreview3"
                  : images.length === 4
                  ? "imagePreview4"
                  : images.length === 5
                  ? "imagePreview5"
                  : images.length % 2 === 0
                  ? "imagePreview6"
                  : "singleGridImage"
              }`}
            >
              {images.map((image, i) => {
                const mediaType = getMediaType(image);
                return mediaType === "image" ? (
                  <img src={image} key={i} alt="Image" />
                ) : mediaType === "video" ? (
                  <video key={i} controls>
                    <source src={image} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : null;
              })}
            </div>
          </div>
        ) : (
          <div className="imagePreview__addImage">
            <div className="imagePreview__addImage-exit">
              <i className="exit_icon" onClick={setShowPrev}></i>
            </div>
            <div
              className="imagePreview__addImage-add"
              onClick={() => imageInputRef.current.click()}
            >
              <i className="addPhoto_icon imagePreview__addImage-icon"></i>
              <h6>Add Photos/Videos</h6>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
