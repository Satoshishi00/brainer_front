import React, { useState } from "react";

export const UserContext = React.createContext({});

const Provider = ({ children }) => {
  const [user, setUser] = useState({
    brainer_id: 0,
    bariner_pepper: "",
    id: 0,
    email: "",
    username: "",
    image: "",
    nb_classes: 0,
    nb_flash_cards: 0,
    nb_qcm: 0,
    points: 0,
    premium: false,
    created_at: "",
    updated_at: ""
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default Provider;

// import Provider, { UserContext } from "contexts/UserContext";

// const { user, setUser } = useContext(UserContext);
// setUser({ ...user, username: '' });
// const { username } = user;
