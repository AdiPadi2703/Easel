"use client";

import React from "react";
import "./Post.css";
import { IoClose } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { add_comment_action } from "../../../server/actions";
import { useUser } from "@clerk/nextjs";
import PostNavigation from "./PostNavigation";
import { useRouter } from "next/navigation";

export default function Post(props) {
  const [is_wide, setIsWide] = React.useState(false);
  const imageRef = React.useRef(null);
  const { user } = useUser();
  const [comments, setComments] = React.useState(props.comments);
  const [new_comment, setNewComment] = React.useState("");
  const [show_avatar, setShowAvatar] = React.useState(false);
  const [optimistic_comments, addOptimisticComment] = React.useOptimistic(
    comments,
    (current_state, optimistic_value) => [optimistic_value, ...current_state]
  );
  const [open_comments, setOpenComments] = React.useState(false);
  const [open_description, setOpenDescription] = React.useState(false);
  const [isLoading, startTransition] = React.useTransition();
  const router = useRouter();

  React.useEffect(() => {
    const handleImageLoad = () => {
      const image = imageRef.current;
      if (image) {
        setIsWide(image.naturalWidth > image.naturalHeight);
      }
    };

    if (window.innerWidth < 600) {
      setShowAvatar(true);
    } else {
      setShowAvatar(false);
    }

    if (imageRef.current?.complete) {
      handleImageLoad();
    } else {
      imageRef.current?.addEventListener("load", handleImageLoad);
    }

    return () => {
      imageRef.current?.removeEventListener("load", handleImageLoad);
    };
  }, []);

  function redirectHandler(query) {
    startTransition(() => router.push(`/Profiles?username=${query}`));
  }

  async function addComment() {
    if (!user || !new_comment) {
      return;
    }

    addOptimisticComment({
      username: user.username,
      comment: new_comment,
      time_of_comment: new Date().toISOString(),
      user_avatar: user.imageUrl,
    });
    try {
      const timestamp = new Date().toISOString();
      await add_comment_action(props.postId, new_comment, timestamp);
      const created_comment = {
        username: user.username,
        comment: new_comment,
        time_of_comment: timestamp,
        user_avatar: user.imageUrl,
      };
      setComments((prev) => [created_comment, ...prev]);
      setNewComment("");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return (
    <div className="page-container">
      <div className={`post-container-${is_wide ? "wide" : "tall"}`}>
        <div className={`top-bar-${is_wide ? "wide" : "tall"}`}>
          <div className="post-header">
            {show_avatar ? (
              <img
                onClick={() => redirectHandler(props.metadata.username)}
                className="avatar"
                src={props.metadata.user_avatar}
              />
            ) : (
              <p
                className="username"
                onClick={() => redirectHandler(props.metadata.username)}
              >
                {props.metadata.username}
              </p>
            )}

            <p> Created On: {props.metadata.created_at.substring(0, 10)}</p>
          </div>
        </div>
        <div className="post-body">
          <div className="image">
            <img src={props.src} ref={imageRef} draggable="false" />
          </div>
          <div className="post-actions">
            {open_comments ? (
              <div className="comments">
                <div className="comments-header">
                  <p>Comments</p>
                  <IoClose
                    className="nav-button"
                    onClick={() => {
                      setOpenComments(false);
                    }}
                  />
                </div>
                <div className="create-comment">
                  <form action={addComment}>
                    <input
                      placeholder="Write a comment..."
                      className="comment-input"
                      onChange={(event) => setNewComment(event.target.value)}
                    />
                    <button type="submit">
                      <div className="send-icon">
                        <IoIosSend />
                      </div>
                    </button>
                  </form>
                </div>

                <ul className="comment-list">
                  {optimistic_comments.map((comment, index) => (
                    <li key={index}>
                      <div className="comment">
                        <div className="user-icon-container">
                          <img
                            onClick={() => redirectHandler(comment.username)}
                            className="comment-user-avatar"
                            src={comment.user_avatar}
                            draggable="false"
                          />
                        </div>
                        <div className="comment-username">
                          {comment.username}
                        </div>
                        <div className="comment-text">{comment.comment}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : open_description ? (
              <div className="description">
                <div className="description-header">
                  <p style={{ paddingRight: "10px" }}>Description</p>
                  <IoClose
                    className="nav-button"
                    onClick={() => {
                      setOpenDescription(false);
                    }}
                  />
                </div>
                <p className="description-body" style={{ fontWeight: "200" }}>
                  {props.metadata.post_description}
                </p>
              </div>
            ) : (
              <PostNavigation
                postId={props.postId}
                reactions={props.reactions}
                metadata={props.metadata}
                comment_control={setOpenComments}
                description_control={setOpenDescription}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
