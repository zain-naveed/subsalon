
import {io} from "socket.io-client";
import { socketUrl } from '../../Shared/util/constant'
 let socket = io.connect(socketUrl,{transports: ['websocket']});
 const initSocket = ()=>{
    socket = socket.on("connect",()=>{
        
    })
 
}
export {
    socket, 
    initSocket
}
