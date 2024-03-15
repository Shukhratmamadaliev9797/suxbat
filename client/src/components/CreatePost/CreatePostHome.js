import React, { useState } from "react";
import { useSelector } from "react-redux";
import Feeling from "../../svg/feeling";
import LiveVideo from "../../svg/liveVideo";
import Photo from "../../svg/photo";
import CreatePost from "../../modal/CreatePost";
import { Flex, Input } from "antd";

export default function CreatePostHome() {
  const [createPostModal, setCreatePostModal] = useState(false);
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const { TextArea } = Input;
  return (
    <>
      <CreatePost
        openCreatePost={createPostModal}
        handleClose={() => setCreatePostModal(false)}
        setCreatePostModal={setCreatePostModal}
      />
      <div className="createPostHome">
        <div className="createPostHome__container">
          <div className="createPostHome__title">
            <div className="createPostHome__title-icon">
              <i className="fas fa-pencil-alt"></i>
            </div>
            <span>
              <b>Create Post</b>
            </span>
          </div>
          <div className="createPostHome__input">
            <div>
              <TextArea
                onClick={() => setCreatePostModal(true)}
                name=""
                id=""
                placeholder="What's on your mind?"
                value=""
                readOnly
              />
            </div>
          </div>
          <div className="createPostHome__action">
            <div className="createPostHome__action-item">
              <LiveVideo color={"#E97777"} />
              <span>Live Video</span>
            </div>
            <div className="createPostHome__action-item">
              <Photo color={"#10d876"} />
              <span>Photo/Video</span>
            </div>
            <div className="createPostHome__action-item">
              <Feeling color={"#fe9431"} />
              <span>Feeling/Activity</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
