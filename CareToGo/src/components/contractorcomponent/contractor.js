import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const height = 900;
const width = 428;

const Contractor = ({ worker }) => {
  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.navigate("contractor-details", worker);
    console.log(worker);
  };

  return (
    <TouchableOpacity
      onPress={pressHandler}
      style={{ marginBottom: 10, height: 200, padding: 10 }}
    >
      <View style={styles.container}>
        <Text style={styles.nurseTitle}>
          {worker.firstName} {worker.lastName} {`\u2022 `}
          {worker.profession}
        </Text>
        <Text style={styles.details}>{worker.experienceDescription}</Text>
        <Text></Text>
        <Image
          source={{
            uri: "http://www.by-lee.com/nurse0.jpg",
          }}
          style={styles.image}
        />
        <View
          style={{
            flexDirection: "row",

            alignItems: "center",
          }}
        >
          <View style={{ padding: 5 }}>
            <FontAwesome name="bicycle" size={40} color="white" />
          </View>
          <View style={{ flexDirection: "column", padding: 5 }}>
            <Text> Distance</Text>
            <AntDesign name="staro" size={24} color="white" />
          </View>
        </View>
        <View style={styles.bg} />
      </View>
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
    borderRadius: 32,
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
  bg: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "white",
    transform: [{ translateY: height }],
    borderRadius: 32,
    padding: 10,
    paddingTop: 32 + 10,
  },
});
