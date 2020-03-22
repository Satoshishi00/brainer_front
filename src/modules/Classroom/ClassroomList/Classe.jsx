import React from "react";

const Classe = ({ id_classe, name }) => {
  console.log("name = " + name);
  return (
    <a href={"classe/" + id_classe} className="card-container">
      <h3>{name}</h3>
    </a>
  );
};

export default Classe;
