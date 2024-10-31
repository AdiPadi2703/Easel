"use client";
import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { MdOutlineFileUpload } from "react-icons/md";
import "./Admin.css";

function Admin() {
  return (
    <div className="admin-form">
      <h1>Admin</h1>
      <div className="admin-box">
        <CldUploadWidget signatureEndpoint="/api/sign-cloudinary-params">
          {({ open }) => {
            return (
              <button onClick={() => open()}>
                <MdOutlineFileUpload />
                Upload Image
              </button>
            );
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
}

export default Admin;
