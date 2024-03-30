import React, { useEffect, useState } from "react";
import CreatePostGroup from "../CreatePost/CreatePostGroup";
import Post from "../AllPosts/Post";
import { useDispatch, useSelector } from "react-redux";
import { POST_CREATE_RESET } from "../../constants/postConstants";
import { Divider } from "antd";
import { Link } from "react-router-dom";

export default function GroupPost({ group }) {
  const [updatedPosts, setUpdatedPosts] = useState(group.posts); // Local state to store updated posts

  const dispatch = useDispatch();
  const postCreate = useSelector((state) => state.postCreate);
  const { success, post } = postCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: POST_CREATE_RESET });
      // Update local state with the newly created post
      setUpdatedPosts([...updatedPosts, post]);
    }
  }, [dispatch, success]);

  return (
    <div className="groupPost">
      <div>
        <CreatePostGroup group={group} />
        {updatedPosts.reverse().map((post, i) => {
          return <Post key={i} post={post} />;
        })}
      </div>
      <div>
        <div className="groupPost__description">
          <h6>About group</h6>
          <p>{group.description}</p>
          <Divider />
          <span>Created By</span>{" "}
          <Link to={`/profile/${group.owner.username}`}>
            {group.owner.first_name} {group.owner.last_name}
          </Link>
        </div>
      </div>
    </div>
  );
}
