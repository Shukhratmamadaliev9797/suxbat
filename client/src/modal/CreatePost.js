import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddToYourPost from "../components/CreatePostComponents/AddToYourPost";
import EmojiBackground from "../components/CreatePostComponents/EmojiBackground";
import ImagePreview from "../components/CreatePostComponents/ImagePreview";
import { createPost } from "../actions/postAction";
import { ToastContainer, toast } from "react-toastify";
import dataURItoBlob from "../helper/dataURItoBlob";
import { uploadImages } from "../actions/uploadImages";
import { IMAGES_UPLOAD_RESET } from "../constants/uploadImagesConstants";
import { Modal, Select } from "antd";
import PrButton from "../components/Buttons/PrButton";

export default function CreatePost({
  openCreatePost,
  handleClose,
  setCreatePostModal,
}) {
  const [showPrev, setShowPrev] = useState(false);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");
  const [imageCheck, setImageCheck] = useState("");
  const [imageStatus, setImageStatus] = useState(false);
  const dispatch = useDispatch();

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const imageUpload = useSelector((state) => state.imageUpload);
  const {
    loading: loadingImages,
    error: errorImages,
    allImages,
    success: successImages,
  } = imageUpload;

  const postCreate = useSelector((state) => state.postCreate);
  const { loading, error, success, post } = postCreate;

  const notify = (message) => toast.error(message);
  useEffect(() => {
    if (error || errorImages || imageCheck) {
      notify(error || errorImages || imageCheck);
    }
    if (success) {
      setCreatePostModal(false);
      setText("");
      setBackground("");
      setImages([]);
    }
  }, [success, setCreatePostModal, error, errorImages, imageCheck]);

  useEffect(() => {
    if (successImages && imageStatus) {
      // Dispatch createPost when successImages changes
      dispatch(createPost(null, null, text, allImages, userInfo.id));
      dispatch({ type: IMAGES_UPLOAD_RESET });
    }
  }, [successImages, dispatch, text, allImages, userInfo.id]);

  const submitHandler = () => {
    if (background) {
      dispatch(createPost(null, background, text, null, userInfo.id));
    } else if (images && images.length) {
      const postImages = images.map((image) => {
        return dataURItoBlob(image);
      });

      const path = `${userInfo.username}/post_images`;

      let formData = new FormData();

      formData.append("path", path);

      postImages.forEach((image) => {
        formData.append("file", image);
      });
      dispatch(uploadImages(formData, path));
      setImageStatus(true);
    } else if (text) {
      dispatch(createPost(null, null, text, null, userInfo.id));
    } else {
      notify("Empty");
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
        size="md"
        open={openCreatePost}
        onCancel={handleClose}
        footer={[]}
        width={800}
        className="createPostModal"
      >
        <div className="modal__title">
          <h5>Create Post</h5>
        </div>
        <div className="createPostModal__body">
          <div className="createPostModal__body-user">
            <img
              className="createPostModal__body-user-img"
              src={userInfo.picture}
              alt=""
            />
            <div className="createPostModal__body-user-name">
              <h6>
                {userInfo.first_name} {userInfo.last_name}
              </h6>
              <Select
                defaultValue="Public"
                style={{
                  width: 80,
                }}
                size="small"
                options={[
                  {
                    value: "Public",
                    label: "Private",
                  },
                ]}
              />
            </div>
          </div>
          {!showPrev ? (
            <EmojiBackground
              text={text}
              user={userInfo}
              setText={setText}
              background={background}
              setBackground={setBackground}
            />
          ) : (
            <ImagePreview
              images={images}
              setImages={setImages}
              text={text}
              user={userInfo}
              setText={setText}
              setShowPrev={() => setShowPrev((prev) => !prev)}
              setImageCheck={setImageCheck}
            />
          )}
          <AddToYourPost setShowPrev={() => setShowPrev((prev) => !prev)} />
          <PrButton
            disabled={loading}
            onClick={submitHandler}
            type="primary"
            width="100%"
          >
            Post
          </PrButton>
        </div>
      </Modal>
    </>
  );
}
