import React from "react";
import { DefaulLoader } from "../../../Assets/index";
import Animation from "./Animation";
import "./loader.css";
function Loader() {
  return (
    <div className="loader chatsLoads">
      <div style={{ height: "369px", marginTop: "25vh", position: "fixed" ,textAlign: "center"}}>
        <Animation Pic={DefaulLoader} />
      </div>
    </div>
  );
}

export default Loader;
