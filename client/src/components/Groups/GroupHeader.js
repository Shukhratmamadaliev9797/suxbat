import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrButton from "../Buttons/PrButton";
import { Avatar, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helper/getCroppedImg";
import {
  joinGroup,
  leaveGroup,
  updateCoverGroup,
} from "../../actions/groupAction";
import { IMAGES_UPLOAD_RESET } from "../../constants/uploadImagesConstants";
import { GROUP_COVER_UPDATE_RESET } from "../../constants/groupConstants";
import { uploadImages } from "../../actions/uploadImages";

export default function GroupHeader({ group, setGroupPage }) {
  const [coverPicture, setCoverPicture] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const coverRef = useRef(null);
  const inputRef = useRef(null);
  const heightRef = useRef(null);
  const dispatch = useDispatch();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const imageUpload = useSelector((state) => state.imageUpload);
  const {
    loading: loadingImage,
    error: errorImage,
    allImages,
    success: successUploadImage,
  } = imageUpload;

  const groupCoverUpdate = useSelector((state) => state.groupCoverUpdate);
  const { error: errorUpdateCover, success: successUpdateCover } =
    groupCoverUpdate;

  const groupJoin = useSelector((state) => state.groupJoin);
  const { error: errorJoin, success: successJoin } = groupJoin;

  const groupLeave = useSelector((state) => state.groupLeave);
  const { error: errorLeave, success: successLeave } = groupLeave;

  // State to track whether the user is a member of the group or not
  const [isMember, setIsMember] = useState(
    group.members.some((member) => member._id === userInfo.id)
  );

  const joinHandler = () => {
    dispatch(joinGroup(group._id));
    setIsMember(true); // Update state when user joins the group
  };

  const leaveHandler = () => {
    dispatch(leaveGroup(group._id));
    setIsMember(false); // Update state when user leaves the group
  };
  const notify = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  useEffect(() => {
    if (errorImage || errorUpdateCover || errorLeave || errorJoin) {
      notify(errorImage || errorUpdateCover || errorLeave || errorJoin);
    }
    if (successJoin || successLeave) {
      notifySuccess(successJoin || successLeave);
    }
    if (successUploadImage) {
      if (allImages[0]?.url.includes("cover_picture")) {
        dispatch(updateCoverGroup(allImages[0].url, group._id));
      }
    }

    setWidth(coverRef.current.clientWidth);
  }, [
    allImages,
    dispatch,
    errorImage,
    errorUpdateCover,
    successUploadImage,
    successJoin,
    successLeave,
  ]);

  useEffect(() => {
    if (successUpdateCover) {
      dispatch({ type: GROUP_COVER_UPDATE_RESET });
      window.location.reload();
    }
  }, [successUpdateCover]);

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
      const path = `${group._id}/cover_picture`;
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
  const own = userInfo.id === group?.owner._id;
  const items = [
    own && {
      key: "1",
      label: (
        <div
          className="posts__post-postMenu"
          onClick={() => inputRef.current.click()}
        >
          <i className="fas fa-camera"></i>
          <div>
            <span>Change cover</span>
          </div>
        </div>
      ),
    },
    own && {
      key: "2",
      label: (
        <div className="posts__post-postMenu">
          <i className="fas fa-trash-alt"></i>
          <div>
            <span>Delete group</span>
          </div>
        </div>
      ),
    },
    userInfo.id !== group.owner._id &&
      isMember === true && {
        key: "3",
        label: (
          <div className="posts__post-postMenu">
            <i className="fas fa-trash-alt"></i>
            <div onClick={leaveHandler}>
              <span>Leave group</span>
            </div>
          </div>
        ),
      },
    userInfo.id !== group.owner._id &&
      isMember === false && {
        key: "3",
        label: (
          <div className="posts__post-postMenu">
            <i className="fas fa-trash-alt"></i>
            <div onClick={joinHandler}>
              <span>Join group</span>
            </div>
          </div>
        ),
      },
  ];

  return (
    <div className="groupHeader">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="snackbar"
      />
      <input
        type="file"
        ref={inputRef}
        hidden
        accept="image/*"
        onChange={handleCoverImage}
      />
      <div className="">
        <div
          className="profile__header-cover"
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          ref={coverRef}
        >
          <img src={group.cover} alt="" />
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
                  aspect={width / 400}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  showGrid={true}
                  objectFit="horizontal-cover"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="groupHeader__title">
        <div>
          <h5>{group.title}</h5>
        </div>

        <div className="groupHeader__action">
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomRight"
            arrow
            className="post__menu"
          >
            <PrButton width="3rem" type="primary" ghost size="medium">
              <i className="fas fa-ellipsis-h"></i>
            </PrButton>
          </Dropdown>
        </div>
      </div>
      <div className="groupHeader__members">
        {group.members.length > 0 ? (
          <Avatar.Group>
            {group.members.map((member) => {
              return (
                <Link to={`/profile/${member.username}`}>
                  <Avatar shape="round" size="large" src={member.picture} />
                </Link>
              );
            })}
          </Avatar.Group>
        ) : (
          "No members"
        )}
      </div>
      <ul className="groupHeader__navbar">
        <li onClick={() => setGroupPage(0)}>
          <span>Discussion</span>
        </li>
        <li onClick={() => setGroupPage(1)}>
          <span>Members</span>
        </li>
        <li onClick={() => setGroupPage(2)}>
          <span>Photos</span>
        </li>
        <li onClick={() => setGroupPage(3)}>
          <span>Events</span>
        </li>
        {userInfo.id === group.owner._id && (
          <li onClick={() => setGroupPage(4)}>
            <span>Setting</span>
          </li>
        )}
      </ul>
    </div>
  );
}
