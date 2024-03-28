import React, { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { comment } from "../../actions/postAction";
import dataURItoBlob from "../../helper/dataURItoBlob";
import { uploadCommentImages } from "../../actions/uploadImages";
import Loader3 from "../Loaders/Loader3";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function CreateComment({ postId, setCount, setComments }) {
  const [picker, setPicker] = useState(false);
  const [text, setText] = useState("");
  const [cursorPosition, setCursorPosition] = useState();
  const [commentImage, setCommentImage] = useState("");
  const [loading, setLoading] = useState(false);
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
  }, [cursorPosition]);

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

  const commentHandle = async () => {
    if (commentImage !== "") {
      setLoading(true);
      const img = dataURItoBlob(commentImage);
      const path = `${userInfo.username}/post_images/${postId}`;
      let formData = new FormData();
      formData.append("path", path);
      formData.append("file", img);
      const imgComment = await uploadCommentImages(
        formData,
        path,
        userInfo.token
      );
      const comments = await comment(
        postId,
        text,
        imgComment[0].url,
        userInfo.token
      );
      setComments(comments);
      setCount((prev) => ++prev);
      setLoading(false);
      setText("");
      setCommentImage("");
    } else {
      setLoading(true);
      const comments = await comment(postId, text, "", userInfo.token);
      setComments(comments);
      setCount((prev) => ++prev);
      setLoading(false);
      setText("");
      setCommentImage("");
    }
  };

  const handleComment = async (e) => {
    if (e.key === "Enter") {
      commentHandle();
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
            <div className="posts__post-createComment-input-sendIcon">
              {loading || loadingImage ? (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 35 }} spin />}
                />
              ) : (
                <i className="fab fa-telegram" onClick={commentHandle}></i>
              )}
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
