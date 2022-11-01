import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  Dimensions,
  Image
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../../models";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";


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
  const navigation = useNavigation();
  const isAWSDate =
    /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)?$/;

  const onSave = async () => {
    if (dbUser) {
      await updateUser();
      navigation.goBack();
    } else {
      await createUser();
    }
  };

  const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');

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
          contactnum,
        })
      );
      setDbUser(user);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <View>
      <View style={{ ...styles.mainContainer, padding: "0%", height: SCREEN_HEIGHT / 4 }}>

        <View style={{ width: "100%", borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={{ uri: 'https://i.ibb.co/gvpcXQr/23333927-361240270993890-3212046802957152739-o.jpg' }}
            style={{ width: "30%", height: undefined, aspectRatio: 1, borderRadius: 100 }}
          />
        </View>

        <View style={{ width: "100%", borderWidth: 1, marginTop: -30, alignItems: 'center' }}>
          <Text
            style={{
              color: "#001A72",
              fontSize: ((SCREEN_WIDTH / firstname.length) > 33 ? 33 : (SCREEN_WIDTH / firstname.length)),
              fontWeight: "bold"
            }}>
            {firstname}
          </Text>
        </View>

        {/* <GooglePlacesAutocomplete
          placeholder="Type a place"
          query={{key: GOOGLE_MAPS_APIKEY}}
          fetchDetails={true}
          minLength={2}
          onPress={(data, details = null) => console.log(data, details)}
          onFail={error => console.log(error)}
          onNotFound={() => console.log('no results')}
        /> */}
        <View style={{ width: "100%", borderWidth: 1, height: 100 }}>
          <GooglePlacesAutocomplete
            placeholder="Address"
            styles={styles.input}
            nearbyPlacesAPI="GooglePlacesSearch"
            onPress={(data, detail = null) => {
              setAddress(data.description);

              setLat(detail.geometry.location.lat);
              setLng(detail.geometry.location.lng);
            }}
            fetchDetails={true}
            enablePoweredByContainer={false}
            minLength={2}
            query={{ key: "AIzaSyAwqJ3mR3salkuJ6noO2q9RvslWxIX5t3Y", language: "en" }}
            debounce={400}
          />
        </View>


      </View>

      <ScrollView style={{ paddingHorizontal: "3%", paddingVertical: 0 }}>
        <SafeAreaView>
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
            placeholder="Date of Birth (YYYY/MM/DD)"
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
          <Button
            onPress={onSave}
            title="Save"
            style={{ margin: 10, backgroundColor: "blue" }}
          />
          <Text
            onPress={() => Auth.signOut()}
            style={{ textAlign: "center", color: "red", margin: 10 }}
          >
            Sign Out
          </Text>
        </SafeAreaView>
        <View />
      </ScrollView>
    </View>
  );
};

export default EditUserProfile;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 0,
    // flexDirection: "row",
  },
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
