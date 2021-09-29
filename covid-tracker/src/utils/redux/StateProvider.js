import React, { createContext, useContext, useReducer } from "react";

// Prepares data layer
export const StateContext = createContext();

// Provider the Data layer
export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

// pull info from data layer
export const useStateValue = () => useContext(StateContext);
