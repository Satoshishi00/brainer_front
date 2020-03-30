import React from "react";

const Response = ({ id, response, parent, good_answer, isResult, answers }) => {
  //S'il le parent est null, c'est que c'est une question. Donc on affiche pas de checkbox
  if (parent == null) return "";
  //Si on a pas encore soumis de résultat, on affiche une checkbox par réponse
  if (!isResult)
    return (
      <div>
        <input
          className="pointer"
          type="checkbox"
          id={id}
          value={response}
          name={parent}
        ></input>
        <label className="pointer" htmlFor={id}>
          {response}
        </label>
      </div>
    );
  //on récupère le contenue du tableau ici et pas plus tôt, pour ne pas avoir de conflit dans le cas où il est vide
  answers = answers.getAll(parent);
  //On rentre dans le premier cas si on a cocher cette réponse
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === response) {
      let html = (
        <div>
          <input type="checkbox" id={id} value={response} name={parent}></input>
          <label
            className={good_answer ? "good_anwer bold" : "bad_answer bold"}
            htmlFor={id}
          >
            {response}
          </label>
        </div>
      );
      return html;
    }
  }

  //Si on a pas coché cette réponse et que c'est une bonne réponse, on applique la classe 'good_answer' au nom de la réponse
  let html = (
    <div>
      <input type="checkbox" id={id} value={response} name={parent}></input>
      <label className={good_answer ? "good_anwer" : ""} htmlFor={response}>
        {response}
      </label>
    </div>
  );
  return html;
};

export default Response;
