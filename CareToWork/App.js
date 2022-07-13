import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";
import OrderItem from "./src/components";
import orders from "./assets/data/orders.json";
import OrdersScreen from "./src/screens/OrdersScreen";
import OrderDelivery from "./src/screens/OrderDelivery";

const order = orders[0];

export default function App() {
  return (
    <View style={styles.container}>
      <OrderDelivery />
      {/* <FlatList
        data={orders}
        renderItem={({item})=> <OrderItem order={item}/>}
      /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop: 50,
  },
});
