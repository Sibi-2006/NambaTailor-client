import React, { createContext } from "react";

export const GlobalContext = createContext();

export function GlobalVariableProvider({ children }) {
  const baseUrl =  "http://192.168.192.101:3500/api"
  const appName = "Namba Tailor";

  return (
    <GlobalContext.Provider value={{ appName , baseUrl}}>
      {children}
    </GlobalContext.Provider>
  );
}
//