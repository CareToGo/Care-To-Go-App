import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRef, useMemo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { FontAwesome5 } from "@expo/vector-icons";
import orders from "../../../assets/data/orders.json";
import tw from "tailwind-react-native-classnames";

const order = orders[0];

const OrderDelivery = () => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["12%", "95%"], []);
  return (
    <View style={{ backgroundColor: "lightblue", flex: 1 }}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundcolor: "grey", width: 100 }}
      >
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "centre",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 25, letterSpacing: 1 }}>14 min</Text>
          <FontAwesome5
            name="user-nurse"
            size={30}
            color="#1F2937"
            style={{ marginHorizontal: 10 }}
          />
          <Text style={{ fontSize: 25, letterSpacing: 1 }}>5 Km</Text>
        </View>
        <View style={styles.popupContainer}>
          <View style={tw`py-1 `}>
            <Text
              style={{
                fontSize: 25,
                letterSpacing: 1,
                paddingVertical: 20,
                color: "white",
              }}
            >
              {order.User.name}
            </Text>
            <Text
              style={{
                fontSize: 25,
                letterSpacing: 1,
                paddingVertical: 20,
                color: "white",
              }}
            >
              {order.User.address}
            </Text>
            <Text style={{ fontSize: 20, color: "white", fontWeight: "500" }}>
              {order.Nurse.address}
            </Text>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default OrderDelivery;

const styles = StyleSheet.create({
  popupContainer: {
    borderRadius: 10,
    height: "80%",
    backgroundColor: "#1F2937",
    marginTop: 50,
  },
});
