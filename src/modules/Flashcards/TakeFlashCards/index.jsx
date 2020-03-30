import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "components/Loader";
import { useCookies } from "react-cookie";

import ButtonSuccess from "components/StyledButtons/ButtonSuccess";
import ButtonDanger from "components/StyledButtons/ButtonDanger";

import Response from "./Response";

const TakeFlashCards = () => {
  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState([]);
  const [fc, setFc] = useState([]);
  const [cardsDone, setCardsDone] = useState(new FormData());
  const [isFinish, setIsFinish] = useState(false);
  const [upGreen, setUpGreen] = useState(0);
  const [downRed, setDownRed] = useState(0);
  const [clickIsActive, setClickIsActive] = useState(false);
  const [cookies] = useCookies(["brainer_id", "brainer_spepper", "user_id"]);

  const buildList = useCallback(
    data => {
      console.log(data.error);
      if (typeof data.error !== "undefined" && data.error) {
        const error = data.error;
        console.log(error);
      } else if (data.logout) {
        console.log("On se déconnecte");
        window.location.replace("http://www.brainers.xyz:80/signin");
      } else if (data.finish) {
        setIsFinish(data.finish);
      } else {
        setFc(data[0]);
        setCard(data[1]);
        //Remplissage de la liste des cartes qui ont été faites
        cardsDone.append("fc", parseInt(data[1].card_id, 10));
        cardsDone.append("result", cardsDone.getAll("fc"));
        setCardsDone(cardsDone);
        console.log(cardsDone);
      }

      setLoading(false);
      setClickIsActive(true);
    },
    [cardsDone]
  );

  useEffect(() => {
    const curent_url = window.location.href;
    const id_fc = curent_url.split("/")[4];
    const URL =
      "http://api.brainers.xyz:80/flashCards/" + id_fc + "/getRandomCard";

    fetch(URL, {
      method: "POST",
      headers: {
        id: cookies.brainer_id,
        pepper: cookies.brainer_pepper,
        security: "false",
        Accept: "application/json; odata=verbose"
      },
      body: cardsDone
    })
      .then(response => response.json())
      .then(buildList)
      .catch(error => console.log("error api fetch", error));
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    if (!clickIsActive) {
      const curent_url = window.location.href;
      const id_fc = curent_url.split("/")[4];
      const URL =
        "http://api.brainers.xyz:80/flashCards/" + id_fc + "/getRandomCard";

      fetch(URL, {
        method: "POST",
        headers: {
          id: cookies.brainer_id,
          pepper: cookies.brainer_pepper,
          security: "false",
          Accept: "application/json; odata=verbose"
        },
        body: cardsDone
      })
        .then(response => response.json())
        .then(buildList)
        .catch(error => console.log("error api fetch", error));
    }
  };

  const down = () => {
    if (clickIsActive) {
      setDownRed(downRed + 1);
      if (document.getElementById("recto").classList.contains("img-back")) {
        toggleCard();
      }
      setClickIsActive(false);
    }
  };

  const up = () => {
    if (clickIsActive) {
      setUpGreen(upGreen + 1);
      if (document.getElementById("recto").classList.contains("img-back")) {
        toggleCard();
      }
      setClickIsActive(false);
    }
  };

  const toggleCard = () => {
    let recto = document.getElementById("recto").classList;
    recto.toggle("img-front");
    recto.toggle("img-back");

    let verso = document.getElementById("verso").classList;
    verso.toggle("img-front");
    verso.toggle("img-back");
  };

  const sendFcResponse = () => {
    console.log("On envoie les réponses");
    let test = new FormData();

    test.append(
      "nb_good_rep",
      document.getElementsByClassName("points-green")[0].innerHTML
    );
    test.append("user_id", cookies.user_id);
    console.log(test);
    console.log("user_id", test.get("user_id"));
    console.log("nb_good_rep", test.get("nb_good_rep"));

    const curent_url = window.location.href;
    const id_fc = curent_url.split("/")[4];
    console.log("toto");
    const URL =
      "http://api.brainers.xyz:80/flashCards/" +
      id_fc +
      "/getInformationsAfterAnswering";

    fetch(URL, {
      method: "POST",
      headers: {
        id: cookies.brainer_id,
        pepper: cookies.brainer_pepper,
        security: "false",
        Accept: "application/json; odata=verbose"
      },
      body: test
    })
      .then(response => response.json())
      .catch(error => console.log("error api fetch", error));

    console.log("titi");
  };

  if (!isFinish) {
    return (
      <div className="container">
        <h2 className="color-grey">FlashCards - {fc.fc_name}</h2>

        <h2 className="color-grey">
          {fc.fc_recto_name} - {fc.fc_verso_name}
        </h2>

        <div className="remaining-cards">{card.remaining}</div>

        <form id="form" onSubmit={onSubmit}>
          <Loader
            loading={loading}
            render={
              <Response
                fc={fc}
                card={card}
                upGreen={upGreen}
                downRed={downRed}
              />
            }
          />

          <div className="flex">
            <ButtonDanger onClick={down} className="mg-l mg-r">
              <i className="far fa-thumbs-down"></i>
            </ButtonDanger>
            <ButtonSuccess onClick={up} className="mg-l mg-r">
              <i className="far fa-thumbs-up"></i>
            </ButtonSuccess>
          </div>
        </form>
      </div>
    );
  } else {
    //sendFcResponse();
    return (
      <div className="container">
        <h2 className="center">Vous avez fini le jeu de cartes</h2>
        <div id="fc-result" className="center">
          <h1 className="">Résultats</h1>
          <div className="flex fd-column fs-1 ">
            <div className="up-cards">
              Cartes validées{" "}
              <span className="bold color-green">{upGreen}</span>
            </div>
            <div className="down-cards">
              Cartes manquées <span className="bold color-red">{downRed}</span>
            </div>
            <Link className="btn-link" to="/flashcardsList">
              Flash Cards
            </Link>
            <Link className="btn-link" to="/home">
              Accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default TakeFlashCards;
