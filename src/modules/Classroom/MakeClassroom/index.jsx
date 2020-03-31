import React, { useState, useCallback } from "react";

import { useCookies } from "react-cookie";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ButtonSuccess from "components/StyledButtons/ButtonSuccess";

import CustomInput from "components/CustomInput";

const MakeClassroom = ({ history }) => {
  const [cookies, setCookie] = useCookies([
    "brainer_id",
    "brainer_pepper",
    "user_nb_classes",
    "user_points"
  ]);
  const [groupName, setGroupName] = useState("");

  const update = useCallback(
    (e, { name, value }) => {
      switch (name) {
        case "groupName":
          setGroupName(value);
          break;
        default:
          break;
      }
    },
    [setGroupName]
  );

  const addClassroom = e => {
    e.preventDefault();
    const URL =
      "https://api.brainers.xyz/classroom/new?group_name=" + groupName;
    fetch(URL, {
      method: "PUT",
      headers: {
        id: cookies.brainer_id,
        pepper: cookies.brainer_pepper,
        security: "true",
        Accept: "application/json; odata=verbose"
      }
    })
      .then(response => response.json())
      .then(buildList)
      .catch();
  };

  const buildList = data => {
    if (typeof data.error !== undefined && data.error) {
      toast.error(data.error);
    } else {
      toast.success(data.message);
      setCookie("user_nb_classes", data.nbClasses);
      setCookie("user_points", data.nbPoints);
      history.push("/classroomList");
    }
  };

  return (
    <div className="container">
      <h1 className="color-grey">Créer une Classe</h1>

      <div className="qcms-container">
        <form action="" onSubmit={addClassroom}>
          <CustomInput
            type="text"
            key="groupName"
            update={update}
            value={groupName}
            placeholder="Nom"
            name="groupName"
            color="grey"
            className="ct-input"
          />

          <ButtonSuccess onClick={addClassroom}>Créer</ButtonSuccess>
        </form>
      </div>
    </div>
  );
};

export default MakeClassroom;
