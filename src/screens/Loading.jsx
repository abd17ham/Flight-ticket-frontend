import React from "react";
import loading from "../assets/loading1 (1).gif";

import "../css/screens/Loading.css";
const Loading = () => {
  return (
    <div className="loading-container">
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Loading;
