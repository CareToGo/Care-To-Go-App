import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useBasketContext } from "../../contexts/BasketContext";

const Contractor = ({ worker }) => {
  const navigation = useNavigation();

  const pressHandler = () => {
    // const data = JSON.stringify(worker);
    // const dict = JSON.parse(data);

    navigation.navigate("contractor-details", worker);
    console.log(worker);
  };

  return (
    <TouchableOpacity
      onPress={pressHandler}
      style={{ marginBottom: 10, height: 200, padding: 10 }}
    >
      <View style={styles.container}>
        <Text style={styles.nurseTitle}>{worker.firstName}</Text>
        <Text style={styles.details}>{worker.experienceDescription}</Text>
        <Image
          source={{
            uri: "http://www.by-lee.com/nurse0.jpg",
          }}
          style={styles.image}
        />
      </View>
      {/* 

      <View style={styles.background}>
        <Text style={styles.nurseTitle}>{worker.name}</Text>
        <Text style={styles.details}>
          {" "}
          -{worker.rating}- &#8226; -experience- &#8226; -distance-
        </Text>
      </View> */}
    </TouchableOpacity>
  );
};

export default Contractor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#4D80C5",
    borderRadius: 16,
  },

  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    position: "absolute",
    bottom: 0,
    right: 15,
  },

  nurseTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 15,
    marginHorizontal: 10,
  },

  details: {
    color: "white",
    fontSize: 11,
    opacity: 0.7,
    marginVertical: 5,
    marginHorizontal: 10,
    marginBottom: 20,
  },
});
