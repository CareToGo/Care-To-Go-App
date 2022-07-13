import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CheckOrder from "../screens/CheckOrder";
import { useState } from "react";


const NewOrderPopup = ({ newOrders, onDecline, onAccept }) => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  const [customer, setCustomer] = useState(null);

  return (
    <View style={styles.root}>
      <Pressable onPress={onDecline} style={styles.declineButton}>
        <Text style={styles.declineText}>Decline</Text>
      </Pressable>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CheckOrder", {
            newOrders: newOrders,
            onDecline: onDecline,
            onAccept: onAccept,
            customer: customer,
          })
        }
        style={styles.popupContainer}
      >
        <View style={styles.row}>
          <Text style={styles.worktype}>
            {/* {customer.given_name} {customer.family_name} */}
          </Text>

          <View
            style={tw`bg-gray-800 p-3 rounded-full shadow-lg h-12 justify-center items-center`}
          >
            <Icon name="user" color="white" type="antdesign" size={22} />
          </View>

          <Text style={tw`text-white text-lg mx-5`}>
            <Icon name="star" color="white" type="antdesign" size={22} />
          </Text>
        </View>

        <Text style={tw`text-white text-lg mx-5`}>{newOrders[0].type}</Text>

        <Text style={tw`text-white text-3xl`}>2 min</Text>
        <Text style={tw`text-white text-xl`}>0.2 mi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewOrderPopup;

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    bottom: "0%",
    width: "100%",
    padding: 20,
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "#00000099",
  },
  popupContainer: {
    backgroundColor: "black",
    borderRadius: 10,
    height: 250,
    alignItems: "center",
    justifyContent: "space-around",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  worktype: {
    color: "white",
    fontSize: 20,
    marginHorizontal: 10,
  },
  declineButton: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 50,
    width: 100,
    alignItems: "center",
    top: "4%",
  },
  declineText: {
    color: "white",
    fontWeight: "bold",
  },
});
