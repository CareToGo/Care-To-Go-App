import { SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const CheckOrder = ({ route }) => {
  const { newOrders, onDecline, onAccept, customer } = route.params;

  return (
    <SafeAreaView style={tw`bg-black h-full`}>
      <View style={tw`flex-row justify-between p-3 items-center`}>
        <Text style={tw`text-3xl p-4 text-white font-semibold`}>
          {customer.given_name} {customer.family_name}
        </Text>
        <View
          style={tw`bg-gray-800 p-3 rounded-full shadow-lg h-12 justify-center items-center`}
        >
          <Icon name="user" color="white" type="antdesign" size={22} />
        </View>
        <Text style={tw`text-white text-lg `}>
          <Icon name="star" color="white" type="antdesign" size={22} />
          {newOrders.userID}
        </Text>
      </View>
      <View style={tw`p-2`}>
        <SafeAreaView style={styles.Container}>
          <View>
            <Text style={tw`text-white p-3 text-xl font-semibold`}>
              Nursing Care
            </Text>
          </View>
          <View
            style={tw`border-t border-gray-200 flex-shrink py-1 text-lg font-semibold`}
          >
            <Text style={tw`text-white px-2 text-lg font-semibold`}>
              {newOrders[0].type}:
            </Text>
            <Text style={tw`text-white px-2 text-lg`}>
              For non-emergency medical concerns.
            </Text>
          </View>
          <View style={tw`py-1 `}>
            <Text style={tw`text-white px-2 text-lg`}>Age: 24</Text>
            <Text style={tw`text-white px-2 text-lg`}>Male</Text>
            <Text style={tw`text-white px-2 text-lg`}>Languages: Korean</Text>
            <Text style={tw`text-white px-2 text-lg`}>address</Text>
            <Text style={tw`text-white p-2 text-lg font-semibold`}>
              Description:
            </Text>
            <Text style={tw`text-white px-2 text-lg`}>description</Text>
          </View>
        </SafeAreaView>
      </View>
      <View style={tw`flex-row justify-evenly p-2`}>
        <Pressable onPress={onDecline} style={styles.declineButton}>
          <Text style={styles.declineText}>Decline</Text>
        </Pressable>
        <Pressable onPress={onAccept} style={styles.declineButton}>
          <Text style={styles.declineText}>Accept</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CheckOrder;

const styles = StyleSheet.create({
  declineButton: {
    backgroundColor: "#1F2937",
    padding: 20,
    borderRadius: 50,
    width: 100,
    alignItems: "center",
    bottom: "20%",
  },
  declineText: {
    color: "white",
    fontWeight: "bold",
  },
  Container: {
    borderRadius: 10,
    height: "80%",
    backgroundColor: "#1F2937",
    padding: 10,
  },
});
