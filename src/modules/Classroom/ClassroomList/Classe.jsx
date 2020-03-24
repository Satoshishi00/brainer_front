import React from "react";
import { Link } from "react-router-dom";

const Classe = ({ id_classe, name }) => {
  console.log("name = " + name);
  return (
    <Link className="card-container" to={"classe/" + id_classe}>
      <h3>{name}</h3>
    </Link>
  );
};

export default Classe;
