import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "components/Loader";
import { useCookies } from "react-cookie";

import ButtonPrimary from "components/StyledButtons/ButtonPrimary";

import Classe from "./Classe";

const ClassroomList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [classes, setClasses] = useState([]);
  const [cookies] = useCookies(["brainer_id", "brainer_pepper", "user_id"]);

  const buildList = useCallback(
    data => {
      if (typeof data.error !== undefined && data.error) {
        setError(data.error);
        console.log(error);
      } else {
        setClasses(data);
      }
      setLoading(false);
    },
    [error]
  );

  useEffect(() => {
    const URL = "https://api.brainers.xyz/classroom/shows";
    fetch(URL, {
      method: "GET",
      headers: {
        id: cookies.brainer_id,
        pepper: cookies.brainer_pepper,
        security: "true",
        Accept: "application/json; odata=verbose"
      }
    })
      .then(response => response.json())
      .then(buildList)
      .catch(console.log("error AJAX request"));
  }, []);

  return (
    <div className="container">
      <h1 className="color-grey">Classes</h1>

      {cookies.user_id && (
        <div className="qcms-container">
          <Link to="makeClassroom">
            <ButtonPrimary className="btn-qdd-qcm">Créer</ButtonPrimary>
          </Link>
        </div>
      )}

      <p>{error}</p>

      <Loader
        loading={loading}
        render={classes.map(classe => (
          <Classe key={classe.id} id_classe={classe.id} name={classe.name} />
        ))}
      />
    </div>
  );
};

export default ClassroomList;
