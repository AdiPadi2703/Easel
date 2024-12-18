import { IoIosSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import React from "react";

export default function Comments(props) {
  return (
    <div className="comments">
      <div className="comments-header">
        <p>Comments</p>
        <IoClose
          className="nav-icon"
          onClick={() => {
            props.comment_close_control(false);
          }}
        />
      </div>
      <div className="create-comment">
        <form>
          <input placeholder="Write a comment..." className="comment-input" />
          <button type="submit">
            <div className="send-icon">
              <IoIosSend />
            </div>
          </button>
        </form>
      </div>

      <ul className="comment-list">
        {props.comments.map((comment, index) => (
          <li key={index}>
            <div className="comment">
              <div className="user-icon-container">
                <div className="comment-user-icon">{comment.username[0]}</div>
              </div>
              <div className="comment-username">{comment.username}</div>
              <div className="comment-text">{comment.comment}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
