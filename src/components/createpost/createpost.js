import { Button } from "@mui/material";
import React, { useState } from "react";
import firebase from "firebase";
import "./createpost.css";
import { db, storage } from "../../firebase";
import { useSelector } from "react-redux";
const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [img, setImg] = useState("");
  const { user } = useSelector((state) => state.Users);
  const [progress, setProgress] = useState(0);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadtask = storage.ref(`images/${img.name}`).put(img);
    uploadtask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        alert(err.message);
      },
      () => {
        storage
          .ref("images")
          .child(img.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: url,
                userName: user.displayName
            });
            setProgress(0);
            setCaption("");
            setImg(null);
          });
      }
    );
  };
  return (
    <div className="create">

      <progress value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption..."
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default CreatePost;
