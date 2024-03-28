import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allPosts } from "../../actions/postAction";
import { POST_LIST_SUCCESS } from "../../constants/postConstants";
import "video-react/dist/video-react.css";
import Post from "./Post";

export default function Posts() {
  const dispatch = useDispatch();

  const postAll = useSelector((state) => state.postAll);
  const { loading, error, posts } = postAll;

  const postCreate = useSelector((state) => state.postCreate);
  const { success, post } = postCreate;

  useEffect(() => {
    dispatch(allPosts());

    if (success) {
      dispatch({ type: POST_LIST_SUCCESS, payload: [post, ...posts] });
    }
  }, [dispatch, success]);

  return (
    <div className="posts">
      {loading
        ? "loading"
        : error
        ? error
        : posts.map((post, i) => {
            return <Post post={post} key={i} />;
          })}
    </div>
  );
}
