import React, { useState } from "react";
import { useSelector } from "react-redux";
import Feeling from "../../svg/feeling";
import LiveVideo from "../../svg/liveVideo";
import Photo from "../../svg/photo";
import { Input } from "antd";
import CreateGroupPost from "../../modal/CreateGroupPost";

export default function CreatePostGroup({ group }) {
  const [createPostModal, setCreatePostModal] = useState(false);
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const { TextArea } = Input;
  return (
    <>
      <CreateGroupPost
        openCreatePost={createPostModal}
        handleClose={() => setCreatePostModal(false)}
        setCreatePostModal={setCreatePostModal}
        group={group}
      />
      <div className="createPostHome">
        <div className="createPostHome__container">
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
