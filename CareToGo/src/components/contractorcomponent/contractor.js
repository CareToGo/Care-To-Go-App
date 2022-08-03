import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Contractor = ({ worker }) => {
  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.navigate("contractor-details");
  };

  return (
    <Pressable onPress={pressHandler} style={styles.resturauntContainer}>
      <Image
        source={{
          uri: worker.image,
        }}
        style={styles.image}
      />

      <View style={styles.background}>
        <Text style={styles.nurseTitle}>{worker.name}</Text>
        <Text style={styles.details}>
          {" "}
          -{worker.rating}- &#8226; -experience- &#8226; -distance-
        </Text>
      </View>
    </Pressable>
  );
};

export default Contractor;

const styles = StyleSheet.create({
  resturauntContainer: {
    width: "90%",
    marginVertical: 10,
  },

  image: {
    width: "100%",
    aspectRatio: 4 / 3,
  },

  nurseTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginHorizontal: 10,
  },

  details: {
    color: "white",
    marginVertical: 5,
    marginHorizontal: 10,
    marginBottom: 20,
  },

  background: {
    backgroundColor: "#4D80C5",
  },
});
