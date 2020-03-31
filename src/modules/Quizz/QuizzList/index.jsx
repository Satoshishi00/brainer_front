import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "components/Loader";

import ButtonPrimary from "components/StyledButtons/ButtonPrimary";
import { useCookies } from "react-cookie";

import Quizz from "./Quizz";

const QuizzList = () => {
  const [loading, setLoading] = useState(true);
  const [quizzs, setQuizzs] = useState([]);
  const [cookies] = useCookies(["brainer_id", "brainer_spepper", "user_id"]);

  const buildList = useCallback(data => {
    if (typeof data.error !== undefined && data.error) {
      const error = data.error;
      console.log(error);
    } else {
      setQuizzs(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const URL =
      "https://api.brainers.xyz/quizz/show/all?limit=16&page_number=1";
    fetch(URL, {
      method: "POST",
      headers: {
        id: cookies.brainer_id,
        pepper: cookies.brainer_pepper,
        security: "false",
        Accept: "application/json; odata=verbose"
      }
    })
      .then(response => response.json())
      .then(buildList)
      .catch(console.log("error AJAX request"));
  }, [cookies, buildList]);

  return (
    <div className="container">
      <h1 className="color-grey">Quizz</h1>

      <div className="qcms-container">
        {cookies.user_id && (
          <Link to="addQuizz">
            <ButtonPrimary className="btn-qdd-qcm">Créer</ButtonPrimary>
          </Link>
        )}

        <Loader
          loading={loading}
          render={quizzs.map(quizz => (
            <Quizz
              key={quizz.id}
              id_quizz={quizz.id}
              name={quizz.name}
              description={quizz.description}
              nb_questions={quizz.nb_questions}
            />
          ))}
        />
      </div>
    </div>
  );
};

export default QuizzList;
