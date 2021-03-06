import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import { useState } from "react";

const data = [
  {
    id: "3",
    title: "Personal Care",
    screen: "PersonalCare",
    price: 35,
    detail: "Hygiene, dressing, toileting, and mobilizing.",
  },
  {
    id: "4",
    title: "Meal Preparation",
    screen: "MealPreparation",
    price: 35,
    detail: "Nutrition, support, and cooking.",
  },
  {
    id: "5",
    title: "Transportation",
    screen: "Transportation",
    price: 35,
    detail: "Mobility support and driving.",
  },
  {
    id: "6",
    title: "Home Support",
    screen: "HomeSupport",
    price: 35,
    detail: "Light housekeeping and pet care.",
  },
  {
    id: "7",
    title: "Respite Care",
    screen: "RespiteCare",
    price: 35,
    detail: "Companionship and personal Support",
  },
];

const OrderScreen = () => {
  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.navigate("date-picker");
  };
  let initialSelected = {};
  for (let item of data) {
    initialSelected[item.id] = false;
  }
  const [selected, setSelected] = useState(initialSelected);
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={tw`text-center py-5 text-lg `}>Select</Text>
      </View>
      <View style={tw`border-t border-gray-200 flex`}></View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={tw` border-t border-gray-200 flex-shrink py-0`} />
        )}
        renderItem={({ item: { id, title, detail, price }, item }) => (
          <TouchableOpacity
            onPress={() => {
              let newSelected = { ...selected };
              newSelected[item.id] = !newSelected[item.id];
              setSelected(newSelected);
              console.log(newSelected);
            }}
            style={tw`flex-row items-center justify-between p-5 ${
              selected[id] && "bg-gray-200"
            }`}
          >
            <View>
              <Text style={tw`font-semibold text-lg`}>{title}</Text>
              <Text style={tw`text-gray-500`}>{detail}</Text>
            </View>
            <Text style={tw`text-lg`}>${price}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.buttonContainer}>
        <Pressable style={styles.now}>
          <Text style={{ color: "white" }}>Now</Text>
        </Pressable>

        <Pressable onPress={pressHandler} style={styles.later}>
          <Text>Later</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    top: 20,
    left: 25,
  },
  select: {
    justifyContent: "center",
    alignItems: "center",
    top: 50,
  },
  menuitem: {
    top: 60,
    marginVertical: 10,
  },
  item: {
    marginTop: 10,
    flexDirection: "row",
  },
  buttonContainer: {
    top: 100,
    flexDirection: "row",
    left: 10,
  },

  now: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "black",
    marginHorizontal: 20,
  },
  later: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#C4C4C4",
  },
});

export default OrderScreen;
