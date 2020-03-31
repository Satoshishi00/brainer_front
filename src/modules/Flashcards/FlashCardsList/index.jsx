import React, {
  useState,
  useCallback,
  useEffect,
  useSubscription
} from "react";
import { Link } from "react-router-dom";

import StyledContainerInput from "components/ContainerInput";
import ButtonPrimary from "components/StyledButtons/ButtonPrimary";
import CustomInput from "components/CustomInput";

import Categories from "components/Categories";
import Footer from "components/Footer";
import Loader from "components/Loader";
import { request } from "http";
import { useCookies } from "react-cookie";

import Card from "./Card";

const FlashCards = () => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [cookies] = useCookies(["brainer_id", "brainer_spepper"]);

  console.log("enter");
  const buildList = useCallback(data => {
    if (typeof data.error !== undefined && data.error) {
      const error = data.error;
      console.log(error);
    } else {
      setCards(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const URL =
      "https://api.brainers.xyz:80/flashCards/show/all?limit=16&page_number=1";
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
  }, [buildList, cookies]);

  return (
    <div className="container">
      <h1 className="color-grey">Flash Cards</h1>

      <div className="qcms-container">
        {cookies.user_id && (
          <Link to="createFcHome">
            <ButtonPrimary className="btn-qdd-qcm">Créer</ButtonPrimary>
          </Link>
        )}

        <Loader
          loading={loading}
          render={cards.map(card => (
            <Card
              key={card.id}
              id_card={card.id}
              name={card.name}
              description={card.description}
              nb_cards={card.nb_cards}
            />
          ))}
        />
      </div>
    </div>
  );
};

export default FlashCards;
