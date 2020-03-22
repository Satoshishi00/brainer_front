import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useCookies } from "react-cookie";

const MyRoute = ({ logged, path, component }) => {
  const [cookies] = useCookies(["brainer_id"]);

  //Si l'utilisateur doit être connecté
  if (logged) {
    //Si il a un brainer_id dans son cookie, on le laisse acceder à la page connecté qu'il veut
    if (cookies.brainer_id) {
      return <Route path={path} component={component} />;
    }
    //S'il doit être connecté mais qu'il n'a rien en cookie, on le redirige vers la page de connexion
    return <Redirect to="/signin" />;
  }
  //Si l'utilisateur ne doit pas être connecté pour accerder à la route, on le laisse y acceder
  return <Route path={path} component={component} />;
};

export default MyRoute;
