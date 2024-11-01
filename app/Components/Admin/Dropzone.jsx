"use client";
import React from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineFileUpload } from "react-icons/md";
import "./Dropzone.css";
import Image from "next/image";

function Dropzone() {
  const [blob, setBlob] = React.useState(null);

  const [files, setFiles] = React.useState([]);
  const [rejected, setRejected] = React.useState([]);

  const onDrop = React.useCallback((acceptedFiles, rejectedFiles) => {
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

  async function uploadToBlob(event) {
    event.preventDefault();
    if (files?.length) {
      const file = files[0];
      const response = await fetch(
        `/api/sign-vercel-blob-params?filename=${file.name}`,
        {
          method: "POST",
          body: file,
        }
      );

      const newBlob = await response.json();
      setBlob(newBlob);
    } else {
      console.log("No files to upload...");
    }
  }

  return (
    <form className="drop-form" onSubmit={uploadToBlob}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="upload-box">
            <MdOutlineFileUpload className="upload-icon" />
            <br />
            Drop the files here ...
            <br />
            <br />
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
        <button type="button" onClick={removeAll}>
          Remove All Files
        </button>
      </div>
      <div className="button">
        <button type="submit">Upload</button>
      </div>

      <div className="upload-list">
        <h3 style={{ fontWeight: "200" }}>Accepted Files:</h3>
        <ul style={{ listStyle: "none" }}>
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

      <div className="rejected-files">
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
