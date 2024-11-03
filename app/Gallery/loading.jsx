import React from "react";
import { FaCircle } from "react-icons/fa";
import "./loading.css";

function Loading() {
  return (
    <div className="loading-icon">
      <h2>Fetching from database...</h2>
      <FaCircle className="loading-circle" />
    </div>
  );
}

export default Loading;
