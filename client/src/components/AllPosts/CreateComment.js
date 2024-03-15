import React, { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { comment } from "../../actions/postAction";
import dataURItoBlob from "../../helper/dataURItoBlob";
import { uploadCommentImages, uploadImages } from "../../actions/uploadImages";
import Loader3 from "../Loaders/Loader3";

export default function CreateComment({ user, postId, setCount, setComments }) {
  const [picker, setPicker] = useState(false);
  const [text, setText] = useState("");
  const [cursorPosition, setCursorPosition] = useState();
  const [commentImage, setCommentImage] = useState("");

  const textRef = useRef(null);
  const imageInput = useRef(null);
  const dispatch = useDispatch();

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const imageCommentUpload = useSelector((state) => state.imageCommentUpload);
  const {
    loading: loadingImage,
    error: errorImage,
    img,
    success: successCommentImg,
  } = imageCommentUpload;

  const writeComment = useSelector((state) => state.writeComment);
  const {
    loading: loadingComment,
    error: errorComment,
    comments,
    success: successComment,
  } = writeComment;

  const notify = (message) => toast.error(message);
  useEffect(() => {
    if (textRef.current) {
      textRef.current.selectionEnd = cursorPosition;
    }
    if (successCommentImg) {
      dispatch(comment(postId, text, img[0].url));
      setCount((prev) => ++prev);
    }
    if (comments) {
      setComments(comments);
    }
  }, [cursorPosition, successCommentImg, comments]);

  const handleEmoji = (emojiObject) => {
    const emoji = emojiObject.emoji;
    const ref = textRef.current;
    if (ref) {
      ref.focus();
      const start = text.substring(0, ref.selectionStart || 0);
      const end = text.substring(ref.selectionStart || 0);
      const newText = start + emoji + end;
      setText(newText);
      setCursorPosition((start + emoji).length);
    }
  };

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
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCommentImage(event.target.result);
    };
  };

  const handleComment = (e) => {
    if (e.key === "Enter") {
      if (commentImage !== "") {
        const img = dataURItoBlob(commentImage);
        const path = `${userInfo.username}/post_images/${postId}`;
        let formData = new FormData();
        formData.append("path", path);
        formData.append("file", img);
        dispatch(uploadCommentImages(formData, path));
        setText("");
        setCommentImage("");
      } else {
        dispatch(comment(postId, text, ""));
        setCount((prev) => ++prev);
        setText("");
        setCommentImage("");
      }
    }
  };

  return (
    <>
      <div className="posts__post-createComment">
        <div className="posts__post-createComment-user">
          <img src={userInfo.picture} alt="" />
        </div>
        <div className="posts__post-createComment-input">
          <input type="file" hidden />
          <input
            type="file"
            hidden
            ref={imageInput}
            accept="image/*"
            onChange={handleImage}
          />
          <input
            type="text"
            ref={textRef}
            value={text}
            placeholder="Write a comment..."
            onChange={(e) => setText(e.target.value)}
            onKeyUp={handleComment}
          />
          <div className="posts__post-createComment-input-icons">
            {loadingComment && <Loader3 color="blue" />}
            <div className="posts__post-createComment-input-icon">
              {picker && (
                <div className="posts__post-createComment-emojiPicker">
                  <Picker
                    searchDisabled={true}
                    onEmojiClick={handleEmoji}
                    height={500}
                    width={300}
                  />
                </div>
              )}
              <i
                onClick={() => setPicker((prev) => !prev)}
                className="emoji_icon"
              ></i>
            </div>
            <div
              onClick={() => imageInput.current.click()}
              className="posts__post-createComment-input-icon"
            >
              <i className="camera_icon"></i>
            </div>
          </div>
        </div>
      </div>
      {commentImage && (
        <div className="posts__post-createComment-commentImage">
          <div
            className="posts__post-createComment-commentImageClear"
            onClick={() => setCommentImage("")}
          >
            <i className="exit_icon"></i>
          </div>
          <img src={commentImage} alt="" />
        </div>
      )}
    </>
  );
}
