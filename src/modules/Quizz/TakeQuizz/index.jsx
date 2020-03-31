import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "components/Loader";
import { useCookies } from "react-cookie";

import ButtonPrimary from "components/StyledButtons/ButtonPrimary";

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
  const [nbGoodAnswer, setNbGoodAnswer] = useState(0);
  const [nbQuestionDone, setNbQuestionDone] = useState(1);
  const [theAnswer, setTheAnswer] = useState();
  const [showResponse, setShowResponse] = useState(false);
  const [cookies] = useCookies(["brainer_id", "brainer_spepper", "user_id"]);

  const buildList = useCallback(
    data => {
      if (typeof data.error !== "undefined" && data.error) {
        const error = data.error;
        console.log(error);
      } else if (data.logout) {
        console.log("On se déconnecte");
        window.location.replace("https://www.brainers.xyz/signin");
      } else if (data.finish) {
        setIsFinish(data.finish);
        if (quizz) {
          question.right_answer = data.right_answer;
          setLastQuestion(question);
          setLastAnswer(data.right_answer);
          setShowResponse(true);
        }
      } else {
        setQuizz(data[0]);
        setQuestion(data[1]);
        setLastQuestion(data[2]);

        if (data[2].question_id) {
          setShowResponse(true);
        }
        //Remplissage de la liste des cartes qui ont été faites
        cardsDone.append("quizz", parseInt(data[1].question_id, 10));
        cardsDone.append("result", cardsDone.getAll("quizz"));
        setCardsDone(cardsDone);
      }

      setLoading(false);
    },
    [cardsDone, quizz, question]
  );

  useEffect(() => {
    const curent_url = window.location.href;
    const id_quizz = curent_url.split("/")[5];
    const URL =
      "https://api.brainers.xyz/quizz/" + id_quizz + "/getRandomQuestion";

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

    setTheAnswer(parseInt(form.get("answer")));
    const curent_url = window.location.href;
    const id_quizz = curent_url.split("/")[5];
    const URL =
      "https://api.brainers.xyz/quizz/" + id_quizz + "/getRandomQuestion";
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
    setNbQuestionDone(nbQuestionDone + 1);
  }, [nbGoodAnswer, theAnswer, lastQuestion, nbQuestionDone]);

  if (showResponse) {
    //On affiche la réponse à la question précedente
    return (
      <div className="container">
        <h2 className="color-grey">Quizz - {quizz.quizz_name}</h2>

        <h2 className="color-grey">{quizz.quizz_description}</h2>

        <div className="remaining-cards">
          {nbQuestionDone}/{quizz.nb_questions}
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
          <div className="flex fd-column fs-1 mg-b">
            <div className="up-cards">
              Bonnes réponses{" "}
              <span className="bold color-green">{nbGoodAnswer}</span>/
              {quizz.nb_questions}
            </div>
            {(nbGoodAnswer / quizz.nb_questions > 0.8 && (
              <div className="flex fd-column centrage-horizontal">
                <span className="msg_result_quizz color-green">
                  Félicitations
                </span>
                <lottie-player
                  src="https://assets10.lottiefiles.com/packages/lf20_b7rQjC.json"
                  background="transparent"
                  speed="1"
                  class="confettis"
                  autoplay
                ></lottie-player>
                <lottie-player
                  src="https://assets3.lottiefiles.com/datafiles/c5zgFUko8JLl7Vp/data.json"
                  background="transparent"
                  speed="1"
                  class="animation_smiley"
                  autoplay
                ></lottie-player>
              </div>
            )) ||
              (nbGoodAnswer / quizz.nb_questions > 0.6 && (
                <div className="flex fd-column centrage-horizontal">
                  <span className="msg_result_quizz color-green">Bravo</span>
                  <img
                    src="/assets/images/smiley_happy.jpg"
                    alt="Smiley happy"
                    width="250"
                  />
                </div>
              )) || (
                <div className="flex fd-column centrage-horizontal">
                  <span className="msg_result_quizz color-red">
                    Essaie encore
                  </span>
                  {/* <img
                    src="/assets/images/smiley_confused.jpg"
                    alt="Smiley confused"
                    width="250"
                  /> */}
                  <lottie-player
                    src="https://assets5.lottiefiles.com/packages/lf20_rxXOrZ.json"
                    background="transparent"
                    speed="1"
                    class="animation_smiley"
                    autoplay
                  ></lottie-player>
                </div>
              )}
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
