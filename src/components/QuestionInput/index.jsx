import React, { useState, useEffect, useCallback, useMemo } from "react";

import StyledContainerInput from "components/ContainerInput";
import CustomInput from "components/CustomInput";

import "react-toastify/dist/ReactToastify.css";

const QuestionInput = props => {
  const [question, setQuestion] = useState("");
  const [advice, setAdvice] = useState("");
  const [nbOfAnswers, setNbOfAnswers] = useState(1);
  const [answers, setAnswers] = useState([]);

  const updateQuestion = useCallback(e => setQuestion(e.target.value), []);
  const updateAdvice = useCallback(e => setAdvice(e.target.value), []);

  const updateAnswer = useCallback(
    (e, i) => {
      answers[i] = e.target.value;
      setAnswers(answers);
    },
    [answers]
  );

  const addAnswer = e => setNbOfAnswers(nbOfAnswers + 1);

  const deleteAnswer = () => {
    setNbOfAnswers(nbOfAnswers - 1);
  };

  const displayAnswers = useMemo(() => {
    console.log("displayAnswer", "pass");
    console.log("nbOfAnswers", nbOfAnswers);
    const answersInputs = [];
    for (let i = 0; i < nbOfAnswers; i++) {
      answersInputs.push(
        <div className="relative" key={`container_${props.num}_${i + 1}`}>
          <input
            type="checkbox"
            className="checkbox-qcm"
            name={`q${props.num}_ans${i + 1}`}
            key={`q${props.num}_ans${i + 1}`}
          />
          <CustomInput
            type="text"
            name={`q${props.num}_rep${i + 1}`}
            key={`q${props.num}_rep${i + 1}`}
            update={e => updateAnswer(e, i)}
            value={answers[i]}
            placeholder={`Réponse ${i + 1}`}
            color="grey"
            className="ct-input"
          />
          <i className="fas fa-minus" onClick={deleteAnswer} id={`${i}`}></i>
        </div>
      );
    }
    return answersInputs;
  }, [nbOfAnswers, updateAnswer, answers]);

  return (
    <div id={"question-html-" + props.num}>
      <StyledContainerInput id={"question-" + props.num} className="mg-t">
        <CustomInput
          type="text"
          key={"question" + props.num}
          update={updateQuestion}
          value={question}
          placeholder="Question"
          name={"question" + props.num}
          color="grey"
          className="ct-input"
        />
        <CustomInput
          type="text"
          key={"advice" + props.num}
          update={updateAdvice}
          value={advice}
          placeholder="Conseil"
          name={`q${props.num}_advice`}
          color="grey"
          className="ct-input"
        />
        {displayAnswers}
      </StyledContainerInput>
      <div className="add-answer-container">
        <div className="add-answer" onClick={addAnswer}>
          +
        </div>
      </div>
    </div>
  );
};

export default QuestionInput;
