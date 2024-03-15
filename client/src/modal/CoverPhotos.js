import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "rsuite";

export default function CoverPhotos({
  selectCoverPictures,
  setSelectCoverPictures,
  photos,
  setCoverPicture,
  coverPicture,
}) {
  const [changePhoto, setChangePhoto] = useState(1);
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  useEffect(() => {
    if (coverPicture) {
      setSelectCoverPictures(false);
    }
  }, [coverPicture]);

  return (
    <>
      <Modal
        overflow={true}
        size="md"
        open={selectCoverPictures}
        onClose={() => setSelectCoverPictures(false)}
        className="uploadImage"
      >
        <div className="createPostModal__header">
          <h5>Select Photo</h5>{" "}
        </div>
        <div className="uploadImage__Btns">
          <button
            className={`${changePhoto !== 1 ? "" : "uploadImage__Btns-active"}`}
            onClick={() => {
              setChangePhoto(1);
            }}
          >
            <span>Post Photos</span>
          </button>
          <button
            className={`${changePhoto !== 2 ? "" : "uploadImage__Btns-active"}`}
            onClick={() => setChangePhoto(2)}
          >
            Profile Photos
          </button>
          <button
            className={`${changePhoto !== 3 ? "" : "uploadImage__Btns-active"}`}
            onClick={() => setChangePhoto(3)}
          >
            Cover Photos
          </button>
        </div>
        {changePhoto === 1 ? (
          <div className="coverPhotos__photos">
            {photos
              ?.filter(
                (img) => img.folder === `${userInfo.username}/post_images`
              )
              .map((photo) => {
                return (
                  <img
                    onClick={() => setCoverPicture(photo.secure_url)}
                    src={photo.secure_url}
                    key={photo.public_id}
                  />
                );
              })}
          </div>
        ) : changePhoto === 2 ? (
          <div className="coverPhotos__photos">
            {photos
              ?.filter(
                (img) => img.folder === `${userInfo.username}/profile_picture`
              )
              .map((photo) => {
                return (
                  <img
                    onClick={() => setCoverPicture(photo.secure_url)}
                    src={photo.secure_url}
                    key={photo.public_id}
                  />
                );
              })}
          </div>
        ) : (
          <div className="coverPhotos__photos">
            {photos
              ?.filter(
                (img) => img.folder === `${userInfo.username}/cover_picture`
              )
              .map((photo) => {
                return (
                  <img
                    onClick={() => setCoverPicture(photo.secure_url)}
                    src={photo.secure_url}
                    key={photo.public_id}
                  />
                );
              })}
          </div>
        )}
      </Modal>
    </>
  );
}
