import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../../models";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

const EditUserProfile = () => {
  const { dbUser ,sub, setDbUser } = useAuthContext();
  const [firstname, setFName] = useState(dbUser?.firstname || "");
  const [lastname, setLName] = useState(dbUser?.lastname || "");
  const [address, setAddress] = useState(dbUser?.address || "");
  const [lat, setLat] = useState(dbUser?.lat + "" || "0");
  const [lng, setLng] = useState(dbUser?.lng + "" || "0");
  const [count, setCount] = useState(0);
  const navigation = useNavigation();

  // useEffect(() => {
  //   DataStore.query(User, (user) => user.sub("eq", sub)).then((users) =>
  //     setDbUser(users[0])
  //   );
  //   console.log(dbUser);
  // }, [sub]);

  const onSave = async () => {
    if (dbUser) {
      await updateUser();
      navigation.goBack();
    } else {
      await createUser();
    }
  };

  const updateUser = async () => {

    const user = await DataStore.save(
      User.copyOf(dbUser, (updated) => {
        updated.firstname = firstname;
        updated.lastname = lastname;
        updated.address = address;
        updated.lat = parseFloat(lat);
        updated.lng = parseFloat(lng);
        updated._version = parseInt(dbUser.ver);
        updated.ver = dbUser.ver + 1;
      })
    );
    console.log(user);
    setDbUser(user);
  };

  const createUser = async () => {
    try {
      const user = await DataStore.save(
        new User({
          sub,
          address,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          firstname,
          lastname, 
          ver: 1,
        })
      );
      setDbUser(user);

    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Edit My Profile</Text>
      <TextInput
        value={firstname}
        onChangeText={setFName}
        placeholder="First Name"
        style={styles.input}
      />
      <TextInput
        value={lastname}
        onChangeText={setLName}
        placeholder="Last Name"
        style={styles.input}
      />
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
        style={styles.input}
      />
      <TextInput
        value={lat}
        onChangeText={setLat}
        placeholder="Latitude"
        style={styles.input}
      />
      <TextInput
        value={lng}
        onChangeText={setLng}
        placeholder="Longitude"
        style={styles.input}
      />
      <Button onPress={onSave} title="Save" style={{ margin: 10, backgroundColor: "blue" }} />
      <Text
        onPress={() => Auth.signOut()}
        style={{ textAlign: "center", color: "red", margin: 10 }}
      >
        Sign Out
      </Text>
    </SafeAreaView>
  );
};

export default EditUserProfile;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    margin: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
  },
});
