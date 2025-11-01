import { Image } from "antd";
import React, { useEffect } from "react";

export default function ProfileImages({ userName, photos }) {
  console.log(photos);

  const profilePhotos = photos.resources.filter((p) =>
    p.public_id.includes("profile_picture")
  );

  const coverPhotos = photos.resources.filter((p) =>
    p.public_id.includes("cover_picture")
  );

  const postPhotos = photos.resources.filter((p) =>
    p.public_id.includes("post_images")
  );
  return (
    <div className="profile__imagesContainer">
      <div>
        <h5>Profile photos</h5>

        <Image.PreviewGroup>
          <div className="profile__imagesContainer-profilePhotos">
            {profilePhotos.map((photo, i) => (
              <Image
                key={i}
                src={photo.url}
                alt={userName}
                className="profile__imagesContainer-image"
                style={{ width: 150, height: "auto", borderRadius: 6 }}
              />
            ))}
          </div>
        </Image.PreviewGroup>
      </div>

      <div>
        <h5>Cover photos</h5>
        <Image.PreviewGroup>
          <div className="profile__imagesContainer-coverPhotos">
            {coverPhotos.map((photo, i) => (
              <Image
                key={i}
                src={photo.url}
                alt={userName}
                className="profile__imagesContainer-image"
                style={{ width: 150, height: 80, borderRadius: 6 }}
              />
            ))}
          </div>
        </Image.PreviewGroup>
      </div>
      <div>
        <h5>Post photos</h5>
        <Image.PreviewGroup>
          <div className="profile__imagesContainer-postPhotos">
            {postPhotos.map((photo, i) => (
              <Image
                key={i}
                src={photo.url}
                alt={userName}
                className="profile__imagesContainer-image"
                style={{ width: 150, height: "100%", borderRadius: 6 }}
              />
            ))}
          </div>
        </Image.PreviewGroup>
      </div>
    </div>
  );
}
