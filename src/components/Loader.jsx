import React from "react";

const Loader = ({ loading, render }) => {
  //console.log("loading : " + loading);
  if (loading)
    return (
      <lottie-player
        src="https://assets6.lottiefiles.com/datafiles/konH7J07oCfp1tL/data.json"
        background="transparent"
        speed="1"
        autoplay
      ></lottie-player>
    );
  return render;
};

export default Loader;
