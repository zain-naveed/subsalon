import React, { useState, useEffect } from "react";
import { Vector, Anyfile } from "../../../Assets/index";
import { ValidateImageOrPdf } from "../../../Shared";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { display } from "@mui/system";
import { roleEnum, toastMessage } from "../../../Shared";


function MediaUpload({
  filesArr,
  setFilesArr,
  removeArrImg,
  setRemoveArrImg,
  handleImages,
  images,
  setImages,
  check,
}) {
  
  // 
  const {
    user: { user, status, tokens },
  } = useSelector((state) => state.root);
  const [imagesState, setImagesState] = useState([]);
  // const [images, setImages] = useState(user?.experience?.certificationImgs ? user?.experience?.certificationImgs:  []);

  const handleMultipleImages = (evnt) => {
    if(evnt.target.files[0].size < 2097152){

    const selectedFiles = [];
    let cloneImages = [...images];
    let cloneFiles = [...filesArr];
    let file = evnt.target.files[0];
    if (file) {
      ValidateImageOrPdf(file, (resp, type) => {
        if (resp) {
          if (type == "img") {
            let url = URL.createObjectURL(resp);
            cloneImages.push(url);
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
  }
  else{
    toastMessage("error", "Add image max 2mb");

  }

 
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

  function Delete(e, id, url) {


    let temp1 = [...images];
    let findIndxPath = "";
    if (user.role == "professional") {
      findIndxPath = temp1
        .filter(
          (ii) =>
            !ii.includes(
              "https://subsalon-dev.s3.us-west-1.amazonaws.com/expereience/"
            )
        )
        .findIndex((ii) => ii == url);
    } else {
      findIndxPath = temp1
        .filter(
          (ii) =>
            !ii.includes(
              "https://subsalon-dev.s3.us-west-1.amazonaws.com/saloon/"
            )
        )
        .findIndex((ii) => ii == url);
    }

    
    let cloneFiles = [...filesArr];
    if (findIndxPath > -1) {
      cloneFiles.splice(findIndxPath, 1);
    } else {
      cloneFiles.splice(id, 1);
    }
    setFilesArr(cloneFiles);
    //  let MergeArr =  user?.experience?.certificationImgs ? user?.experience?.certificationImgs.concat(images):images

    //for the backend removing urls
    let removeImageUrl = [...removeArrImg];
    removeImageUrl.push(temp1[id]);
    if (setRemoveArrImg) {
      setRemoveArrImg(removeImageUrl);
    }
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
          <div style={check ? { marginLeft: "-14px" } : {}}>
            <h1 className="headingSection">
              {check
                ? "Accreditations & Awards of the Salon"
                : "Additional Certificates"}
            </h1>
            {/* <h5 className="headingFile">Supported Formats PDF, PNG, JPEG</h5> */}
          </div>
          <div style={check ? { marginRight: "-18px" } : {}}>
            <label
              htmlFor={`image`}
              className="spaace"
              style={{ cursor: "pointer" }}
            >
              <span className="">
                <span className="btn btnUpload">Upload</span>
              </span>
            </label>
            <input
              type="file"
              id={`image`}
              name={`image`}
              style={{ display: "none" }}
              accept="images/*"
              onChange={handleMultipleImages}
              multiple
            />
          </div>
        </div>
      </div>
      <div
        style={
          user?.role === "owner" && images.length > 4
            ? { display: "flex", overflowX: "scroll" }
            : user?.role === "professional" && images.length > 6
            ? { display: "flex", overflowX: "scroll" }
            : { display: "flex", overflowX: "hidden" }
        }
        className={check ? "imgBack imgBacking" : "imgBack"}
      >
        {images?.length > 0 && images ? (
          images?.map((url, id) => {
            return (
              <div className="image-item" style={{ marginRight: "25px" }}>
                <img
                  style={{
                    width: "100px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                  src={url.includes(".pdf") ? Anyfile : url}
                />
                <button
                  className="btn btnDelete"
                  onClick={(e) => Delete(e, id, url)}
                >
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
export default MediaUpload;
