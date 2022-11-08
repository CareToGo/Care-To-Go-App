import { StyleSheet, Text, View, Image, FlatList, StatusBar } from "react-native";
import Contractor from "../../components/contractorcomponent/contractor";
import restaurants from "../../../assets/data/restaurants.json";
import { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Worker } from "../../models";
import { useBasketContext } from "../../contexts/BasketContext";

export default function Homescreen() {
  const { workers } = useBasketContext()
  useEffect(() => {
    console.log(1)
  }, []);

  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"  />
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
