import React, {
  useState,
  useCallback,
  useEffect,
  useSubscription
} from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import StyledContainerInput from "components/ContainerInput";
import ButtonPrimary from "components/StyledButtons/ButtonPrimary";
import ButtonSuccess from "components/StyledButtons/ButtonSuccess";
import CustomInput from "components/CustomInput";

import Categories from "components/Categories";
import Loader from "components/Loader";

import formatTime from "utils/formatTime";
import ButtonBlank from "components/StyledButtons/ButtonBlank";
import LittleInput from "components/LittleInput";

const Profil = () => {
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
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(cookies.user_username);
  const [old_email, setOldEmail] = useState(cookies.user_email);
  const [new_email1, setNewEmail1] = useState("");
  const [new_email2, setNewEmail2] = useState("");

  const update = useCallback(
    (e, { name, value }) => {
      switch (name) {
        case "username":
          setUsername(value);
          break;
        case "old_email":
          setOldEmail(value);
          break;
        case "new_email1":
          setNewEmail1(value);
          break;
        case "new_email2":
          setNewEmail2(value);
          break;
        default:
          break;
      }
    },
    [setUsername, setOldEmail, setNewEmail1, setNewEmail2]
  );

  const editUsername = e => {
    if (e) e.preventDefault();
    let displayUsername = document.getElementById("displayUsername").classList;
    displayUsername.toggle("block");
    displayUsername.toggle("none");
    let edit_username = document.getElementById("edit_username").classList;
    edit_username.toggle("block");
    edit_username.toggle("none");
    let inputUsername = document.getElementById("inputUsername").classList;
    inputUsername.toggle("block");
    inputUsername.toggle("none");
  };

  const editEmail = e => {
    if (e) e.preventDefault();
    let displayEmail = document.getElementById("displayEmail").classList;
    displayEmail.toggle("block");
    displayEmail.toggle("none");
    let edit_Email = document.getElementById("edit_email").classList;
    edit_Email.toggle("block");
    edit_Email.toggle("none");
    let inputEmail = document.getElementById("inputEmail").classList;
    inputEmail.toggle("block");
    inputEmail.toggle("none");
  };

  const submitNewUsername = e => {
    let form = new FormData(e.target);
    e.preventDefault();

    const URL =
      "https://api.brainers.xyz/account/edit/username?username=" +
      form.get("username");

    fetch(URL, {
      method: "POST",
      headers: {
        id: cookies.brainer_id,
        pepper: cookies.brainer_pepper,
        security: "true",
        Accept: "application/json; odata=verbose"
      }
    })
      .then(response => response.json())
      .then(buildListUsername)
      .catch(console.log("error AJAX request"));
  };

  const buildListUsername = data => {
    if (typeof data.error !== undefined && data.error) {
      const error = data.error;
      toast.error(data.error);
      console.log(error);
    } else {
      setCookie("user_username", data.username, { path: "/" });
      setUsername(data.username);
      toast.success("Votre pseudo a bien été modifié");
      editUsername();
    }
    setLoading(false);
  };

  const submitNewEmail = e => {
    let form = new FormData(e.target);
    e.preventDefault();

    const URL =
      "https://api.brainers.xyz/account/edit/email?old_email=" +
      form.get("old_email") +
      "&new_email1=" +
      form.get("new_email1") +
      "&new_email2=" +
      form.get("new_email2");

    fetch(URL, {
      method: "POST",
      headers: {
        id: cookies.brainer_id,
        pepper: cookies.brainer_pepper,
        security: "true",
        Accept: "application/json; odata=verbose"
      }
    })
      .then(response => response.json())
      .then(buildListEmail)
      .catch(console.log("error AJAX request"));
  };

  const buildListEmail = data => {
    if (typeof data.error !== undefined && data.error) {
      const error = data.error;
      toast.error(data.error);
      console.log(error);
    } else {
      setCookie("user_email", data.email, { path: "/" });
      setOldEmail(data.email);
      toast.success("Votre email a bien été modifié");
      editEmail();
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="color-grey">Mon compte</h1>

      <div className="pd-t pd-b">
        <div className="profil-item">
          <div className="profil-label">Pseudo : </div>
          <div id="displayUsername" className="profil-info block">
            {cookies.user_username}
          </div>

          <div id="inputUsername" className="none profil-info">
            <form onSubmit={submitNewUsername}>
              <LittleInput
                type="text"
                update={update}
                value={username}
                name="username"
              />
              <div className="flex">
                <ButtonBlank className="mg-r mg-l" onClick={editUsername}>
                  Annuler
                </ButtonBlank>
                <ButtonSuccess className="mg-r mg-l">Modifier</ButtonSuccess>
              </div>
            </form>
          </div>

          <i
            id="edit_username"
            className="fas fa-edit block"
            onClick={editUsername}
          ></i>
        </div>

        <div className="profil-item">
          <div className="profil-label">Email : </div>
          <div id="displayEmail" className="profil-info block">
            {cookies.user_email}
          </div>
          <div id="inputEmail" className="none profil-info">
            <form onSubmit={submitNewEmail}>
              <label htmlFor="old_email">Email actuel</label>
              <LittleInput
                type="email"
                name="old_email"
                update={update}
                value={old_email}
              />
              <label htmlFor="new_email1">Nouvel email</label>
              <LittleInput
                type="email"
                name="new_email1"
                update={update}
                value={new_email1}
              />
              <label htmlFor="new_email2">Confirmer email</label>
              <LittleInput
                type="email"
                name="new_email2"
                update={update}
                value={new_email2}
              />
              <div className="flex">
                <ButtonBlank className="mg-r mg-l" onClick={editEmail}>
                  Annuler
                </ButtonBlank>
                <ButtonSuccess className="mg-r mg-l">Modifier</ButtonSuccess>
              </div>
            </form>
          </div>
          <i
            id="edit_email"
            className="fas fa-edit block"
            onClick={editEmail}
          ></i>
        </div>
        <div className="profil-item">
          <div className="profil-label">Premium : </div>
          <div className="profil-info">
            {cookies.user_premium === "false" ? "Non" : "Oui"}
          </div>
        </div>
        <div className="profil-item">
          <div className="profil-label">Points : </div>
          <div className="profil-info">{cookies.user_points}</div>
        </div>
        <div className="profil-item">
          <div className="profil-label">
            {cookies.user_nb_qcm > 1 ? "Qcms" : "Qcm"} :{" "}
          </div>
          <div className="profil-info">{cookies.user_nb_qcm}</div>
        </div>
        <div className="profil-item">
          <div className="profil-label">Flash Cards : </div>
          <div className="profil-info">{cookies.user_nb_flash_cards}</div>
        </div>
        <div className="profil-item">
          <div className="profil-label">
            {cookies.user_nb_classes > 1 ? "Classes :" : "Classe :"}
          </div>
          <div className="profil-info">{cookies.user_nb_classes}</div>
        </div>
        <div className="profil-item">
          <div className="profil-label">Inscription le :</div>
          <div className="profil-info">{cookies.user_created_at}</div>
        </div>
        {/* <div className="profil-item">
          <div className="profil-label">Lien d'invitation :</div>
          <i className="far fa-copy"></i>
        </div> */}
      </div>
    </div>
  );
};

export default Profil;
