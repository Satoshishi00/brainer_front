import React, { useState, useEffect, useCallback } from "react";

import StyledContainerInput from "components/ContainerInput";
import ButtonPrimary from "components/StyledButtons/ButtonPrimary";
import CustomInput from "components/CustomInput";
import QuestionInputQuizz from "components/QuestionInputQuizz";

import { Redirect } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonSuccess from "components/StyledButtons/ButtonSuccess";

import { useCookies } from "react-cookie";

const CreateQuizz = () => {
  const [cookies, setCookie] = useCookies(["brainer_id", "brainer_spepper"]);
  const [error, setError] = useState("");
  const [quizzName, setQuizzName] = useState("");
  const [quizzDescription, setQuizzDescription] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [quizzCreated, setQuizzCreated] = useState(false);

  useEffect(() => {
    addQuestion();
  }, []);

  const update = useCallback(
    (e, { name, value }) => {
      switch (name) {
        case "quizzName":
          setQuizzName(value);
          break;
        case "quizzDescription":
          setQuizzDescription(value);
          break;
        default:
          break;
      }
    },
    [setQuizzName, setQuizzDescription]
  );

  const addQuestion = e => {
    e && e.preventDefault();
    setQuestions([
      ...questions,
      <QuestionInputQuizz num={questionNumber} key={questionNumber} />
    ]);

    setQuestionNumber(questionNumber + 1);
  };

  const createQuizz = e => {
    let form = new FormData(e.target);
    e.preventDefault();

    let URL =
      "http://api.brainers.xyz:80/quizz/new?quizz_name=" +
      form.get("quizzName") +
      "&quizz_description=" +
      form.get("quizzDescription");

    // for (let i = 1; i < questionNumber; i++) {
    //   console.log(form.get("question" + i));
    //   URL += "&question" + i + "=" + form.get("question" + i);

    //   console.log(form.get("q" + i + "_advice"));
    //   URL += "&q" + i + "_advice=" + form.get("q" + i + "_advice");

    //   console.log(
    //     "q" + 1 + "_right_answer",
    //     form.get("q" + 1 + "_right_answer")
    //   );
    //   URL += "&q" + i + "_right_answer=" + form.get("q" + 1 + "_right_answer");
    // for(j=1; j<=4; j++){
    //   if (form.get("q"+2+"_right_answer") == )
    // }
    // let j = 1;
    // while (form.get("q" + i + "_rep" + j)) {
    //   console.log(form.get("q" + i + "_rep" + j));
    //   URL += "&q" + i + "_rep" + j + "=" + form.get("q" + i + "_rep" + j);
    //   if (form.get("q" + i + "_ans" + j) === "on") {
    //     console.log(true);
    //     URL += "&q" + i + "_ans" + j + "=true";
    //   } else {
    //     console.log(false);
    //     URL += "&q" + i + "_ans" + j + "=false";
    //   }
    //   j++;
    // }
    // }

    console.log(URL);
    fetch(URL, {
      method: "POST",
      headers: {
        id: cookies.brainer_id,
        pepper: cookies.brainer_pepper,
        security: "true",
        Accept: "application/json; odata=verbose"
      },
      body: form
    })
      .then(response => response.json())
      .then(buildList)
      .catch(console.log("error AJAX request"));
  };

  const buildList = useCallback(
    data => {
      console.log(data);
      if (typeof data.error !== undefined && data.error) {
        setError(data.error);
        console.log(error);
      } else {
        console.log("Quizz ajoutée");
        toast.success("Votre Quizz '" + quizzName + "' a bien été créé");
        setQuizzCreated(true);
      }
    },
    [error, quizzName]
  );

  return (
    <div className="container">
      <h1 className="color-grey">Créer un Quizz</h1>
      <form onSubmit={createQuizz}>
        <StyledContainerInput>
          <CustomInput
            type="text"
            key="quizzName"
            update={update}
            value={quizzName}
            placeholder="Nom"
            name="quizzName"
            color="grey"
            className="ct-input"
          />
        </StyledContainerInput>

        <StyledContainerInput className="mg-t">
          <CustomInput
            type="text"
            key="quizzDescription"
            update={update}
            value={quizzDescription}
            placeholder="Description"
            name="quizzDescription"
            color="grey"
            className="ct-input"
          />
        </StyledContainerInput>

        {questions.map(question => question)}

        <div className="btn-add-question-container">
          <ButtonSuccess
            className="btn-add-question"
            onClick={e => addQuestion(e)}
          >
            Nouvelle question
          </ButtonSuccess>
        </div>

        <ButtonPrimary id="btn-create-qcm">Fabriquer</ButtonPrimary>
      </form>
      {quizzCreated && <Redirect to="/quizzList" push />}
    </div>
  );
};

export default CreateQuizz;
