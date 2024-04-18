import React, { useRef, useState } from "react";
import useClickOutside from "../../helper/useClickOutside";
import { useDispatch } from "react-redux";
import { deletePost, savePost } from "../../actions/postAction";
import { saveAs } from "file-saver";
import { Button, Dropdown } from "antd";

export default function PostMenu({
  userId,
  postUserId,
  post,
  setShowPostMenu,
  setCheckSaved,
  checkSaved,
  postRef,
}) {
  const [ownPost, setOwnPost] = useState(postUserId === userId ? true : false);
  const menu = useRef(null);
  const dispatch = useDispatch();
  useClickOutside(menu, () => setShowPostMenu(false));

  const saveHandler = () => {
    dispatch(savePost(post._id));
    if (checkSaved) {
      setCheckSaved(false);
    } else {
      setCheckSaved(true);
    }
  };

  const downloadImage = () => {
    post?.images.map((img) => {
      saveAs(img.url, "image.jpg");
    });
  };

  const deleteHandler = () => {
    dispatch(deletePost(post._id));
    postRef.current.style.display = "none";
  };

  const items = [
    ownPost && {
      key: "1",
      label: (
        <div className="posts__post-postMenu">
          <i className="pin_icon"></i>
          <div>
            <span>Pin Post</span>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={() => saveHandler()}>
          {checkSaved ? (
            <div className="posts__post-postMenu">
              <i className="save_icon"></i>
              <div>
                <span>Unsave Post</span>
                <p>Add this to your saved items</p>
              </div>
            </div>
          ) : (
            <div className="posts__post-postMenu">
              <i className="save_icon"></i>
              <div>
                <span>Save Post</span>
                <p>Add this to your saved items</p>
              </div>
            </div>
          )}
        </div>
      ),
    },
    ownPost && {
      key: "3",
      label: (
        <div className="posts__post-postMenu">
          <i className="edit_icon"></i>
          <div>
            <span>Edit Post</span>
          </div>
        </div>
      ),
    },
    post?.images?.length && {
      key: "4",
      label: (
        <div className="posts__post-postMenu" onClick={() => downloadImage()}>
          <i className="download_icon"></i>
          <div>
            <span>Download</span>
          </div>
        </div>
      ),
    },

    ownPost && {
      key: "5",
      label: (
        <div className="posts__post-postMenu" onClick={() => deleteHandler()}>
          <i className="trash_icon"></i>
          <div>
            <span>Move to Bin</span>
            <p>Post will be deleted permanently</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
        arrow
        className="post__menu"
      >
        <Button className="post__menu-btn">
          <i className="fas fa-ellipsis-h"></i>
        </Button>
      </Dropdown>
    </>
  );
}
