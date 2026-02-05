import React, { useState, ChangeEvent } from "react";

const ImageUploadComponent: React.FC = () => {
  // State to store the selected file and its preview URL
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      // Create a local URL for the file to preview it
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Handle the upload to a backend server
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile); // 'image' is the key expected by the backend

    try {
      // Replace with your backend API endpoint
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Image uploaded successfully!");
        // Handle success (e.g., clear state)
        setSelectedFile(null);
        setPreviewUrl(null);
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred during upload.");
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && (
        <div>
          <h4>Image Preview:</h4>
          <img
            src={previewUrl}
            alt="Preview"
            style={{ maxWidth: "200px", maxHeight: "200px" }}
          />
        </div>
      )}
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload Image
      </button>
    </div>
  );
};

export default ImageUploadComponent;
