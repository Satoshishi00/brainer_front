import React from "react";
import { Link } from "react-router-dom";

const Quizz = ({ id_quizz, name, description, nb_questions }) => {
  console.log("name = " + name);
  console.log("description = " + description);
  console.log("nb_questions = " + nb_questions);
  console.log("quzz_id", id_quizz);
  return (
    <Link className="card-container" to={"quizz/" + id_quizz}>
      <h3>{name}</h3>
      <span className="card-description">{description}</span>
      <span className="qcm-nb_question">
        {nb_questions > 1
          ? nb_questions + " questions"
          : nb_questions + " question"}
      </span>
    </Link>
  );
};

export default Quizz;
