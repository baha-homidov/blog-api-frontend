import React, { useState } from "react";

import AuthContext from "./AuthContext";

const AuthContextProvider = ({ children }) => {
  // Define the state that you want to manage
  const [user, setUser] = useState(false);

  return (
    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
