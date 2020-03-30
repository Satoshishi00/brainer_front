import React, { useState, useCallback } from "react";

import StyledContainerInput from "components/ContainerInput";
import CustomInput from "components/CustomInput";

import "react-toastify/dist/ReactToastify.css";

const FlashcardInput = props => {
  const [recto, setRecto] = useState("");
  const [verso, setVerso] = useState("");

  const update = useCallback(
    (e, { name, value }) => {
      console.log(props);
      switch (name) {
        case "card_recto_" + props.num:
          setRecto(value);
          break;
        case "card_verso_" + props.num:
          setVerso(value);
          break;
        default:
          break;
      }
    },
    [setRecto, setVerso, props]
  );

  return (
    <div id={"question-html-" + props.num}>
      <StyledContainerInput id={"card-" + props.num} className="mg-t">
        <CustomInput
          type="text"
          key={"card_recto_" + props.num}
          update={update}
          value={recto}
          placeholder="Recto"
          name={"card_recto_" + props.num}
          color="grey"
          className="ct-input"
        />
        <CustomInput
          type="text"
          key={"card_verso_" + props.num}
          update={update}
          value={verso}
          placeholder="Verso"
          name={"card_verso_" + props.num}
          color="grey"
          className="ct-input"
        />
      </StyledContainerInput>
    </div>
  );
};

export default FlashcardInput;
