import { createContext, useContext, useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Order, Basket } from "../models";
import { useAuthContext } from "./AuthContext";
import { useBasketContext } from "./BasketContext";

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();
  const { worker } = useBasketContext();
  const [total, setTotal] = useState(null);

  const createOrder = () => {
    // const newOrder = await DataStore.save(new Order ({
    //     userID: dbUser.id,
    //     status: 'NEW',
    //     Worker: worker,
    // }
    // ))
  };

  return (
    <OrderContext.Provider value={{ createOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);
