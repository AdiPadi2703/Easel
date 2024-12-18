"use client";

import React from "react";
import { FaComment } from "react-icons/fa";
import ReactionForm from "./ReactionForm";
import { AiFillDelete } from "react-icons/ai";
import { useAuth } from "@clerk/nextjs";
import { IoClose } from "react-icons/io5";
import { delete_post_action } from "../../../server/actions";
import { useRouter } from "next/navigation";
import { RiFileEditFill } from "react-icons/ri";

export default function PostNavigation(props) {
  const { userId } = useAuth();
  const [delete_prompt, setDeletePrompt] = React.useState(false);
  const [isLoading, startTransition] = React.useTransition();
  const router = useRouter();

  function redirectHandler() {
    startTransition(() => {
      router.back();
    });
  }

  async function deletePostHandler() {
    await delete_post_action(props.postId);
    setDeletePrompt(false);
    redirectHandler();
  }

  return (
    <div className="navigation">
      <ul>
        <li>
          <ReactionForm postId={props.postId} reactions={props.reactions} />
        </li>

        {userId === props.metadata.user_id ? (
          <li onClick={() => setDeletePrompt(true)}>
            <button className="nav-button">
              <AiFillDelete className="nav-icon" />
            </button>
          </li>
        ) : null}
        <li onClick={() => props.description_control(true)}>
          <button className="nav-button">
            <RiFileEditFill className="nav-icon" />
          </button>
        </li>

        <li onClick={() => props.comment_control(true)}>
          <button className="nav-button">
            <FaComment className="nav-icon" />
          </button>
        </li>
      </ul>
      {delete_prompt ? (
        <div className="overlay-delete-prompt">
          <div className="delete-prompt-box">
            <button
              onClick={() => setDeletePrompt(false)}
              className="delete-prompt-exit-button"
            >
              <IoClose style={{ fontSize: "30" }} />
            </button>
            <p style={{ padding: "20px", textAlign: "center", color: "red" }}>
              Are you sure? This action cannot be reversed!
            </p>
            <button
              className="delete-prompt-button"
              onClick={deletePostHandler}
            >
              Delete Post
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
