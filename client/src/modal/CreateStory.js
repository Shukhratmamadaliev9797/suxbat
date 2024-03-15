import React, { useRef, useState } from "react";
import { Modal } from "rsuite";
import Stories from "react-insta-stories";

export default function CreateStory({ createStory, setCreateStory }) {
  const [images, setImages] = useState([]);
  const [imageCheck, setImageCheck] = useState("");
  const imageInputRef = useRef(null);

  const stories = [
    {
      url: "https://res.cloudinary.com/djdbhmqqd/video/upload/v1708828781/ShukhratMamadaliev/post_images/wi20szkir1ljzrnjr3yo.mp4",
    },
    {
      url: "https://res.cloudinary.com/djdbhmqqd/image/upload/v1708655967/ShukhratMamadaliev/profile_picture/pmtiy65xb8y0dekg5pyj.jpg",
    },
  ];

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
    <Modal open={createStory} onClose={() => setCreateStory(false)}>
      <div className="createPostModal__header">
        <h5>Create Story</h5>
      </div>
      <div>
        <input
          type="file"
          multiple
          accept="image/*, video/*"
          hidden
          ref={imageInputRef}
          onChange={handleMedia}
        />
        <button onClick={() => imageInputRef.current.click()}>
          Upload images
        </button>
      </div>
      <div>
        {images ? (
          <Stories
            stories={images}
            defaultInterval={1500}
            width={432}
            height={768}
          />
        ) : (
          ""
        )}
      </div>
    </Modal>
  );
}
