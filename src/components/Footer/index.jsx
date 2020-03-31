import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <hr className="hr"></hr>

      <div className="flex mg-t mg-b">
        <span className="bold link color-grey flex-weight center">Contact</span>
        <span className="bold color-grey flex-weight center">
          <Link className="link color-grey flex-weight" to="/signin">
            Conditions d'utilisation
          </Link>
        </span>
        <span className="bold color-grey flex-weight center">
          <Link className="link" to="/signin">
            <i
              className="fab fa-facebook-square fb-color fs-1"
              aria-label="facebook"
            ></i>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Footer;
