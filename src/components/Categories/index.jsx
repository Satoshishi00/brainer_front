import React from "react";
import { Link } from "react-router-dom";

const Categories = () => (
  <div className="flex mg-b pd-b ovf-x">
    <Link className="link color-grey flex-weight" to="/qcmList">
      <div className="box-img-text flex fd-column">
        <span className="img-in-box">
          <i className="fas fa-question"></i>
        </span>
        <span className="center pd-t bold">Quizz</span>
      </div>
    </Link>

    <Link className="link color-grey flex-weight" to="/qcmList">
      <div className="box-img-text flex fd-column">
        <span className="img-in-box">
          <i className="fas fa-list"></i>
        </span>
        <span className="center pd-t bold">Qcm</span>
      </div>
    </Link>

    <Link className="link color-grey flex-weight" to="/flashcardsList">
      <div className="box-img-text flex fd-column">
        <span className="img-in-box">
          <i className="fas fa-th-large"></i>
        </span>
        <span className="center pd-t bold">Flash Cards</span>
      </div>
    </Link>
  </div>
);

export default Categories;
