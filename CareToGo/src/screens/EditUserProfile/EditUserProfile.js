import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../../models";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

const EditUserProfile = () => {
  const { dbUser } = useAuthContext();
  const [fname, setFName] = useState(dbUser?.fname || "");
  const [lname, setLName] = useState(dbUser?.lname || "");
  const [address, setAddress] = useState(dbUser?.address || "");
  const [lat, setLat] = useState(dbUser?.lat + "" || "0");
  const [lng, setLng] = useState(dbUser?.lng + "" || "0");
  const { sub, setDbUser } = useAuthContext();
  const [count, setCount] = useState(0);
  const navigation = useNavigation();

  const onSave = async () => {
    if (dbUser) {
      await updateUser();
    } else {
      await createUser();
    }
  };

  const updateUser = async () => {
    const user = await DataStore.save(
      User.copyOf(dbUser, (updated) => {
        updated.firstname = fname;
        updated.lastname = lname;
        updated.address = address;
        updated.lat = parseFloat(lat);
        updated.lng = parseFloat(lng);
        updated._version = count + 1;
      })
    );
    setCount(count + 1);
    setDbUser(user);
    console.log(user.name);
    console.log(count);
  };

  const createUser = async () => {
    try {
      const user = await DataStore.save(
        new User({
          sub,
          address,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          fname,
          lname
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
        value={fname}
        onChangeText={setFName}
        placeholder="First Name"
        style={styles.input}
      />
      <TextInput
        value={lname}
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