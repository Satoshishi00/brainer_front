import React, { useState, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import Fields from "./Fields";

import StyledContainerInput from "components/ContainerInput";
import ButtonPrimary from "components/StyledButtons/ButtonPrimary";
import ButtonBlank from "components/StyledButtons/ButtonBlank";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "contexts/UserContext";

const Inscription = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
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
  const { user, setUser } = useContext(UserContext);

  const update = useCallback(
    (e, { name, value }) => {
      switch (name) {
        case "email":
          setEmail(value);
          break;
        case "password":
          setPassword(value);
          break;
        case "username":
          setUsername(value);
          break;
        default:
          break;
      }
    },
    [setEmail, setPassword, setUsername]
  );

  const buildList = data => {
    if (typeof data.error !== undefined && data.error) {
      toast.error(data.error);
    } else {
      toast.success("Bienvenue " + data.username + " !");

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
      "http://127.0.0.1:8000/register?email=" +
      email +
      "&username=" +
      username +
      "&plainPassword=" +
      password;
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
      <div id="topbar">
        <h1 className="color-grey">S'inscrire</h1>
      </div>

      <form onSubmit={signup}>
        <StyledContainerInput>
          <Fields
            update={update}
            state={{
              password,
              username,
              email
            }}
          />
        </StyledContainerInput>

        <ButtonPrimary onClick={signup}>Créer le compte</ButtonPrimary>
      </form>

      <hr className="hr"></hr>

      <div className="flex">
        <ButtonBlank className="mg-r">
          <i className="fab fa-facebook-f fb-color mg-r"></i>
          <span className="fb-color">Facebook</span>
        </ButtonBlank>
        <ButtonBlank className="mg-l">
          <img src="/logo-google.png" alt="" className="logo-google mg-r" />
          <span>Google</span>
        </ButtonBlank>
      </div>

      <p className="center bold color-grey">
        Déjà inscrit ?{" "}
        <Link className="link" to="signin">
          Se connecter
        </Link>
      </p>
    </div>
  );
};

export default Inscription;
