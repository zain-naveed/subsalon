import { React, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import CancelIcon from "@mui/icons-material/Cancel";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Deletepop from "../../assets/deletepopUp.png";
// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

// const BootstrapDialogTitle = (props) => {
//   const { children, onClose, ...other } = props;

//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: "absolute",
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// };

// BootstrapDialogTitle.propTypes = {
//   children: PropTypes.node,
//   onClose: PropTypes.func.isRequired,
// };

function DeleteMessage({loader,setLoader,del}) {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    setLoader(false)
    // props.close(false);
  };
  const handleDel = ()=>{
    setOpen(false);
    setLoader(false)
    del()
    // props.close(false);

  }
  return (
    <div>
      {" "}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={loader}
      >
        <IconButton aria-label="close" onClick={handleClose}>
          <CancelIcon />
        </IconButton>
        <div class="scrollbar scrollbar-lady-lips">
          <div class="force-overflow">
            <div className="lelel tittlwee">
              <img src={Deletepop} />
            </div>
            <div className="detailss">
              <h4>
                Are you sure that you want to permanently delete this message?
              </h4>
            </div>

            <div className="BtnsBoth">
              <button className="boton cncle" onClick={handleClose} >Cancel</button>
              <button className="boton deletee" onClick={handleDel} >Delete Message</button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default DeleteMessage;
