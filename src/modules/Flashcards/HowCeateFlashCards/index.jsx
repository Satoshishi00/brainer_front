import React from "react";
import { Link } from "react-router-dom";

import ButtonPrimary from "components/StyledButtons/ButtonPrimary";

const HowCeateFlashCards = () => {
  return (
    <div className="container">
      <h1 className="color-grey">Créer des Flash Cards</h1>

      <div className="qcms-container">
        <Link className="cent_pourcent" to="createFcText">
          <ButtonPrimary>Flash Cards Texte</ButtonPrimary>
        </Link>
        <Link className="cent_pourcent" to="createFcPhoto">
          <ButtonPrimary>Flash Cards Photos</ButtonPrimary>
        </Link>
      </div>
    </div>
  );
};

export default HowCeateFlashCards;
