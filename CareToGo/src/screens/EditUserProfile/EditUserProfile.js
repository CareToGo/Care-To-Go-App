import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../../models";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { Storage } from "aws-amplify";
import * as Clipboard from "expo-clipboard";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import { set } from "react-native-reanimated";
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  const [imageData, setImageData] = useState(null);
  const [percentage, setPercentage] = useState(0);

  const onSave = async () => {
    if (dbUser) {
      console.log('---------------------------')
      console.log(imageData)
      await updateUser();
      navigation.goBack();
    } else {
      await createUser();
    }
  };

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const cameraRollStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (
          cameraRollStatus.status !== "granted" ||
          cameraStatus.status !== "granted"
        ) {
          alert("Sorry, we need these permissions to make this work!");
        }
      }
    })();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      aspect: [4, 3],
      quality: 1,
    });
    handleImagePicked(result);
  };

  const handleImagePicked = async (pickerResult) => {
    try {
      if (pickerResult.cancelled) {
        alert("Upload Cancelled");
        return;
      } else {
        setPercentage(0);
        const img = await fetchImageFromUri(pickerResult.uri);
        const uploadUrl = await uploadImage({ sub } + ".jpg", img);
        const result = await Storage.get(uploadUrl);
        setImageData(result);
        setImageData((state) => {
          console.log(state);
          return state;
        });
      }
    } catch (e) {
      console.log(e);
      alert("Upload Failed!");
    }
  };

  const uploadImage = (filename, img) => {
    Auth.currentCredentials();
    return Storage.put(filename, img, {
      level: "public",
      contentType: "image/jpeg",
      progressCallback(progress) {
        setLoading(progress);
      },
    })
      .then((response) => {
        return response.key;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  };

  const setLoading = (progress) => {
    const calculated = parseInt((progress.loaded / progress.total) * 100);
    updatePercentage(calculated);
  };

  const updatePercentage = (number) => {
    setPercentage(number);
  };

  // const downloadImage = (uri) => {
  //   Storage.get(uri)
  //     .then((result) => setImage(result))
  //     .catch((err) => console.log(err));
  // };

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");

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
        updated.image = imageData ? imageData : dbUser.image;
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
          image: imageData,
        })
      );
      setDbUser(user);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <View>
      <View
        style={{
          ...styles.mainContainer,
          padding: "0%",
          height: SCREEN_HEIGHT / 4,
        }}
      >
        <View
          style={{
            width: "100%",
            borderWidth: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {imageData || dbUser ? (
            <Image
              source={{
                uri: imageData ? imageData : dbUser.image,
              }}
              style={{
                width: "30%",
                height: undefined,
                aspectRatio: 1,
                borderRadius: 100,
              }}
            />
          ) : (
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqXhATMW-sSeAdbYfIGpe9hNhBCo_S_T1EblnSnfKYMw&s",
              }}
              style={{
                width: "30%",
                height: undefined,
                aspectRatio: 1,
                borderRadius: 100,
              }}
            />
          )}
          <MaterialCommunityIcons
            onPress={pickImage}
            name="image-edit"
            size={24} color="#001A72"
            style={{ position: 'absolute', top: 90, right: 140, backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: 10 }}
          />
        </View>

        <View
          style={{
            width: "100%",
            borderWidth: 0,
            marginTop: 0,
            alignItems: "center",
          }}
        >
          {/* <Text
            style={{
              color: "#001A72",
              fontSize: SCREEN_WIDTH / firstname.length > 33 ? 33 : SCREEN_WIDTH / firstname.length,
              fontWeight: "bold",
            }}
          >
            {firstname}
          </Text> */}
          <View style={{ width: "90%", height: 300, marginTop: 30,  }}>
            <GooglePlacesAutocomplete
              placeholder = {dbUser?dbUser.address:"Address"}
              styles={{
                textInputContainer: {
                  backgroundColor: 'grey',
                },
                textInput: {
                  height: 38,
                  color: '#5d5d5d',
                  fontSize: 16,
                  backgroundColor: 'lightgray'
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
              onPress={(data, detail = null) => {
                setAddress(data.description);

                setLat(detail.geometry.location.lat);
                setLng(detail.geometry.location.lng);
              }}
              fetchDetails={true}
              enablePoweredByContainer={false}
              minLength={2}
              query={{
                key: "AIzaSyAwqJ3mR3salkuJ6noO2q9RvslWxIX5t3Y",
                language: "en",
              }}
              debounce={400}
            />
          </View>
        </View>
      </View>

      <ScrollView style={{ paddingHorizontal: "3%", paddingVertical: 0, zIndex: -100 }}>
        <SafeAreaView>
          {/* <View style={styles.container}>
            {percentage !== 0 && (
              <Text style={styles.percentage}>{percentage}%</Text>
            )}
          </View> */}
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
        <View style={{ height: 200 }} />
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  titles: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    marginHorizontal: 15,
  },
  percentage: {
    marginBottom: 10,
  },
  result: {
    paddingTop: 5,
  },
  info: {
    textAlign: "center",
    marginBottom: 20,
  },
});
