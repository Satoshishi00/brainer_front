import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";

import StyledContainerInput from "components/ContainerInput";
import ButtonPrimary from "components/StyledButtons/ButtonPrimary";
import CustomInput from "components/CustomInput";

const Missing = () => {
  const [username, setUsername] = useState("");

  const update = useCallback(
    (e, { name, value }) => {
      switch (name) {
        case "username":
          setUsername(value);
          break;
        default:
          break;
      }
    },
    [setUsername]
  );

  return (
    <div className="container">
      <h1 className="color-grey">Mot de passe oublié</h1>

      <p>
        Clique sur le lien qui te sera envoyé par mail pour réinitialiser ton
        mot de passe
      </p>
      <form>
        <StyledContainerInput>
          <CustomInput
            type="text"
            key="username"
            update={update}
            value={username}
            placeholder="Email"
            name="username"
            color="grey"
            className="ct-input"
          />
        </StyledContainerInput>

        <ButtonPrimary>Envoyer</ButtonPrimary>

        <hr className="hr"></hr>

        <p className="center bold color-grey">
          Tu te souviens de ton mot de passe ?{" "}
          <Link className="link" to="/signin">
            Se connecter
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Missing;
