import { createContext, useContext, useEffect, useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { Basket, Order } from "../models";
import { useAuthContext } from "./AuthContext";

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();
  const [worker, setWorker] = useState(null);
  const [total, setTotal] = useState(0);

  const createOrder = async (Service, price) => {
    console.log(worker);
    const newOrder = await DataStore.save(
      new Order({
        userID: dbUser.id,
        Worker: worker,
        status: "NEW",
        total: price,
        service: JSON.stringify(Service),
      })
    );
  };

  return (
    <BasketContext.Provider value={{ createOrder, setWorker }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
