import { toastMessage } from "../index";
const ValidateImageOrPdf = (file, callback) => {
  

  const arr = [];

  if (Object.keys(file).length > 1) {
    if (file) {
      Object.keys(file).forEach((key) => {
        if (
          file[key]?.type?.includes("png") ||
          file[key]?.type?.includes("jpeg")
        ) {
          arr.push(file[key]);
        } else if (file[key]?.type?.includes("pdf")) {
          // callback(files, "pdf");
          arr.push(file);
        } else {
          toastMessage("error", "Supported Formats PDF, PNG, JPEG");
          callback(false);
        }
        // arr.push(file[key])
      });
      callback(arr, "");
    }
  } else {
    if (file?.type?.includes("png") || file?.type?.includes("jpeg")) {
      callback(file, "img");
    } else if (file?.type?.includes("pdf")) {
      callback(file, "pdf");
    } else {
      toastMessage("error", "Supported Formats PDF, PNG, JPEG");
      callback(false);
    }
  }
  
};

export { ValidateImageOrPdf };
