import React from "react";
import { format } from "timeago.js";

export default function Comment({ comment }) {
  return (
    <div className="posts__post-comments-comment">
      <div className="posts__post-comments-comment-user">
        <div className="posts__post-comments-comment-user-img">
          <img src={comment.commentBy.picture} alt="" />
        </div>
        <div className="posts__post-comments-comment-user-name">
          <h6>
            {comment.commentBy.first_name} {comment.commentBy.last_name}
          </h6>
          <span>{format(comment.commentAt)}</span>
        </div>
      </div>
      <div className="posts__post-comments-comment-text">
        {comment.comment && (
          <div className="posts__post-comments-comment-textContent">
            {comment.comment}
          </div>
        )}
        {comment.image && <img src={comment.image} alt="" />}
      </div>
    </div>
  );
}
