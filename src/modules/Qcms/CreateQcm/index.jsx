import React, { useState, useEffect, useCallback } from "react";

import StyledContainerInput from "components/ContainerInput";
import ButtonPrimary from "components/StyledButtons/ButtonPrimary";
import CustomInput from "components/CustomInput";
import QuestionInput from "components/QuestionInput";

import { Redirect } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonSuccess from "components/StyledButtons/ButtonSuccess";

import { useCookies } from "react-cookie";

const CreateQcm = () => {
  const [cookies] = useCookies(["brainer_id", "brainer_spepper"]);
  const [error, setError] = useState("");
  const [qcmName, setQcmName] = useState("");
  const [qcmDescription, setQcmDescription] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [qcmCreated, setQcmCreated] = useState(false);

  const update = useCallback(
    (e, { name, value }) => {
      switch (name) {
        case "qcmName":
          setQcmName(value);
          break;
        case "qcmDescription":
          setQcmDescription(value);
          break;
        default:
          break;
      }
    },
    [setQcmName, setQcmDescription]
  );

  const addQuestion = e => {
    e && e.preventDefault();
    setQuestions([
      ...questions,
      <QuestionInput num={questionNumber} key={questionNumber} />
    ]);

    setQuestionNumber(questionNumber + 1);
  };

  useEffect(() => {
    addQuestion();
  }, []);

  const createQcm = e => {
    let form = new FormData(e.target);
    e.preventDefault();

    let URL =
      "https://api.brainers.xyz/qcm/new?qcm_name=" +
      form.get("qcmName") +
      "&qcm_description=" +
      form.get("qcmDescription");

    for (let i = 1; i < questionNumber; i++) {
      console.log(form.get("question" + i));
      URL += "&question" + i + "=" + form.get("question" + i);

      console.log(form.get("q" + i + "_advice"));
      URL += "&q" + i + "_advice=" + form.get("q" + i + "_advice");

      let j = 1;
      while (form.get("q" + i + "_rep" + j)) {
        console.log(form.get("q" + i + "_rep" + j));
        URL += "&q" + i + "_rep" + j + "=" + form.get("q" + i + "_rep" + j);
        if (form.get("q" + i + "_ans" + j) === "on") {
          console.log(true);
          URL += "&q" + i + "_ans" + j + "=true";
        } else {
          console.log(false);
          URL += "&q" + i + "_ans" + j + "=false";
        }
        j++;
      }
    }

    console.log(URL);
    fetch(URL, {
      method: "POST",
      headers: {
        id: cookies.brainer_id,
        pepper: cookies.brainer_pepper,
        security: "true",
        Accept: "application/json; odata=verbose"
      },
      body: JSON.stringify({
        form
      })
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
        console.log("QCM ajoutée");
        toast.success("Votre Deck '" + qcmName + "' a bien été créé");
        setQcmCreated(true);
      }
    },
    [error, qcmName]
  );

  return (
    <div className="container">
      <h1 className="color-grey">Créer un Qcm</h1>
      <form onSubmit={createQcm}>
        <StyledContainerInput>
          <CustomInput
            type="text"
            key="qcmName"
            update={update}
            value={qcmName}
            placeholder="Nom"
            name="qcmName"
            color="grey"
            className="ct-input"
          />
        </StyledContainerInput>

        <StyledContainerInput className="mg-t">
          <CustomInput
            type="text"
            key="qcmDescription"
            update={update}
            value={qcmDescription}
            placeholder="Description"
            name="qcmDescription"
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
      {qcmCreated && <Redirect to="/qcmList" push />}
    </div>
  );
};

export default CreateQcm;
