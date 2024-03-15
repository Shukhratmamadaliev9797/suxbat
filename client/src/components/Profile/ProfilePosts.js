import React from "react";
import CreatePostHome from "../CreatePost/CreatePostHome";
import Post from "../AllPosts/Post";
import Posts from "../AllPosts/Posts";

export default function ProfilePosts({ visitor, posts }) {
  return (
    <div>
      {posts.map((post, i) => {
        return <Post post={post} key={i} />;
      })}
    </div>
  );
}
