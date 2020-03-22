import React, { useState, useEffect, useCallback } from "react";

import StyledContainerInput from "components/ContainerInput";
import ButtonPrimary from "components/StyledButtons/ButtonPrimary";
import CustomInput from "components/CustomInput";
import QuestionInput from "components/QuestionInput";

import "react-toastify/dist/ReactToastify.css";
import ButtonSuccess from "components/StyledButtons/ButtonSuccess";

import { useCookies } from "react-cookie";

const CreateQcm = () => {
  const [cookies, setCookie] = useCookies(["brainer_id", "brainer_spepper"]);
  const [error, setError] = useState("");
  const [qcmName, setQcmName] = useState("");
  const [qcmDescription, setQcmDescription] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    addQuestion();
  }, []);

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
    setQuestions([...questions, <QuestionInput num={questionNumber} />]);

    setQuestionNumber(questionNumber + 1);
  };

  const createQcm = e => {
    let form = new FormData(e.target);
    e.preventDefault();
    console.log(form);
    console.log(form.get("qcmName"));
    let URL =
      "http://api.brainers.xyz:80/qcm/new?qcm_name=" +
      form.get("qcmName") +
      "&qcm_description=" +
      form.get("qcmDescription");
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
      }
    },
    [error]
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

        <ButtonPrimary id="btn-create-qcm" onClick={() => {}}>
          Fabriquer
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default CreateQcm;
