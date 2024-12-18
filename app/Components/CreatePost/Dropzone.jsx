"use client";
import React from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import "./Dropzone.css";
import Image from "next/image";
import { create_post_action } from "../../../server/actions";

function Dropzone() {
  const [blob, setBlob] = React.useState(null);
  const [success, setSuccess] = React.useState(0);
  const [file, setFile] = React.useState(null);
  const [rejected, setRejected] = React.useState([]);
  const [description, setDescription] = React.useState("");

  const onDrop = React.useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      const newFile = acceptedFiles[0];
      setFile(
        Object.assign(newFile, { preview: URL.createObjectURL(newFile) })
      );
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }

    setSuccess(0);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1024,
    onDrop,
  });

  React.useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  const removeFile = () => {
    if (file) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
    setRejected([]);
  };

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  function successMessageRender() {
    if (success === 0) {
      return null;
    } else if (success === 1) {
      return (
        <div className="upload-loading-icon">
          <h3 style={{ fontSize: "18px", fontWeight: "200" }}>
            Creating Post...
          </h3>
          <FaCircle className="upload-loading-circle" />
        </div>
      );
    } else if (success == 2) {
      return (
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: "200" }}>
            Post Created Successfully!
          </h3>
        </div>
      );
    }
  }

  async function uploadToBlob(event) {
    event.preventDefault();
    if (file) {
      setSuccess(1);

      const response = await fetch(
        `/api/sign-vercel-blob-params?filename=${file.name}`,
        {
          method: "POST",
          body: file,
        }
      );

      const newBlob = await response.json();

      const image_url = newBlob.url;
      const timestamp = new Date().toISOString();

      await create_post_action(image_url, description, timestamp);

      setBlob(newBlob);
      setSuccess(2);
      setDescription("");
      removeFile();
    } else {
      console.log("No file to upload...");
    }
  }

  return (
    <form className="drop-form" onSubmit={uploadToBlob}>
      <div className="description-input">
        <input
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter post description (optional)..."
        />
      </div>

      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="upload-box">
            <MdOutlineFileUpload className="upload-icon" />
            <br />
            Drop the files here ...
          </div>
        ) : (
          <div className="upload-box">
            <MdOutlineFileUpload className="upload-icon" />
            <br />
            Drag 'n' drop your image here, or click to browse
          </div>
        )}
      </div>

      <div className="button">
        {file ? <button type="submit">Create Post</button> : null}
      </div>

      <div className="upload-list">
        {file ? (
          <>
            <p
              style={{
                paddingBottom: "20px",
                fontWeight: "200",
                fontSize: "18px",
              }}
            >
              {file.name}
            </p>

            <Image
              src={file.preview}
              height={200}
              width={150}
              alt={file.name}
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />

            <div className="button" style={{ paddingTop: "20px" }}>
              <button type="button" onClick={() => removeFile(file.name)}>
                Remove File
              </button>
            </div>
          </>
        ) : null}
      </div>

      <div className="rejected-files">
        <ul style={{ listStyle: "none" }}>
          {rejected.map(({ file, errors }) => (
            <li key={file.name}>
              <div>
                <p>{file.name}</p>
                <ul style={{ listStyle: "none", color: "red" }}>
                  {errors.map((error) => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <br />
              <button type="button" onClick={() => removeRejected(file.name)}>
                Remove File
              </button>
            </li>
          ))}
        </ul>
      </div>

      {successMessageRender()}
    </form>
  );
}

export default Dropzone;
