import {createContext, useState} from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userContext, setUserContext] = useState([])

  function addUser(user) {
    const {id,last_login_date,login,password} = user;
    setUserContext({id,last_login_date,login,password})
  }

  function clearUserContext() {
    setUserContext(null);
  }

  return (
    <UserContext.Provider value={{userContext,addUser,clearUserContext}}>
        {children}
    </UserContext.Provider>
  )
}