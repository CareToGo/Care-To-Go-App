import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import { useRef, useCallback, useState, useMemo, useEffect } from "react";
import { useBasketContext } from "../../contexts/BasketContext";
import { CardForm, useStripe } from "@stripe/stripe-react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Service, Worker } from "../../models";
import { DataStore } from "aws-amplify";

const OrderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [worker, setWorker] = useState(null);
  const [services, setServices] = useState([]);

  const [count, setCount] = useState(0);
  const pressHandler = () => {
    navigation.navigate("date-picker");
  };

  const id = route.params.id;

  useEffect(() => {
    DataStore.query(Worker, id).then(setWorker);
    DataStore.query(Service, (service) => service.workerID("eq", id)).then(
      setServices
    );
  }, []);

  const { createOrder } = useBasketContext();

  const onAddToOrder = async () => {
    Object.keys(selected).forEach(function (key) {
      if (selected[key] === false) {
        delete selected[key];
      }
    });

    const keys = Object.keys(selected);
    let service_array = [];
    service_array = services.filter((g) => keys.includes(g.id)).map((g) => g);
    service_string = JSON.stringify(service_array);
    await createOrder(service_string, service_array.length * 35);
  };

  const [selected, setSelected] = useState({});

  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => [370], []);

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const placeOrder = () => {};

  return (
    <View style={styles.mainContainer}>
      <ScrollView nestedScrollEnabled={true} style={styles.container}>
        <View>
          <Text style={tw`text-center py-5 text-lg `}>Select</Text>
        </View>
        <View style={tw`border-t border-gray-200 flex`}></View>

        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View style={tw` border-t border-gray-200 flex-shrink py-0`} />
          )}
          renderItem={({ item: { id, name, description, price }, item }) => (
            <TouchableOpacity
              onPress={() => {
                let newSelected = { ...selected };
                newSelected[item.id] = !newSelected[item.id];
                setSelected(newSelected);
              }}
              style={tw`flex-row items-center justify-between p-5 ${
                selected[id] && "bg-gray-200"
              }`}
            >
              <View>
                <Text style={tw`font-semibold text-lg`}>{name}</Text>
                <Text style={tw`text-gray-500`}>{description}</Text>
              </View>
              <Text style={tw`text-lg`}>${price}</Text>
            </TouchableOpacity>
          )}
        />

        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.now}
            onPress={() => {
              handleSnapPress(0);
              onAddToOrder();
            }}
          >
            <Text style={{ color: "white" }}>Now</Text>
          </Pressable>

          <Pressable onPress={pressHandler} style={styles.later}>
            <Text>Later</Text>
          </Pressable>
        </View>
      </ScrollView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <BottomSheetView>
          <View style={styles.name}>
            <TextInput
              style={styles.input}
              placeholder="Enter Your First Name"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Your Last Name"
            />
          </View>
          <CardForm
            onFormComplete={(cardDetails) => {
              console.log("card details", cardDetails);
              setCard(cardDetails);
            }}
            style={{ height: 200, marginHorizontal: 10, top: 10 }}
          />
          <View style={styles.buttonContainer}>
            <Pressable onPress={placeOrder} style={styles.placeOrder}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 17,
                  color: "#FFDE59",
                  textAlign: "center",
                }}
              >
                Place Order
              </Text>
            </Pressable>
            <Pressable onPress={() => handleClosePress()} style={styles.close}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 17,
                  color: "#FFFFFF",
                  textAlign: "center",
                }}
              >
                Close
              </Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
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
    top: 40,
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
  name: {
    flexDirection: "row",
  },
  input: {
    height: 40,
    width: "44%",
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginLeft: 20,
  },
  placeOrder: {
    backgroundColor: "#001A72",
    width: "55%",
    borderRadius: 20,
    paddingVertical: 20,
  },
  close: {
    backgroundColor: "#000000",
    width: "35%",
    borderRadius: 20,
    paddingVertical: 20,
    marginLeft: 15,
  },
});

export default OrderScreen;
