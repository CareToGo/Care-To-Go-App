import { createContext, useContext, useEffect, useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { Basket } from "../models";

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  const addServiceToBasket = (Service) => {
    console.log("added", Service);
  };

  return (
    <BasketContext.Provider value={{ addServiceToBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
