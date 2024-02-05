import React, { useEffect } from 'react'
import { ChatUser,user as avatar } from '../../../Assets'
import Image from '../assets/Image.svg'
import moment from 'moment'
import { useSelector } from 'react-redux'
function SidebarItem({item,refreshSidebar,setRefreshSidebar}) {
    
    const { user } =  useSelector(state=> state.root)
    let changeUser = item?.members?.find(ii=> ii?._id != user?.user?._id);
    let sameUser = item?.members?.find(ii=> ii?._id == user?.user?._id);
    let msgPin = item?.senderId !=  user?.user?._id && item?.hasRead ? true:false
    
useEffect(()=>{
    setRefreshSidebar(true)
},[refreshSidebar])
    return (
       
             <div class="chat-item flex sb center">
                 <div class="chat-dp ava">
                     <img src={changeUser?.saloon && changeUser?.saloon?.avatar ? changeUser?.saloon?.avatar : changeUser?.profilePic ? changeUser?.profilePic:  avatar} alt="" />
                 </div>
                 <div class="chat-sender">
                     <div class="sender-name flex sb">
                         <h5 className={item.isNew ? "boldds":"noBolds"}>{changeUser?.saloon && changeUser?.saloon?.Saloon_name ? changeUser?.saloon?.Saloon_name : changeUser?.name ? changeUser?.name : changeUser?.name}</h5>
                     
                      {
                       refreshSidebar &&  msgPin ? <span className={"newmssgae"}> {moment(item.lastMsgDate).fromNow() }</span>:
                        <span className={"oldmssgae"}> {moment(item.lastMsgDate).fromNow() }</span>
                      }
                    
                         
                     </div>
                     {
                        refreshSidebar &&  <div class="sender-text flex sb">
                        <p>{item?.lastMsg ? item?.lastMsg : item?.lastMsgDate ? <span><img src={Image}></img>Photo</span>:""}</p>
                      
                        {
                           msgPin  ? <span class="total-sms1"></span>:""
                        }
                        
                    </div>
                     }
                    
                 </div>
             </div>
         
    )
}

export default SidebarItem
