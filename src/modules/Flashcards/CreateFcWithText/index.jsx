import React, { useState, useEffect, useCallback } from "react";

import StyledContainerInput from "components/ContainerInput";
import ButtonPrimary from "components/StyledButtons/ButtonPrimary";
import CustomInput from "components/CustomInput";
import FlashcardInput from "components/FlashcardInput";

import { Redirect } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonSuccess from "components/StyledButtons/ButtonSuccess";

import { useCookies } from "react-cookie";

const CreateFlashCards = () => {
  const [cookies] = useCookies(["brainer_id", "brainer_spepper"]);
  const [fcName, setFcName] = useState("");
  const [rectoName, setRectoName] = useState("");
  const [versoName, setVersoName] = useState("");
  const [error, setError] = useState("");
  const [cardNumber, setCardNumber] = useState(1);
  const [cards, setCards] = useState([]);
  const [fcCreated, setFcCreated] = useState(false);

  useEffect(() => {
    addCard();
  }, []);

  const update = useCallback(
    (e, { name, value }) => {
      switch (name) {
        case "fcName":
          setFcName(value);
          break;
        case "recto_name":
          setRectoName(value);
          break;
        case "verso_name":
          setVersoName(value);
          break;
        default:
          break;
      }
    },
    [setFcName, setRectoName, setVersoName]
  );

  const addCard = e => {
    e && e.preventDefault();
    setCards([...cards, <FlashcardInput num={cardNumber} />]);

    setCardNumber(cardNumber + 1);
  };

  const buildList = useCallback(
    data => {
      console.log(data);
      if (typeof data.error !== undefined && data.error) {
        setError(data.error);
        console.log(error);
      } else {
        console.log("FC ajoutée");
        toast.success("Votre Deck '" + fcName + "' a bien été créé");
        setFcCreated(true);
      }
    },
    [error, fcName]
  );

  const createFc = e => {
    let form = new FormData(e.target);
    e.preventDefault();
    console.log(form);
    let URL =
      "http://api.brainers.xyz:80/flashCards/new?recto_type=text&verso_type=text&fc_name=" +
      fcName +
      "&recto_name=" +
      rectoName +
      "&verso_name=" +
      versoName;
    console.log(URL);
    fetch(URL, {
      method: "POST",
      headers: {
        id: cookies.brainer_id,
        pepper: cookies.brainer_pepper,
        security: "true",
        Accept: "application/json; odata=verbose"
      },
      body: form
    })
      .then(response => response.json())
      .then(buildList)
      .catch(console.log("error AJAX request"));
  };

  return (
    <div className="container">
      <h1 className="color-grey">Créer un deck</h1>
      <form onSubmit={createFc}>
        <StyledContainerInput>
          <CustomInput
            type="text"
            key="fcName"
            update={update}
            value={fcName}
            placeholder="Nom"
            name="fcName"
            color="grey"
            className="ct-input"
          />
        </StyledContainerInput>

        <StyledContainerInput className="mg-t">
          <CustomInput
            type="text"
            key="recto_name"
            update={update}
            value={rectoName}
            placeholder="Nom du Recto"
            name="recto_name"
            color="grey"
            className="ct-input"
          />
          <CustomInput
            type="text"
            key="verso_name"
            update={update}
            value={versoName}
            placeholder="Nom du Verso"
            name="verso_name"
            color="grey"
            className="ct-input"
          />
        </StyledContainerInput>

        {cards.map(card => card)}

        <div className="btn-add-question-container">
          <ButtonSuccess className="btn-add-question" onClick={e => addCard(e)}>
            Nouvelle carte
          </ButtonSuccess>
        </div>

        <ButtonPrimary id="btn-create-qcm">Fabriquer</ButtonPrimary>
      </form>
      {fcCreated && <Redirect to="/flashcardsList" push />}
    </div>
  );
};

export default CreateFlashCards;
