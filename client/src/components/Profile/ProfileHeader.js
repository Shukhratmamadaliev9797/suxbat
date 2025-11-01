import React, { useCallback, useEffect, useRef, useState } from "react";
import useClickOutside from "../../helper/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helper/getCroppedImg";
import { uploadImages } from "../../actions/uploadImages";
import { PROFILE_COVER_UPDATE_RESET } from "../../constants/userConstants";
import { updateCoverProfile } from "../../actions/userAction";
import { createPost } from "../../actions/postAction";
import { IMAGES_UPLOAD_RESET } from "../../constants/uploadImagesConstants";
import { POST_CREATE_RESET } from "../../constants/postConstants";
import ProfileFriendship from "./ProfileFriendship";

export default function ProfileHeader({
  profile,
  visitor,
  setProfilePage,
  setUpdatePhoto,
  setSelectCoverPictures,
  setCoverPicture,
  coverPicture,
  setEditDetails,
  setHeight,
  friendship,
}) {
  const [changeCover, setChangeCover] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [width, setWidth] = useState();
  const coverOptionsRef = useRef(null);
  const inputRef = useRef(null);
  const coverRef = useRef(null);
  const heightRef = useRef(null);
  const dispatch = useDispatch();
  useClickOutside(coverOptionsRef, () => setChangeCover(false));

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const imageUpload = useSelector((state) => state.imageUpload);
  const {
    loading: loadingImage,
    error: errorImage,
    allImages,
    success: successUploadImage,
  } = imageUpload;

  const profileCoverUpdate = useSelector((state) => state.profileCoverUpdate);
  const { error: errorUpdateCover, success: successUpdateCover } =
    profileCoverUpdate;

  const postCreate = useSelector((state) => state.postCreate);
  const { loading, success: successCreatepost, post } = postCreate;

  useEffect(() => {
    if (errorImage || errorUpdateCover) {
      notify(errorImage || errorUpdateCover);
    }

    if (successUploadImage) {
      if (allImages[0]?.url.includes("cover_picture")) {
        dispatch(updateCoverProfile(allImages[0].url));
      }

      if (successUpdateCover) {
        dispatch(createPost("cover", null, null, allImages, userInfo.id));
        dispatch({ type: IMAGES_UPLOAD_RESET });
        dispatch({ type: PROFILE_COVER_UPDATE_RESET });
      }
    }

    if (successCreatepost) {
      dispatch({ type: POST_CREATE_RESET });
    }
    setWidth(coverRef.current.clientWidth);
    setHeight(heightRef.current.clientHeight);
  }, [
    allImages,
    userInfo,
    dispatch,
    errorImage,
    errorUpdateCover,
    successUploadImage,
    successUpdateCover,
    successCreatepost,
  ]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const notify = (message) => toast.error(message);
  const handleCoverImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      notify(`${file.name} format is not supported`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      notify(`${file.name} is too large max 5mb allowed`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCoverPicture(event.target.result);
    };
  };

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        if (!coverPicture || !croppedAreaPixels) {
          // Handle the case where either image or croppedAreaPixels is undefined
          return;
        }
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setCoverPicture(img);
        } else {
          return img;
        }
      } catch (error) {
        notify(error);
      }
    },
    [croppedAreaPixels, coverPicture]
  );

  const updateProfileCover = async () => {
    try {
      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${userInfo.username}/cover_picture`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);

      // Dispatch uploadImages action
      dispatch(uploadImages(formData, path));

      // Dispatch updatePictureProfile action
    } catch (error) {
      notify(error);
    }
  };

  return (
    <div className="profile__header" ref={heightRef}>
      <input
        type="file"
        ref={inputRef}
        hidden
        accept="image/*"
        onChange={handleCoverImage}
      />

      <div
        className="profile__header-cover"
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        ref={coverRef}
      >
        <img
          src={profile?.cover ? profile.cover : "/images/default_cover.jpeg"}
          alt=""
        />
        {coverPicture && (
          <>
            <div className="profile__header-cover-saveCancelBtn">
              <button onClick={() => setCoverPicture("")}>Cancel</button>
              <button onClick={() => updateProfileCover()}>Save</button>
            </div>
            <div>
              <Cropper
                image={coverPicture}
                crop={crop}
                zoom={zoom}
                aspect={width / 350}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                showGrid={true}
                objectFit="horizontal-cover"
              />
            </div>
          </>
        )}
        {!visitor && !coverPicture && (
          <>
            <button
              className="profile__header-cover-changeBtn"
              onClick={() => setChangeCover((prev) => !prev)}
            >
              <i className="fas fa-camera"></i> <span>Change cover photo</span>
            </button>
            {changeCover ? (
              <ul
                className="profile__header-cover-options"
                ref={coverOptionsRef}
              >
                <li onClick={() => setSelectCoverPictures(true)}>
                  <i className="photo_icon"></i> <span>Select photo</span>
                </li>
                <li onClick={() => inputRef.current.click()}>
                  <i className="upload_icon"></i> <span>Upload photo</span>
                </li>
                <li>
                  <i className="trash_icon"></i> <span>Remove</span>
                </li>
              </ul>
            ) : (
              ""
            )}
          </>
        )}
      </div>
      <div className="profile__header-user">
        <div className="profile__header-user-img">
          <img src={profile?.picture} alt="" />
          {!visitor && (
            <button
              onClick={() => setUpdatePhoto(true)}
              className="profile__header-user-imgChange"
            >
              <i className="fas fa-camera "></i>
            </button>
          )}
        </div>
        <div className="profile__header-user-info">
          <div>
            <h4>
              {profile?.first_name} {profile?.last_name}
            </h4>
            <span>{profile?.friends?.length} Friends</span>
          </div>
          {visitor ? (
            <ProfileFriendship friendshipp={friendship} profile={profile} />
          ) : (
            <div className="profile__header-user-action">
              <button onClick={() => setEditDetails(true)}>
                <i className="edit_icon"></i>
                <span>Edit Profile</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <ul className="profile__navbar">
        <li onClick={() => setProfilePage(0)}>
          <span to="/profile/about">About</span>
        </li>
        <li onClick={() => setProfilePage(1)}>
          <span to="/profile/posts">Posts</span>
        </li>
        <li onClick={() => setProfilePage(2)}>
          <span>Friends</span>
        </li>
        <li onClick={() => setProfilePage(3)}>
          <span>Photos</span>
        </li>
        <li onClick={() => setProfilePage(4)}>
          <span>Groups</span>
        </li>
        <li>
          <span>More</span>
        </li>
      </ul>
    </div>
  );
}
