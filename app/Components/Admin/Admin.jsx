import React from "react";
import Dropzone from "./Dropzone";
import "./Admin.css";

function Admin() {
  return (
    <div className="admin-form">
      <h1>Admin</h1>
      <div className="admin-box">
        <Dropzone />
      </div>
    </div>
  );
}

export default Admin;
