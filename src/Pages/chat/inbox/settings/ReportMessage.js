import { React, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import CancelIcon from "@mui/icons-material/Cancel";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AlertFill from "../../assets/AlertFill.png";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Uncheck from "../../assets/Uncheck.svg";
import CheckRadio from "../../assets/checkRadio.svg";
import DoneSubmitBtn from "../../assets/Done.png";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function ReportMessage(props) {
  const reportText = [
    {
      text: "It’s spam",
    },
    {
      text: "Scam or fraud",
    },
    {
      text: "Hate speech or symbols",
    },
    {
      text: "Sale of illegal or regulated goods",
    },
    {
      text: "Nudity or sexual activity",
    },
    {
      text: "False Identity",
    },
    {
      text: "I just don’t like it",
    },
  ];
  const setValuesFunc = (item, index) => {
    setValuesSaved(item);
    setIndexx(index);
  };
  const [indexRadio, setIndexx] = useState(0);
  const [RadioValues, setValuesSaved] = useState(reportText[0].text);
  const [open, setOpen] = useState(true);
  const [Submit, setSubmit] = useState(false);

  const onsubmit = () => {
    setSubmit(true);
  };
  const handleClose = () => {
    setOpen(false);
    props.close(false);
  };
  
  return (
    <div>
      {" "}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <div class="scrollbar scrollbar-lady-lips">
          {Submit ? (
            <div className="DoneSubmit">
              <div class="force-overflow donee">
                <div className="lelel tittlwee">
                  <img src={DoneSubmitBtn} />
                </div>
                <div className="detailss">
                  <h5>Report has been submitted.</h5>
                </div>

                <div className="BtnsBoth">
                <button
                    className="Submitbtn"
                    onClick={() => {
                        handleClose();
                      }}
                  >
                    Done
                  </button>
                </div>
              </div>{" "}
            </div>
          ) : (
            <div class="force-overflow report">
              <div className="lelel tittlwee report">
                <span className="imgaes">
                  <img src={AlertFill} />
                </span>
                <span className="textInfo">
                  <h5>Select a problem to report</h5>
                  <p>
                    Send recent messages from this conversation to Salon
                    Substitute for review
                  </p>
                </span>
              </div>
              <div className="detailss">
                <div className="Radiobtns">
                  {reportText.map((item, index) => {
                    return (
                      <>
                        <div className="radioFlex">
                          {indexRadio === index ? (
                            <span className="radiochck">
                              <img src={CheckRadio}></img>
                            </span>
                          ) : (
                            <span
                              className="radiochck"
                              onClick={() => {
                                setValuesFunc(item.text, index);
                              }}
                            >
                              <img src={Uncheck}></img>
                            </span>
                          )}
                          <span>
                            <p>{item.text}</p>
                          </span>
                        </div>
                      </>
                    );
                  })}
                </div>

                <span className="btnSubmit">
                  <button
                    className="Submitbtn"
                    onClick={() => {
                      onsubmit();
                    }}
                  >
                    Submit
                  </button>
                </span>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default ReportMessage;
