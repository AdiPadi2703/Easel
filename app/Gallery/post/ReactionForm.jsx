"use client";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import React from "react";
import { add_like_action, remove_like_action } from "../../../server/actions";
import { useAuth } from "@clerk/nextjs";

export default function ReactionForm(props) {
  const { isLoaded, userId } = useAuth();
  const [show_reaction_count, setShowReactionCount] = React.useState(false);
  const [current_reaction_state, setCurrentReactionState] = React.useState({
    reaction_count: props.reactions.length,
    has_reacted: props.reactions
      .map((reaction) => {
        return reaction.user_id === userId ? true : false;
      })
      .includes(true),
  });

  const [optimistic_reaction_state, changeOptimisticReactionState] =
    React.useOptimistic(
      current_reaction_state,
      (current_state, optimistic_value) => {
        return {
          reaction_count: current_state.has_reacted
            ? current_state.reaction_count - 1
            : current_state.reaction_count + 1,
          has_reacted: !current_state.has_reacted,
        };
      }
    );

  async function reactionHandler() {
    changeOptimisticReactionState("");

    if (current_reaction_state.has_reacted) {
      const response = await remove_like_action(props.postId);
      if (!response.success) {
        props.deletion_control(true);
      }
    } else {
      const timestamp = new Date().toISOString();
      const response = await add_like_action(props.postId, timestamp);
      if (!response.success) {
        props.deletion_control(true);
      }
    }

    setCurrentReactionState((current_state) => ({
      reaction_count: current_state.has_reacted
        ? current_state.reaction_count - 1
        : current_state.reaction_count + 1,
      has_reacted: !current_state.has_reacted,
    }));
  }

  return (
    <form action={reactionHandler}>
      <button
        className="nav-button"
        style={{ paddingTop: "8px" }}
        onMouseOver={() => setShowReactionCount(true)}
        onMouseLeave={() => setShowReactionCount(false)}
      >
        <div>
          {!show_reaction_count ? (
            <div>
              {current_reaction_state.has_reacted ||
              optimistic_reaction_state.has_reacted ? (
                <AiFillLike className="nav-icon" />
              ) : (
                <AiOutlineLike className="nav-icon" />
              )}
            </div>
          ) : (
            optimistic_reaction_state.reaction_count
          )}
        </div>
      </button>
    </form>
  );
}
