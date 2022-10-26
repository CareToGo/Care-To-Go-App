import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import Map from "../../../assets/contractor-details-page/contractorDetailsMap.png";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList } from "react-native";

const ContractorDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const services = JSON.parse(JSON.parse(route.params.service));

  const pressHandler = () => {
    navigation.navigate("orders", {
      id: route.params.id,
      service: route.params.service,
    });
  };

  return (
    <View style={styles.container}>
      <Image source={Map} style={styles.image} />

      <View style={styles.textContainers}>
        <View style={styles.nurseTitleContainer}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            {route.params.name} &#8226; RN
          </Text>
          <Text style={{ top: 5 }}>I'm Nick, I like helping people</Text>
        </View>
        <View style={styles.tagContainer}>
          <Text
            style={{
              marginVertical: 10,
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            {" "}
            Verified{" "}
          </Text>

          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            {" "}
            Save{" "}
          </Text>
        </View>
      </View>

      <View style={styles.button}>
        <Pressable onPress={pressHandler}>
          <Text style={{ color: "yellow" }}>Schedule</Text>
        </Pressable>
      </View>

      <View style={styles.services}>
        <Text style={{ color: "lightgray", fontWeight: "bold" }}>
          Services Provided
        </Text>
      </View>

      <View style={styles.servicesList}>
        <FlatList
          data={services}
          horizontal={true}
          keyExtractor={(item) => item.id}
          renderItem={({ item: { id, name, description, price }, item }) => (
            <Text style={{ fontWeight: "bold", marginHorizontal: 10 }}>
              {name}
            </Text>
          )}
        />
      </View>

      <View style={styles.experience}>
        <Text style={{ color: "lightgray", fontWeight: "bold" }}>
          {" "}
          Experience (4)
        </Text>
      </View>

      <View style={styles.experiencesList}>
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
          Registered Nurse
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 13, color: "#A6A6A6" }}>
          Mental Health - St. Joseph's Hospital
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 13, color: "#A6A6A6" }}>
          Sep 2020 - Present
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    left: 20,
  },

  image: {
    top: 50,
  },
  textContainers: {
    flex: 1,
    flexDirection: "row",
    top: 10,
  },

  nurseTitleContainer: {
    top: 65,
  },
  tagContainer: {
    top: 60,
    left: 120,
  },
  button: {
    position: "absolute",
    top: 440,
    left: 100,
    paddingHorizontal: 48,
    paddingVertical: 12,
    backgroundColor: "#001A72",
    borderRadius: 10,
  },
  services: {
    position: "absolute",
    top: 500,
  },
  servicesList: {
    position: "absolute",
    left: 30,
    flexWrap: "wrap",
    flexDirection: "row",
    top: 530,
    marginVertical: 5,
  },
  experience: {
    position: "absolute",
    top: 560,
  },

  experiencesList: {
    position: "absolute",
    top: 590,
    left: 40,
  },
});

export default ContractorDetails;
