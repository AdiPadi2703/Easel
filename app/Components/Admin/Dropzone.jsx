"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineFileUpload } from "react-icons/md";
import { CldUploadWidget } from "next-cloudinary";

import Image from "next/image";

function Dropzone(props) {
  const [files, setFiles] = React.useState([]);
  const [rejected, setRejected] = React.useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1024,
    onDrop,
  });

  React.useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  async function uploadToCloud(event) {
    event.preventDefault();

    if (!files?.length) {
      return;
    }

    const response = await fetch("/api/sign-cloudinary-params", {
      method: "POST",
    });
    const { signature, timestamp } = await response.json();

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));
    formData.append("upload_preset", "easel_images");
    formData.append("timestamp", timestamp);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    formData.append(
      "cloud_name",
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    );

    const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
    const data = await fetch(URL, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    console.log(data);
  }

  return (
    <form className="drop-form" onSubmit={uploadToCloud}>
      <div
        {...getRootProps({
          className: props.className,
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>
            <MdOutlineFileUpload className="upload-icon" />
            <br />
            Drop the files here ...
            <br />
            <br />
          </p>
        ) : (
          <p>
            <MdOutlineFileUpload className="upload-icon" />
            <br />
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>

      <div className="button">
        <button type="button" onClick={removeAll}>
          Remove All Files
        </button>
      </div>
      <div className="button">
        <button type="submit">Upload</button>
      </div>

      <div className="upload-list" style={{ color: "white" }}>
        <h3 style={{ fontWeight: "200" }}>Accepted Files:</h3>
        <ul>
          {files.map((file) => (
            <li key={file.name}>
              {file.name}
              <br />
              <Image
                src={file.preview}
                height={100}
                width={100}
                alt={file.name}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
              ></Image>
              <br />
              <div className="button">
                <button type="button" onClick={() => removeFile(file.name)}>
                  Remove File
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="rejected-files"
        style={{ color: "white", textAlign: "center" }}
      >
        <h3 style={{ fontWeight: "200" }}>Rejected Files:</h3>
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
              <button type="button" onClick={() => removeRejected(file.name)}>
                Remove File
              </button>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}

export default Dropzone;
