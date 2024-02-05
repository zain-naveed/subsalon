import React, { useState } from "react";
import { MdDelete } from "react-icons/md"

import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
import { Upload, Avatar } from "../../../../Assets/index";

function ImageUpload() {
  const [getImg, setImg] = useState({})

  function getImageFileObject(imageFile) {
    setImg(imageFile);
  }
  function runAfterImageDelete(file) {
    
  }

  return (
    <div>

      <div>
        <ImageUploader
          style={{ height: 200, width: 200 }}
          deleteIcon={
            <MdDelete />
          }
          uploadIcon={
            <div className="">
              <img className="imgShadow" src={Upload} />
            </div>
          }
          onFileAdded={(img) => getImageFileObject(img)}
        />
      </div>

    </div>
  );
}

export default ImageUpload;
