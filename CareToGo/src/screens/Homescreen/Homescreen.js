import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
  SafeAreaView,
} from "react-native";
import Contractor from "../../components/contractorcomponent/contractor";
import { useBasketContext } from "../../contexts/BasketContext";

const height = 900;
const width = 428;
export default function Homescreen() {
  const { workers } = useBasketContext();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <FlatList
        data={workers}
        renderItem={({ item }) => <Contractor worker={item} />}
      />
      <View style={styles.bg} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "red",
    transform: [{ translateY: height }],
    borderRadius: 32,
  },
});
