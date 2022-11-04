import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import Contractor from "../../components/contractorcomponent/contractor";
import restaurants from "../../../assets/data/restaurants.json";
import { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Worker } from "../../models";

export default function Homescreen() {
  const [workers, setWorkers] = useState([]);

  const fetchWorkers = async () => {
    const results = await DataStore.query(Worker);
    setWorkers(results);
    setWorkers((state)=>{console.log(state);return state})
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={workers}
        renderItem={({ item }) => <Contractor worker={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    left: 20,
  },
});
