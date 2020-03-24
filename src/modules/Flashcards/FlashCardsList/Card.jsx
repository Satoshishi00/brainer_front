import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id_card, name, description, nb_cards }) => {
  console.log("name = " + name);
  console.log("description = " + description);
  console.log("nb_cards = " + nb_cards);
  return (
    <Link className="card-container" to={"flashcards/" + id_card}>
      <h3>{name}</h3>
      <span className="card-description">{description}</span>
      <span className="qcm-nb_question">
        {nb_cards > 1 ? nb_cards + " cartes" : nb_cards + " carte"}
      </span>
    </Link>
  );
};

export default Card;
