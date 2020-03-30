import React from "react";

const Loader = ({ loading, render }) => {
  //console.log("loading : " + loading);
  if (loading)
    return (
      <lottie-player
        src="https://assets10.lottiefiles.com/datafiles/YVp57opyTyvbbZA/data.json"
        background="transparent"
        speed="1.5"
        loop
        autoplay
      ></lottie-player>
    );
  return render;
};

export default Loader;
