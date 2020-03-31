import React from "react";

const toggle = e => {
  e.preventDefault();
  let recto = document.getElementById("recto").classList;
  recto.toggle("img-front");
  recto.toggle("img-back");

  let verso = document.getElementById("verso").classList;
  verso.toggle("img-front");
  verso.toggle("img-back");
};

const Response = ({ fc, card, upGreen, downRed }) => {
  if (fc.fc_recto_type === "media") {
    //Soit on a une image au recto et du texte au verso
    return (
      <div className="flashcards-cards-container">
        <div id="known_cards" className="center bold points-comptor points-red">
          {downRed}
        </div>
        <div
          onClick={toggle}
          id="recto"
          className="absolute flashcards-card img-front"
        >
          <img
            alt={card.card_verso}
            className="flashcards-card-item"
            src={"https://api.brainers.xyz:80/medias/images/" + card.card_recto}
          ></img>
        </div>

        <div
          onClick={toggle}
          id="verso"
          className="absolute flashcards-card img-back"
        >
          <h3 id="unknown_cards" className="flashcards-card-item">
            {card.card_verso}
          </h3>
        </div>
        <div className="center bold points-comptor points-green">{upGreen}</div>
      </div>
    );
    //Autrement on a du text au recto et au verso
  } else {
    return (
      <div className="flashcards-cards-container">
        <div className="center bold points-comptor points-red">{downRed}</div>
        <div
          onClick={toggle}
          id="recto"
          className="absolute flashcards-card img-front"
        >
          <h3 id="known_cards" className="flashcards-card-item">
            {card.card_recto}
          </h3>
        </div>

        <div
          onClick={toggle}
          id="verso"
          className="absolute flashcards-card img-back"
        >
          <h3 id="unknown_cards" className="flashcards-card-item">
            {card.card_verso}
          </h3>
        </div>
        <div className="center bold points-comptor points-green">{upGreen}</div>
      </div>
    );
  }
};

export default Response;
