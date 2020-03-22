import React from "react";
import { Link } from "react-router-dom";

import ButtonPrimary from "components/StyledButtons/ButtonPrimary";

const Landing = () => {
  return (
    <div className="container">
      <h1 className="color-grey center">
        La page que vous cherchez n'existe pas
      </h1>

      <Link to="home">
        <ButtonPrimary>Accueil</ButtonPrimary>
      </Link>
    </div>
  );
};

export default Landing;
