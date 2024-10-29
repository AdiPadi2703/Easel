'use client'
import React from "react";
import { AiFillLike } from "react-icons/ai";
import { TiHeartOutline } from "react-icons/ti";
import { AiFillDislike } from "react-icons/ai";
import { FaRegLaughSquint } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import Comment from "./Comment";

import "./Post.css";

function Post(props) {
  const [react_prompt, setReactPrompt] = React.useState(false);
  const [comment_prompt, setCommentPrompt] = React.useState(false);
  const [view_prompt, setViewPrompt] = React.useState(false);

  const comments = [
    {
      id: 45362,
      username: "bleh1@gmail.com",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: 34253,
      username: "bleh2@gmail.com",
      comment:
        "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
    {
      id: 89375,
      username: "bleh3@gmail.com",
      comment:
        "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 25362,
      username: "bleh4@gmail.com",
      comment:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    },
  ];

  function getPosts() {
    // make get request based on the picture id passed into the props.id
    // store the received messages in the state 'comments' using the update function
    // from the useState hook
  }

  function toggleReactPrompt() {
    setReactPrompt(!react_prompt);
  }

  function toggleCommentPrompt() {
    setCommentPrompt(!comment_prompt);
  }

  function toggleViewPrompt() {
    setViewPrompt(!view_prompt);
  }

  function sendComment() {
    // post request to the database passing the comment information

    return;
  }

  function postRoutesRender() {
    if (react_prompt) {
      return (
        <div className="reaction-box">
          <div className="reaction-list">
            <div className="like">
              <AiFillLike />
            </div>
            <div className="love">
              <TiHeartOutline />
            </div>
            <div className="dislike">
              <AiFillDislike />
            </div>
            <div className="laugh">
              <FaRegLaughSquint />
            </div>
            <div className="close-reactions">
              <IoClose onClick={toggleReactPrompt} />
            </div>
          </div>
          <div className="break"></div>
        </div>
      );
    } else if (comment_prompt) {
      return (
        <div className="comment-box">
          <textarea name="comment" placeholder=" Write your comment..." />
          <IoClose className="close-comment" onClick={toggleCommentPrompt} />
          <IoMdCheckmark className="send-comment" onClick={sendComment} />
        </div>
      );
    } else if (view_prompt) {
      return (
        <div className="view-comment-box">
          <ul className="comment-list">
            {comments.map((comment, index) => {
              return (
                <li key={index}>
                  <Comment 
                    username={comment.username}
                    comment={comment.comment}
                  />
                </li>
              );
            })}
          </ul>

          <IoClose className="close-view" onClick={toggleViewPrompt} />
        </div>
      );
    } else {
      return (
        <div className="buttons">
          <div className="react-button" onClick={toggleReactPrompt}>
            React
          </div>
          <div className="view-button" onClick={toggleViewPrompt}>
            View Comments
          </div>
          <div className="comment-button" onClick={toggleCommentPrompt}>
            Comment
          </div>
        </div>
      );
    }
  }

  return (
    <div className="post">
      <div className="post-box">
        <img className="post-image" src={props.src} draggable={false} />
      </div>
      {postRoutesRender()}
    </div>
  );
}

export default Post;
