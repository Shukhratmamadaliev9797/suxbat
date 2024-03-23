import React from "react";
import CreatePostGroup from "../CreatePost/CreatePostGroup";
import Post from "../AllPosts/Post";

export default function GroupPost({ group }) {
  return (
    <div className="groupPost">
      <div>
        <CreatePostGroup group={group} />
        {group.posts.map((post, i) => {
          return <Post key={i} post={post} />;
        })}
      </div>
      <div></div>
    </div>
  );
}
