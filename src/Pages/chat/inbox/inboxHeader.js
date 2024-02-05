import { React } from "react";
import { ChatUser,user as avatar } from "../../../Assets";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import DeleteMessage from "./settings/DeleteMessage";
import OpenSettings from "./settings/OpenSettings";
import { useSelector } from 'react-redux'

function InboxHeader({selectUser,setSelectUser,conversation, setCoversation}) {
  const { user}  =  useSelector(state=> state.root)
  let changeUser = selectUser?.members?.find(ii=> ii?._id != user?.user?._id);

  return (
    <div className="inbox-header">
      <div className="flex">
        <ArrowBackIcon className="backIcon removeIcon" />
        <div className="ml-4">
          <img src={changeUser?.saloon && changeUser?.saloon?.avatar ? changeUser?.saloon?.avatar : changeUser?.profilePic ? changeUser?.profilePic:  avatar} className="headerImg" alt="" />
          <span className="chatName">{changeUser?.saloon?.Saloon_name ? changeUser?.saloon?.Saloon_name : changeUser?.name ? changeUser?.name:""}</span>
        </div>
      </div>
      <IconButton aria-label="add an alarm" className="checckedd" size="small">
        <OpenSettings setSelectUser={setSelectUser} selectUser={selectUser} conversation={conversation} setCoversation={setCoversation} />
        
      </IconButton>

    </div>
  );
}

export default InboxHeader;
