import { createContext, useContext, useEffect, useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { Basket } from "../models";
import { useAuthContext } from "./AuthContext";

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();
  const [basket, setBasket] = useState(null);
  const [worker, setWorker] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    DataStore.query(Basket, (b) =>
      b.workerID("eq", worker.id).userID("eq", dbUser.id)
    ).then((baskets) => setBasket(baskets[0]));
  }, [dbUser, worker]);

  const addServiceToBasket = async (Service) => {
    let theBasket = basket || (await createNewBasket());
    console.log(Service);
    DataStore.save(new Basket({ Services: Service, basketID: theBasket.id }));
  };

  const createNewBasket = async () => {
    const newBasket = await DataStore.save(
      new Basket({ userID: dbUser.id, workerID: worker.id })
    );
    setBasket(newBasket);
    return newBasket;
  };

  return (
    <BasketContext.Provider value={{ addServiceToBasket, setWorker }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
