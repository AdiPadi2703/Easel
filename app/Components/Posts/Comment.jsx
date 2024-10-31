import React from "react";
import "./Comment.css";

function Comment(props) {
  return (
    <div className="comment">
      <div className="username">{props.username}</div>
      <div className="user-comment">{props.comment}</div>
    </div>
  );
}

export default Comment;
