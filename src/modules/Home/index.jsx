import React, { useState, useCallback, useEffect } from "react";

import Categories from "components/Categories";
import Loader from "components/Loader";

import { useCookies } from "react-cookie";

import Qcm from "./Qcm";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [qcms, setQcms] = useState([]);
  const [error, setError] = useState("");
  const [cookies] = useCookies(["brainer_id", "brainer_spepper", "user_id"]);

  const buildList = useCallback(
    data => {
      console.log(data);
      if (typeof data.error !== undefined && data.error) {
        setError(data.error);
        console.log(error);
      } else if (data.logout) {
        console.log("On se déconnecte");
        window.location.replace("http://www.brainers.xyz:80/signin");
      } else {
        console.log(data);
        setQcms(data);
      }
      setLoading(false);
    },
    [error, qcms, loading]
  );

  useEffect(() => {
    const URL = "http://api.brainers.xyz:80/qcm/show/all?limit=6&page_number=1";
    fetch(URL, {
      method: "GET",
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
  }, []);

  return (
    <div className="container">
      <h1 className="color-grey">Explorer Brainer</h1>
      <Categories />

      <h2 className="color-grey">Quizz les plus populaires</h2>
      <div className="qcms-container">
        <Loader
          loading={loading}
          render={qcms.map(qcm => (
            <Qcm
              key={qcm.id}
              id_qcm={qcm.id}
              name={qcm.name}
              description={qcm.description}
              nb_questions={qcm.nb_questions}
            />
          ))}
        />
      </div>
    </div>
  );
};

export default Home;
