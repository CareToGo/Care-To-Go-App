import { createContext, useContext, useEffect, useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { Worker, Order } from "../models";
import { useAuthContext } from "./AuthContext";

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();
  const [worker, setWorker] = useState(null);
  const [workers, setWorkers] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchWorkers = async () => {
    const results = await DataStore.query(Worker);
    setWorkers(results);
    setWorkers((state)=>{
      return state})
  };

  const queryWorkers = async () => {
    const subscription = DataStore.observeQuery(Worker)
    .subscribe(snapshot => {
      const { items } = snapshot;
      setWorkers(items)
    });
  }

  useEffect(() => {
    queryWorkers();
  }, []);

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
    <BasketContext.Provider value={{ createOrder, setWorker, workers }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
