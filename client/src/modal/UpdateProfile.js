import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "rsuite";
import Cropper from "react-easy-crop";
import { ToastContainer, toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import getCroppedImg from "../helper/getCroppedImg";
import { uploadImages } from "../actions/uploadImages";
import { updatePictureProfile } from "../actions/userAction";
import { IMAGES_UPLOAD_RESET } from "../constants/uploadImagesConstants";
import { createPost } from "../actions/postAction";
import { PROFILE_PICTURE_UPDATE_RESET } from "../constants/userConstants";
import { POST_CREATE_RESET } from "../constants/postConstants";

export default function UpdateProfile({ updatePhoto, handleClose, photos }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [postProfilePhotos, setPostProfilePhotos] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const refInput = useRef(null);
  const refSlider = useRef(null);
  const dispatch = useDispatch();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const imageUpload = useSelector((state) => state.imageUpload);
  const {
    loading: loadingImage,
    error: errorImage,
    allImages,
    success: successUploadImage,
  } = imageUpload;

  const profilePictureUpdate = useSelector(
    (state) => state.profilePictureUpdate
  );
  const { error: errorUpdatePicture, success: successUpdatePicture } =
    profilePictureUpdate;

  const postCreate = useSelector((state) => state.postCreate);
  const { loading, success: successCreatepost, post } = postCreate;
  useEffect(() => {
    if (errorImage || errorUpdatePicture) {
      notify(errorImage || errorUpdatePicture);
    }

    if (successUploadImage) {
      if (allImages[0]?.url.includes("profile_picture")) {
        dispatch(updatePictureProfile(allImages[0].url));
      }

      if (successUpdatePicture) {
        dispatch(
          createPost("profilePicture", null, text, allImages, userInfo.id)
        );
        dispatch({ type: IMAGES_UPLOAD_RESET });
        dispatch({ type: PROFILE_PICTURE_UPDATE_RESET });
      }
    }

    if (successCreatepost) {
      dispatch({ type: POST_CREATE_RESET });
      window.location.reload();
    }
  }, [
    errorImage,
    errorUpdatePicture,
    successUploadImage,
    successUpdatePicture,
    successCreatepost,
    text,
    allImages,
    userInfo.id,
    dispatch,
  ]);

  const notify = (message) => toast.error(message);

  const handleImage = (e) => {
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
      setImage(event.target.result);
    };
  };

  const zoomIn = () => {
    refSlider.current.stepUp();
    setZoom(refSlider.current.value);
  };
  const zoomOut = () => {
    refSlider.current.stepDown();
    setZoom(refSlider.current.value);
  };

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        if (!image || !croppedAreaPixels) {
          // Handle the case where either image or croppedAreaPixels is undefined
          return;
        }
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setImage(img);
        } else {
          return img;
        }
      } catch (error) {
        notify(error);
      }
    },
    [croppedAreaPixels, image]
  );

  const updateProfilePicture = async () => {
    try {
      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${userInfo.username}/profile_picture`;
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
    <>
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
        theme="colored"
        className="snackbar"
      />
      <Modal
        overflow={true}
        size="md"
        open={updatePhoto}
        onClose={handleClose}
        className="uploadImage"
      >
        <div className="createPostModal__header">
          <h5>Update profile photo</h5>{" "}
        </div>
        <input
          type="file"
          ref={refInput}
          hidden
          onChange={handleImage}
          accept="image/jpeg, image/png, image/webp, image/gif"
        />
        <div className="uploadImage__Btns">
          <button onClick={() => refInput.current.click()}>
            <span>Upload image</span>
          </button>
          <button
            className={`${postProfilePhotos ? "" : "uploadImage__Btns-active"}`}
            onClick={() => setPostProfilePhotos(false)}
          >
            Profile Photos
          </button>
          <button
            className={`${postProfilePhotos ? "uploadImage__Btns-active" : ""}`}
            onClick={() => setPostProfilePhotos(true)}
          >
            Post Photos
          </button>
        </div>
        <div className="uploadImage__oldImages">
          {postProfilePhotos
            ? photos
                ?.filter(
                  (img) => img.folder === `${userInfo.username}/post_images`
                )
                .map((photo) => {
                  return (
                    <img
                      src={photo.secure_url}
                      key={photo.public_id}
                      onClick={() => setImage(photo.secure_url)}
                    />
                  );
                })
            : photos
                ?.filter(
                  (img) => img.folder === `${userInfo.username}/profile_picture`
                )
                .map((photo) => {
                  return (
                    <img
                      src={photo.secure_url}
                      key={photo.public_id}
                      onClick={() => setImage(photo.secure_url)}
                    />
                  );
                })}
        </div>
        <div className="uploadImage__body">
          <div className="uploadImage__image">
            {image && image.length ? (
              <>
                <div className="uploadImage__text">
                  <textarea
                    name=""
                    id=""
                    cols="10"
                    rows="3"
                    placeholder="Description"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  ></textarea>
                </div>
                <div className="uploadImage__imageCropper">
                  <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1 / 1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    cropShape="round"
                    showGrid={false}
                  />
                </div>
                <div className="uploadImage__zoomRange">
                  <i onClick={() => zoomOut()} className="minus_icon"></i>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.2}
                    value={zoom}
                    ref={refSlider}
                    onChange={(e) => setZoom(e.target.value)}
                  />
                  <i onClick={() => zoomIn()} className="plus_icon"></i>
                </div>
                <div className="uploadImage__cropBtn">
                  <button onClick={() => getCroppedImage("show")}>
                    <i className="crop_icon"></i> <span>Crop</span>
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <button
            onClick={() => updateProfilePicture()}
            disabled={loadingImage}
            className="createPostModal__postBtn"
          >
            {loadingImage ? (
              <Oval
                visible={true}
                height="20"
                width="20"
                color="#fff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Update"
            )}
          </button>
        </div>
      </Modal>
    </>
  );
}
