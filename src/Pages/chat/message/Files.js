import React, { useState, useEffect } from "react";
import { Vector, Anyfile } from "../../../Assets/index";
import { ValidateImageOrPdf } from "../../../Shared";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import File from "../assets/File.svg";
import { Spinner } from "react-bootstrap";
import { getImageServices } from "../../../Shared/Services/imageService";
import set from "date-fns/esm/set/index";

function Files({
  filesArr,
  setFilesArr,
  removeArrImg,
  setRemoveArrImg,
  handleImages,
  images,
  setImages,
  check,
  imagesLocation,
  setImagesLocation,
  bool,
  loood,
  setLood,
}) {
  const [loader, setLoader] = useState(false);
  
  // 
  const {
    user: { user, status, tokens },
  } = useSelector((state) => state.root);
  const [imagesState, setImagesState] = useState([]);
  // const [images, setImages] = useState(user?.experience?.certificationImgs ? user?.experience?.certificationImgs:  []);
  let cheeeckss = [];
  const handleMultipleImages = (evnt) => {
    const selectedFiles = [];
    let cloneImages = [...images];
    let cloneFiles = [...filesArr];
    let CloneURL = [...imagesLocation];
    
    if (evnt.target.files.length > 1) {
      let file = evnt.target.files;
      if (file) {
        ValidateImageOrPdf(file, (resp, type) => {
          if (resp) {
            setLood(true);
            setLoader(true);
            
            resp.map((itemss) => {
              
              if (itemss.type.includes("png") || itemss.type.includes("jpeg")) {
                
                let url = URL.createObjectURL(itemss);
                cloneImages.push(url);
              } else if (itemss.type == "pdf") {
                cloneImages.push(itemss);
              }
            });
            let obj = {
              img: resp,
            };
            setLoader(true);
            getImageServices(obj)
              .then(({ data: { data } }) => {
                setLoader(false);
                setLood(false);
                
                CloneURL.push(data.Location);
                setImagesState.push(data.Location);
              })
              .catch((e) => {});

            cloneFiles.push(resp);

            setFilesArr(cloneFiles);
            setImages(cloneImages);
            evnt.target.value = "";
          }
        });
      }
      setImagesLocation(CloneURL);
    } else {
      let file = evnt.target.files[0];
      if (file) {
        ValidateImageOrPdf(file, (resp, type) => {
          if (resp) {
            setLood(true);
            setLoader(true);
            if (type == "img") {
              let url = URL.createObjectURL(resp);
              cloneImages.push(url);
            } else if (type == "pdf") {
              cloneImages.push(Anyfile);
            }
            let obj = {
              img: file,
            };
            setLoader(true);
            getImageServices(obj)
              .then(({ data: { data } }) => {
                setLoader(false);
                setLood(false);
                
                CloneURL.push(data.Location);
                setImagesState.push(data.Location);
              })
              .catch((e) => {});
            cloneFiles.push(resp);
            setFilesArr(cloneFiles);
            setImages(cloneImages);
            evnt.target.value = "";
          }
        });
      }
      setImagesLocation(CloneURL);
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
    let CloneURL = [...imagesLocation];

    
    

    // let temp = [...imagesState];
    // temp.splice(id, 1);
    // setImagesState(temp);
    // for the backend given exactly imgs

    let temp1 = [...images];
    let findIndxPath = temp1
      .filter(
        (ii) =>
          !ii.includes(
            "https://subsalon-dev.s3.us-west-1.amazonaws.com/expereience/"
          )
      )
      .findIndex((ii) => ii == url);
    
    let cloneFiles = [...filesArr];
    if (findIndxPath > -1) {
      cloneFiles.splice(findIndxPath, 1);
      CloneURL.splice(id, 1);
    } else {
      cloneFiles.splice(id, 1);
      CloneURL.splice(id, 1);
    }
    setImagesLocation(CloneURL);
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
          <div>
            <label
              htmlFor={`image`}
              className="spaace"
              style={{ cursor: "pointer" }}
            >
              <span className="">
                <span className="btn">
                  <img src={File} />
                </span>
              </span>
            </label>
            <input
              type="file"
              id={`image`}
              name={`image`}
              style={{ display: "none" }}
              accept="images/*"
              onChange={handleMultipleImages}
              multiple="multiple"
            />
          </div>
        </div>
      </div>
      {images?.length > 0 ? (
        <div style={{ display: "flex" }} className="imgsOnChat">
          {images
            ? images?.map((url, id) => {
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
                    {loader && images.length - 1 == id ? (
                      <Spinner
                        style={{
                          display: "flex",
                          marginLeft: "-93px",
                          marginTop: "39px",
                          marginRight: "35px",
                        }}
                        animation="border"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : (
                      ""
                    )}
                    {!loader || images.length - 1 != id ? (
                      <button
                        className="btn btnDelete"
                        style={{ marginLeft: "-38px" }}
                        onClick={(e) => Delete(e, id, url)}
                      >
                        <RiDeleteBin7Line style={{ color: "#FA4949" }} />
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })
            : ""}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export default Files;
