import React, { useState } from 'react';
import { Avatar, Upload } from "../../../../Assets/index"
import "../../profile.css";

const ImgPrev = () => {
  const [{ alt, src }, setImg] = useState({
    src: Avatar,
    alt: 'Upload an Image'
  });

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name
      });
    }
  }

  return (
    <form encType="multipart/form-data">
      <div className="form__img-input-container">
        <input
          type="file"
          accept=".png, .jpg, .jpeg, .svg"
          id="photo"
          className="visually-hidden"
          onChange={handleImg}
        />
        <label htmlFor="photo" className="form-img__file-label">
        </label>
        <img src={src} alt={alt} className="form-img__img-preview" />
      </div>
    </form>
  );
}

export default ImgPrev;