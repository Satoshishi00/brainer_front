import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "components/Loader";
import { useCookies } from "react-cookie";

import ButtonPrimary from "components/StyledButtons/ButtonPrimary";
import ButtonDanger from "components/StyledButtons/ButtonDanger";

import Response from "./Response";
import Question from "./Question";

const TakeQuizz = () => {
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState([]);
  const [lastQuestion, setLastQuestion] = useState([]);
  const [quizz, setQuizz] = useState([]);
  const [cardsDone, setCardsDone] = useState(new FormData());
  const [isFinish, setIsFinish] = useState(false);
  const [lastAnswer, setLastAnswer] = useState("");
  const [downRed, setDownRed] = useState(0);
  const [nbGoodAnswer, setNbGoodAnswer] = useState(0);
  const [theAnswer, setTheAnswer] = useState();
  const [showResponse, setShowResponse] = useState(false);
  const [cookies, setCookie] = useCookies([
    "brainer_id",
    "brainer_spepper",
    "user_id"
  ]);

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
        if (quizz) {
          question.right_answer = data.right_answer;
          console.log("question", data.right_answer);
          setLastQuestion(question);
          setLastAnswer(data.right_answer);
          setShowResponse(true);
          console.log("on a quelque chose après isfinish");
        }
      } else {
        setQuizz(data[0]);
        setQuestion(data[1]);
        setLastQuestion(data[2]);

        console.log("theAnswer", theAnswer);
        console.log("right_answer", data[2].right_answer);
        if (data[2].question_id) {
          setShowResponse(true);
          if (theAnswer === data[2].right_answer) {
            //setNbGoodAnswer(nbGoodAnswer + 1);
            // nbGoodAnswer === 0
            //   ? setNbGoodAnswer(1)
            //   : setNbGoodAnswer(nbGoodAnswer + 1);
            // console.log("nbGoodAnswer =", nbGoodAnswer);
          }
        }
        //Remplissage de la liste des cartes qui ont été faites
        console.log(data[0]);
        console.log(data[1]);
        console.log(data[2]);

        console.log(quizz);
        console.log(question);
        console.log(lastQuestion);
        cardsDone.append("quizz", parseInt(data[1].question_id, 10));
        cardsDone.append("result", cardsDone.getAll("quizz"));
        setCardsDone(cardsDone);
      }
      console.log(showResponse);

      setLoading(false);
      //   clearResponses();
      console.log(showResponse);
      console.log("nb_good_answer", nbGoodAnswer);

      //colorGoodAnswer();
      //   setClickIsActive(true);
    },
    [
      cardsDone,
      quizz,
      question,
      lastQuestion,
      showResponse,
      theAnswer,
      nbGoodAnswer
    ]
  );

  useEffect(() => {
    const curent_url = window.location.href;
    const id_quizz = curent_url.split("/")[4];
    const URL =
      "http://api.brainers.xyz:80/quizz/" + id_quizz + "/getRandomQuestion";

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
    let form = new FormData(e.target);
    e.preventDefault();

    console.log("j'envoie le form");
    console.log("cards_done", cardsDone.get("result"));
    console.log("answer = ", form.get("answer"));
    setTheAnswer(parseInt(form.get("answer")));
    const curent_url = window.location.href;
    const id_quizz = curent_url.split("/")[4];
    console.log("id_quizz", id_quizz);
    const URL =
      "http://api.brainers.xyz:80/quizz/" + id_quizz + "/getRandomQuestion";
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
    // }
  };

  const nextQuestion = useCallback(() => {
    setShowResponse(false);
    if (theAnswer === lastQuestion.right_answer) {
      setNbGoodAnswer(nbGoodAnswer + 1);
      console.log("nbGoodAnswer =", nbGoodAnswer);
    }
  }, [nbGoodAnswer, theAnswer, lastQuestion]);

  if (showResponse) {
    //On affiche la réponse à la question précedente
    return (
      <div className="container">
        <h2 className="color-grey">Quizz - {quizz.quizz_name}</h2>

        <h2 className="color-grey">{quizz.quizz_description}</h2>

        <div className="remaining-cards">
          {quizz.nb_questions - question.remaining}/{quizz.nb_questions}
        </div>

        <div>
          <Loader
            loading={loading}
            render={
              <Response
                quizz={quizz}
                lastQuestion={lastQuestion}
                theAnswer={theAnswer}
                lastAnswer={lastAnswer}
              />
            }
          />

          <ButtonPrimary onClick={nextQuestion}>
            Question suivante
          </ButtonPrimary>
        </div>
      </div>
    );
  } else if (!isFinish) {
    //On affiche la nouvelle question
    return (
      <div className="container">
        <h2 className="color-grey">Quizz - {quizz.quizz_name}</h2>

        <h2 className="color-grey">{quizz.quizz_description}</h2>

        <div className="remaining-cards">
          {quizz.nb_questions - question.remaining + 1}/{quizz.nb_questions}
        </div>

        <form id="form" onSubmit={onSubmit}>
          <Loader
            loading={loading}
            render={<Question quizz={quizz} question={question} />}
          />

          <ButtonPrimary>Valider</ButtonPrimary>
        </form>
      </div>
    );
  } else {
    //On affiche le récapitulatif du quizz
    return (
      <div className="container">
        <h2 className="center">Vous avez fini le Quizz</h2>
        <div id="fc-result" className="center">
          <h1 className="">Résultats</h1>
          <div className="flex fd-column fs-1 ">
            <div className="up-cards">
              Cartes validées{" "}
              <span className="bold color-green">{nbGoodAnswer}</span>
            </div>
            <div className="down-cards">
              Cartes manquées <span className="bold color-red">{downRed}</span>
            </div>
            <Link className="btn-link" to="/quizzList">
              Quizz
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

export default TakeQuizz;
