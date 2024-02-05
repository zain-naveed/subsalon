import React, { useState, useEffect } from "react";
import { Vector, Anyfile } from "../../Assets/index";
import { ValidateImageOrPdf } from "../../Shared";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useSelector } from "react-redux";
function InquiryUpload({
  filesArr,
  setFilesArr,
  removeArrImg,
  setRemoveArrImg,
  handleImages,
  images,
  setImages,
}) {
  const {
    user: { user, status, tokens },
  } = useSelector((state) => state.root);
  // const [imagesState, setImagesState] = useState([]);
  // const [images, setImages] = useState(user?.experience?.certificationImgs ? user?.experience?.certificationImgs:  []);

  const copyImag = [...images];

  
  const handleMultiImages = (evnt) => {
    const selectedFiles = [];
    let cloneImages = [...images];
    let cloneFiles = [...filesArr];
    let file = evnt.target.files[0];
    if (file) {
      ValidateImageOrPdf(file, (resp, type) => {
        if (resp) {
          if (type === "img") {
            let url = URL.createObjectURL(file);
            cloneImages.push(url);
            // return URL.revokeObjectURL(url)
          } else if (type == "pdf") {
            cloneImages.push(Anyfile);
            
          }
          cloneFiles.push(resp);
          setFilesArr(cloneFiles);
          setImages(cloneImages);
          evnt.target.value = "";
        }
      });
    }
    

    //
    // const targetFiles = evnt.target.files;
    // // 
    // // let ImagesArr = Array.prototype.slice.call(targetFiles);
    // // 

    // if (imagesState.length > 0) {
    //   let temp = [...imagesState];
    //   // let TempArr = temp.concat(ImagesArr);
    //   // SettingUpURL(TempArr, selectedFiles);
    //   // setImagesState(TempArr);
    // } else {
    //   // let temp = [];
    //   // let TempArr = temp.concat(ImagesArr);
    //   // setImagesState(TempArr);
    //   // SettingUpURL(TempArr, selectedFiles);
    // }
    // const targetFilesObject = [...targetFiles];
  };

  function SettingUpURL(imagesState, selectedFiles) {
    for (let i = 0; i < imagesState.length; i++) {
      if (
        imagesState[i].name.split(".").pop() == "pdf" ||
        imagesState[i].name.split(".").pop() == "docx"
      ) {
        selectedFiles.push(Anyfile);
      } else {
        selectedFiles.push(URL.createObjectURL(imagesState[i]));
      }
    }
    setImages(selectedFiles);
    handleImages(imagesState, selectedFiles);
    
  }

  function Delete(e, id) {
    // let temp = [...imagesState];
    // temp.splice(id, 1);
    // setImagesState(temp);
    // for the backend given exactly imgs

    let cloneFiles = [...filesArr];
    cloneFiles.splice(id, 1);
    setFilesArr(cloneFiles);
    let temp1 = [...images];
    //for the backend removing urls

    let removeImageUrl = [...removeArrImg];
    removeImageUrl.push(temp1[id]);
    setRemoveArrImg(removeImageUrl);
    //for the frontend removing imgs

    temp1.splice(id, 1);
    setImages(temp1);
  }
  // useEffect(() => {
  //   setImages && setImages(user?.experience?.certificationImgs ? user?.experience?.certificationImgs : [])
  // }, [user?.experience?.certificationImgs ? user?.experience?.certificationImgs : ""])

  return (
    <>
      <div className="form-group my-3 mx-3">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <div>
            <h1 className='headingSection'>Additional Certificates</h1>
            <h5 className="headingFile">Supported Formats PDF, PNG, JPEG</h5>
          </div> */}
          <div>
            <label
              htmlFor={`image`}
              // className="spaace"
              // className="label_inquiry"
              style={{
                cursor: "pointer",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#FFFFFF",
                border: "1px dashed #D0D0D0",
                borderRadius: "4px",
              }}
            >
              <span className="uploadParent">
                <span className="uploadBtn">+</span>
              </span>
            </label>
            <input
              type="file"
              id={`image`}
              name={`image`}
              style={{ display: "none" }}
              accept="images/*"
              onChange={(e) => handleMultiImages(e)}
              multiple
            />
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }} className="backImges_side">
        {images?.length > 0 && images ? (
          images?.map((url, id) => {
            return (
              <div style={{ height: "50px", display: "flex" }}>
                <img
                  src={url.includes(".pdf") ? Anyfile : url}
                  style={{ height: "50px", width: "50px" }}
                />
                <button className="delete-div" onClick={(e) => Delete(e, id)}>
                  <RiDeleteBin7Line style={{ color: "#FA4949" }} />
                </button>
              </div>
            );
          })
        ) : (
          <div
            className="toBeAdded"
            style={{ margin: "0 auto", paddingTop: "5%" }}
          >
            No certificate added yet!
          </div>
        )}
      </div>
    </>
  );
}
export default InquiryUpload;
