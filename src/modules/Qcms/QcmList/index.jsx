import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "components/Loader";

import ButtonPrimary from "components/StyledButtons/ButtonPrimary";
import { useCookies } from "react-cookie";

import Qcm from "./Qcm";

const QcmList = () => {
  const [loading, setLoading] = useState(true);
  const [qcms, setQcms] = useState([]);
  const [cookies, setCookie] = useCookies([
    "brainer_id",
    "brainer_spepper",
    "user_id"
  ]);

  const buildList = useCallback(
    data => {
      if (typeof data.error !== undefined && data.error) {
        const error = data.error;
        console.log(error);
      } else {
        setQcms(data);
      }
      setLoading(false);
    },
    [qcms, loading]
  );

  useEffect(() => {
    const URL =
      "http://api.brainers.xyz:80/qcm/show/all?limit=16&page_number=1";
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
  }, []);

  return (
    <div className="container">
      <h1 className="color-grey">QCM</h1>

      <div className="qcms-container">
        {cookies.user_id && (
          <Link to="addQcm">
            <ButtonPrimary className="btn-qdd-qcm">Créer</ButtonPrimary>
          </Link>
        )}

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

export default QcmList;
