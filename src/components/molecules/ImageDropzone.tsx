import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
interface MyDropzoneProps {
  value: File | null;
  onChange: (file: File | null) => void;
}
const ImageDropzone: React.FC<MyDropzoneProps> = ({ value, onChange }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] ?? null;
      onChange(file);
    },
    [onChange],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [], "image/gif": [] },
    multiple: false,
  });
  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      {" "}
      <input {...getInputProps()} />{" "}
      {isDragActive ? (
        <p>Drop the image file here ...</p>
      ) : value ? (
        <p>Selected file: {value.name}</p>
      ) : (
        <p>Drag & drop an image file here, or click to select</p>
      )}{" "}
    </div>
  );
};
export default ImageDropzone;
