import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import StyledContainerInput from "components/ContainerInput";
import ButtonPrimary from "components/StyledButtons/ButtonPrimary";
import ButtonBlank from "components/StyledButtons/ButtonBlank";
import CustomInput from "components/CustomInput";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Connection = ({ history }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [cookies, setCookie] = useCookies([
    "brainer_id",
    "brainer_spepper",
    "user_id",
    "user_email",
    "user_username",
    "user_password",
    "user_nb_classes",
    "user_nb_qcm",
    "user_nb_flash_cards",
    "user_points",
    "user_premium",
    "user_image",
    "user_update_at",
    "user_created_at"
  ]);

  const update = useCallback(
    (e, { name, value }) => {
      switch (name) {
        case "password":
          setPassword(value);
          break;
        case "username":
          setEmail(value);
          break;
        default:
          break;
      }
    },
    [setPassword, setEmail]
  );

  const buildList = data => {
    if (typeof data.error !== undefined && data.error) {
      toast.error(data.error);
    } else {
      toast.success("Bienvenue " + data.username + " !");
      //Récupération de l'id et pepper en cookie
      setCookie("brainer_id", data.id, { path: "/" });
      setCookie("brainer_pepper", data.pepper, { path: "/" });
      setCookie("user_id", data.id, { path: "/" });
      setCookie("user_email", data.email, { path: "/" });
      setCookie("user_username", data.username, { path: "/" });
      setCookie("user_password", data.password, { path: "/" });
      setCookie("user_nb_classes", data.nb_classes, { path: "/" });
      setCookie("user_nb_qcm", data.nb_qcm, { path: "/" });
      setCookie("user_nb_flash_cards", data.nb_flash_cards, { path: "/" });
      setCookie("user_points", data.points, { path: "/" });
      setCookie("user_premium", data.premium, { path: "/" });
      setCookie("user_image", data.image, { path: "/" });
      setCookie("user_updated_at", data.updated_at, { path: "/" });
      setCookie("user_created_at", data.created_at, { path: "/" });
      history.push("/home");
    }
  };

  const signup = e => {
    e.preventDefault();
    const URL =
      "http://api.brainers.xyz:80/login?email=" +
      email +
      "&password=" +
      password;
    //const myHeaders = new Headers();
    //myHeaders.append("brainer-id", cookies.id);
    //myHeaders.append("brainer-pepper", cookies.pepper);
    fetch(URL, {
      method: "POST",
      headers: {
        id: cookies.brainer_id,
        pepper: cookies.brainer_pepper,
        security: "false",
        Accept: "application/json; odata=verbose"
      }
    })
      .then(response => response.json())
      .then(buildList)
      .catch();
  };

  return (
    <div className="container">
      <h1 className="color-grey">Se connecter</h1>
      <form onSubmit={signup}>
        <StyledContainerInput>
          <CustomInput
            type="text"
            key="email"
            update={update}
            value={email}
            placeholder="Email"
            name="username"
            color="grey"
            className="ct-input"
          />
          <div className="flex">
            <CustomInput
              type="password"
              key="password"
              update={update}
              value={password}
              placeholder="Mot de passe"
              name="password"
              color="grey"
              className="ct-input"
            />
            <Link className="bold link color-grey oublie" to="/missing_pwd">
              oublié ?
            </Link>
          </div>
        </StyledContainerInput>

        <ButtonPrimary onClick={signup}>Se Connecter</ButtonPrimary>
      </form>

      <hr className="hr"></hr>

      <div className="flex">
        <ButtonBlank className="mg-r">
          <i className="fab fa-facebook-f fb-color mg-r"></i>
          <span className="fb-color">Facebook</span>
        </ButtonBlank>
        <ButtonBlank className="mg-l">
          <img
            src="/assets/images/logo-google.png"
            alt="logo google"
            className="logo-google mg-r"
          />
          <span>Google</span>
        </ButtonBlank>
      </div>

      <p className="center bold color-grey">
        Tu n'as pas de compte ?{" "}
        <Link className="link" to="/signup">
          S'inscrire
        </Link>
      </p>
    </div>
  );
};

export default Connection;
