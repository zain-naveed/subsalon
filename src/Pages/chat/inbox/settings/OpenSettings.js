import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteMessage from "../settings/DeleteMessage";
import { Img, Filtericon, Banner, Profile } from "../../../../Assets/index";
import {
  AiOutlineMenu,
  AiOutlineUser,
  AiOutlineStar,
  AiOutlineSetting,
} from "react-icons/ai";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Divider from "@mui/material/Divider";
import ReportMessage from "./ReportMessage";
import { deleteConversationService } from "../../../../Shared/Services/conversate.service";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function OpenSettings({
  selectUser,
  setSelectUser,
  conversation,
  setCoversation,
}) {
  const [loader, setLoader] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const { user } = useSelector((state) => state.root);
  
  const navigate = useNavigate();

  const openDelete = () => {
    setLoader(true);
    handleClose()
  };
  const openReport = () => {
    setLoader1(true);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDel = () => {
    
    let changeUser = selectUser?.members?.find(
      (ii) => ii?._id != user?.user?._id
    );

    let obj = {
      user: changeUser?._id,
      date: moment().format("YYYY-MM-DD"),
    };
    
    deleteConversationService(selectUser?._id, obj)
      .then(({ data: { data } }) => {
        let clonConver = [...conversation];
        let matchIndex = clonConver.findIndex(
          (ii) => ii.idInx == selectUser?.idInx
        );
        clonConver.splice(matchIndex, 1);
        setCoversation(clonConver);
        setSelectUser(null);
      })
      .catch((err) => {
        
      });
  };
  let changeUser = selectUser?.members?.find(
    (ii) => ii?._id != user?.user?._id
  );
  
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon className="setting" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        className="maybeSettings"
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {changeUser?.saloon ? (
          <Link to="/salonDetail" state={{ state: changeUser?.saloon }}>
            <MenuItem>
              {" "}
              <PersonOutlineOutlinedIcon className="spaceing" />
              View Profile
            </MenuItem>
          </Link>
        ) : (
          <MenuItem
            onClick={() => {
              navigate(`/candidate/${changeUser?._id}`);
            }}
          >
            {" "}
            <PersonOutlineOutlinedIcon className="spaceing" />
            View Profile
          </MenuItem>
        )}

        <Divider />
        {selectUser?._id ? (
          <>
            <MenuItem onClick={openReport}>
              <ReportProblemOutlinedIcon className="spaceing" />
              Report
            </MenuItem>
            <Divider />

            <MenuItem onClick={openDelete} className="deleete">
              <DeleteOutlinedIcon className="spaceing deleete" />
              Delete
            </MenuItem>
          </>
        ) : (
          ""
        )}
      </Menu>
      {loader ? (
        <DeleteMessage loader={loader} setLoader={setLoader} del={handleDel} />
      ) : (
        ""
      )}
      {loader1 ? <ReportMessage close={setLoader1} /> : ""}
    </div>
  );
}

export default OpenSettings;
