import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

const Response = ({ quizz, lastQuestion, theAnswer, lastAnswer }) => {
  //Soit on a une image au recto et du texte au verso
  console.log("theAnswer", theAnswer);
  console.log("right_answer", lastQuestion.right_answer);

  return (
    <div>
      <div className="quizz_question">{lastQuestion.question}</div>
      <div className="quizz_answer-container">
        <label
          htmlFor="radio_1"
          className={
            ((lastQuestion.right_answer === 1 || lastAnswer === 1) &&
              "quizz_answer_green") ||
            (theAnswer === 1 && "quizz_answer_red") ||
            "quizz_answer"
          }
          id="result_answer_1"
        >
          {lastQuestion.rep1}
        </label>
        <input type="radio" name="answer" value="1" id="radio_1" />
        <label
          htmlFor="radio_2"
          className={
            ((lastQuestion.right_answer === 2 || lastAnswer === 2) &&
              "quizz_answer_green") ||
            (theAnswer === 2 && "quizz_answer_red") ||
            "quizz_answer"
          }
          id="result_answer_2"
        >
          {lastQuestion.rep2}
        </label>
        <input type="radio" name="answer" value="2" id="radio_2" />
        <label
          htmlFor="radio_3"
          className={
            ((lastQuestion.right_answer === 3 || lastAnswer === 3) &&
              "quizz_answer_green") ||
            (theAnswer === 3 && "quizz_answer_red") ||
            "quizz_answer"
          }
          id="result_answer_3"
        >
          {lastQuestion.rep3}
        </label>
        <input type="radio" name="answer" value="3" id="radio_3" />
        <label
          htmlFor="radio_4"
          className={
            ((lastQuestion.right_answer === 4 || lastAnswer === 4) &&
              "quizz_answer_green") ||
            (theAnswer === 4 && "quizz_answer_red") ||
            "quizz_answer"
          }
          id="result_answer_4"
        >
          {lastQuestion.rep4}
        </label>
        <input type="radio" name="answer" value="4" id="radio_4" />
      </div>
    </div>
  );
};

export default Response;
