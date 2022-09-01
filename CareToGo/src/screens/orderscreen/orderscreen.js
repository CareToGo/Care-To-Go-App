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
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import { useRef, useCallback, useState, useMemo } from "react";
import { useBasketContext } from "../../contexts/BasketContext";
import {CardForm, useStripe } from "@stripe/stripe-react-native";
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

const data = [
  {
    id: "3",
    title: "Personal Care",
    price: 35,
    detail: "Hygiene, dressing, toileting, and mobilizing.",
  },
  {
    id: "4",
    title: "Meal Preparation",
    price: 35,
    detail: "Nutrition, support, and cooking.",
  },
  {
    id: "5",
    title: "Transportation",
    price: 35,
    detail: "Mobility support and driving.",
  },
  {
    id: "6",
    title: "Home Support",
    price: 35,
    detail: "Light housekeeping and pet care.",
  },
  {
    id: "7",
    title: "Respite Care",
    price: 35,
    detail: "Companionship and personal Support",
  },
];

const OrderScreen = () => {
  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.navigate("date-picker");
  };

  const { addServiceToBasket } = useBasketContext();
  const onAddToBasket = async () => {
    Object.keys(selected).forEach(function (key) {
      if (selected[key] === false) {
        delete selected[key];
      }
    });
    const keys = Object.keys(selected);
    const Service = [];

    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (data[j].id == keys[i]) {
          Service.push(data[j]);
        }
      }
    }
    await addServiceToBasket(Service);
    console.log(Service);
  };

  let initialSelected = {};
  for (let item of data) {
    initialSelected[item.id] = false;
  }

  const [selected, setSelected] = useState(initialSelected);

  const sheetRef = useRef(null)
  const snapPoints = useMemo(() => ["50%"], []);

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const placeOrder = () =>  {

  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView nestedScrollEnabled={true} style={styles.container}>
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
        <Pressable style={styles.now} onPress={() => handleSnapPress(0)}>
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
          console.log('card details', cardDetails);
          setCard(cardDetails);
        }}
        style={{height: 200, marginHorizontal: 10, top: 10}}
        />
        <View style={styles.buttonContainer}>
          <Pressable onPress={placeOrder} style={styles.placeOrder}>
            <Text style={{fontWeight: 'bold', fontSize: 17, color:'#FFDE59', textAlign: 'center'}}>Place Order</Text>
          </Pressable>
          <Pressable onPress={() => handleClosePress()} style={styles.close}>
            <Text style={{fontWeight: 'bold', fontSize: 17, color:'#FFFFFF', textAlign: 'center'}}>Close</Text>
          </Pressable>
        </View>
      </BottomSheetView> 
    </BottomSheet>
    </View> 
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
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
    flexDirection: 'row'
  },
  input: {
    height: 40,
    width: '44%',
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginTop: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 20
  },
  placeOrder: {
    backgroundColor: '#001A72',
    width: '55%',
    borderRadius: 20,
    paddingVertical: 20
  },
  close: {
    backgroundColor: '#000000',
    width: '35%',
    borderRadius: 20,
    paddingVertical: 20,
    marginLeft: 15
  }
});

export default OrderScreen;
