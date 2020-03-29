import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

const checkLabel = e => {
  console.log("e", e.target);
  for (let j = 1; j <= 4; j++) {
    document.getElementById("answer_" + j).style.backgroundColor = "white";
  }
  e.target.style.backgroundColor = "#f6b93b";
};

const Question = ({ quizz, question }) => {
  //Soit on a une image au recto et du texte au verso

  return (
    <div>
      <div className="quizz_question">{question.question}</div>
      <div className="quizz_answer-container">
        <label
          htmlFor="radio_1"
          className="quizz_answer"
          id="answer_1"
          onClick={checkLabel}
        >
          {question.rep1}
        </label>
        <input type="radio" name="answer" value="1" id="radio_1" />
        <label
          htmlFor="radio_2"
          className="quizz_answer"
          id="answer_2"
          onClick={checkLabel}
        >
          {question.rep2}
        </label>
        <input type="radio" name="answer" value="2" id="radio_2" />
        <label
          htmlFor="radio_3"
          className="quizz_answer"
          id="answer_3"
          onClick={checkLabel}
        >
          {question.rep3}
        </label>
        <input type="radio" name="answer" value="3" id="radio_3" />
        <label
          htmlFor="radio_4"
          className="quizz_answer"
          id="answer_4"
          onClick={checkLabel}
        >
          {question.rep4}
        </label>
        <input type="radio" name="answer" value="4" id="radio_4" />
      </div>
    </div>
  );
};

export default Question;
