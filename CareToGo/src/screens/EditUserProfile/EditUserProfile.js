import { View, Text, TextInput, StyleSheet, Button, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../../models";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

const EditUserProfile = () => {
  const { dbUser, sub, setDbUser } = useAuthContext();
  const [firstname, setFName] = useState(dbUser?.firstname || "");
  const [lastname, setLName] = useState(dbUser?.lastname || "");
  const [dob, setDOB] = useState(dbUser?.dob || "");
  const [email, setEmail] = useState(dbUser?.email || "");
  const [contactnum, setNum] = useState(dbUser?.contactnum || "");
  const [address, setAddress] = useState(dbUser?.address || "");
  const [lat, setLat] = useState(dbUser?.lat + "" || "0");
  const [lng, setLng] = useState(dbUser?.lng + "" || "0");
  const [count, setCount] = useState(0);
  const navigation = useNavigation();
  const isAWSDate = /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)?$/;


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
        updated.dob = dob;
        updated.email = email;
        updated.contactnum = contactnum;
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
          dob,
          email,
          contactnum
        })
      );
      setDbUser(user);

    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <ScrollView style={{ paddingHorizontal: "3%", paddingVertical: 0 }}>


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
          value={dob}
          onChangeText={setDOB}
          placeholder="Date of Birth"
          style={styles.input}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
        />
        <TextInput
          value={contactnum}
          onChangeText={setNum}
          placeholder="Phone Number"
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
    </ScrollView>
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
