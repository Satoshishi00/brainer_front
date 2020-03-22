import React from "react";

const Loader = ({ loading, render }) => {
  //console.log("loading : " + loading);
  if (loading) return <h2>Chargement...</h2>;
  return render;
};

export default Loader;
