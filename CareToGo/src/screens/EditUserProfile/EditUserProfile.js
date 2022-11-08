import { TouchableOpacity, ImageBackground, Animated, View, Text, TextInput, StyleSheet, Button, Alert, ScrollView, Dimensions, Image, Platform, Pressable } from "react-native";
import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { User } from "../../models";
import { useAuthContext } from "../../contexts/AuthContext";
import { DataStore } from "aws-amplify";
import cardbg from "../../../assets/backgrounds/card.png"
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, route } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { Storage } from "aws-amplify";
import Constants from "expo-constants";
import * as Progress from 'react-native-progress';
import { CognitoUserPool } from "amazon-cognito-identity-js";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

const EditUserProfile = ({ route, navigation }) => {
  const thelink = route.params;
  const { dbUser, sub, setDbUser } = useAuthContext();
  const [firstname, setFName] = useState(dbUser?.firstname || "");
  const [lastname, setLName] = useState(dbUser?.lastname || "");
  const [dob, setDOB] = useState(dbUser?.dob || "");
  const [email, setEmail] = useState(dbUser?.email || "");
  const [contactnum, setNum] = useState(dbUser?.contactnum || "");
  const [address, setAddress] = useState(dbUser?.address || "");
  const [lat, setLat] = useState(dbUser?.lat + "" || "0");
  const [lng, setLng] = useState(dbUser?.lng + "" || "0");
  const [date, setDate] = useState(new Date('1996-12-25'));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [addyshow, setAddyShow] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log(thelink.thelink)
  }, []);

  const fadeIn = () => {
    showDatepicker();
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 500
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closePicker = () => {
    if (Platform.OS === 'ios') {
      fadeOut();
      const timeId = setTimeout(() => {
        setShow(false);
      }, 500)
      return () => {
        clearTimeout(timeId)
      }
    }
  }

  const onChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShow(false);
      const currentDate = selectedDate;
      var year = currentDate.getFullYear();
      var month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      var day = currentDate.getDate().toString().padStart(2, "0");
      var bday = year + '-' + month + '-' + day;
      console.log(year + '-' + month + '-' + day);
      setDOB(bday);
      setDate(new Date(currentDate));
    }    
    if (Platform.OS === 'ios') {
      const currentDate = selectedDate;
      var year = currentDate.getFullYear();
      var month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      var day = currentDate.getDate().toString().padStart(2, "0");
      var bday = year + '-' + month + '-' + day;
      console.log(year + '-' + month + '-' + day);
      setDOB(bday);
      setDate(new Date(currentDate));
      // fadeOut();
      // const timeId = setTimeout(() => {
      //   setShow(false);
      // }, 500)
      // return () => {
      //   clearTimeout(timeId)
      // }
    }
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(true);
    } else if (Platform.OS === 'ios') {
      setShow(true);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
    console.log('pressed')
  };

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
        updated.ver = parseInt(dbUser.ver + 1);
        updated.image = dbUser.image;
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
          address: 'supernintendo',
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
    <View style={{ alignItems: 'center' }}>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        {/* Card Component vvv */}
        <View style={{ ...styles.mainContainer, alignItems: 'center', borderRadius: 10, elevation: 12 }}>
          <ImageBackground source={cardbg} resizeMode="stretch" imageStyle={{ borderRadius: 10 }}>
            <View style={{ width: '97%', flexDirection: "row", alignItems: 'center', borderWidth: 0, borderRadius: 10 }}>
              <View style={{ width: "25%", height: "100%", alignItems: 'center', borderWidth: 0 }}>
                <View style={{ width: '80%', borderWidth: 0, alignItems: 'center', paddingTop: 20 }}>
                  <Image source={{ uri: thelink.thelink }} style={{ width: "100%", height: undefined, aspectRatio: 1, borderRadius: 10 }} />
                </View>
              </View>
              <View style={{ paddingBottom: 10, paddingRight: 30, borderWidth: 0, width: "75%", flexDirection: 'column', justifyContent: "center", alignItems: 'center', borderRadius: 11 }}>
                <View style={styles.inputContainer}>
                  <View style={{ justifyContent: 'center', width: 24 }}>
                    <Ionicons name="person-circle-outline" size={21} color="lightgray" />
                  </View>
                  <TextInput
                    style={{
                      flex: 1,
                      color: 'white',
                      paddingLeft: 10,
                      fontSize: ((SCREEN_WIDTH * 0.7 / firstname.length) > 24 ? 24 : (SCREEN_WIDTH * 0.7 / firstname.length))
                    }}
                    autoCapitalize='words'
                    onChangeText={setFName}
                    value={firstname} />
                </View>
                <View style={styles.inputContainer}>
                  <View style={{ justifyContent: 'center', width: 24 }}>
                    <Ionicons name="person-circle" size={21} color="lightgray" />
                  </View>
                  <TextInput
                    style={{
                      flex: 1,
                      color: 'white',
                      paddingLeft: 10,
                      fontSize: ((SCREEN_WIDTH * 0.7 / lastname.length) > 24 ? 24 : (SCREEN_WIDTH * 0.7 / lastname.length))
                    }}
                    autoCapitalize='words'
                    value={lastname}
                    placeholder="Last Name"
                    onChangeText={setLName} />
                </View>
                <View style={{ ...styles.inputContainer, width: '100%', justifyContent: 'flex-start' }}>
                  <View style={{ justifyContent: 'center', width: 24 }}>
                    <FontAwesome name="birthday-cake" size={21} color="lightgray" />
                  </View>
                  <Pressable style={{ alignItems: 'center', justifyContent: 'center' }} onPress={fadeIn}>
                    <Text style={{
                      color: 'white',
                      paddingLeft: 10,
                      fontSize: ((SCREEN_WIDTH * 0.7 / dob.length) > 24 ? 24 : (SCREEN_WIDTH * 0.7 / dob.length))
                    }}>
                      {dob}
                    </Text>
                    {Platform.OS == 'android' && show && (
                      <DateTimePicker
                        diplay="spinner"
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange} />
                    )}
                  </Pressable>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        {/* Card Component ^^^ */}

        {/* Contact */}
        <View style={{ ...styles.shadowProp, borderColor: '#001A72', elevation: 6, backgroundColor: '#FFFFFF', paddingVertical: 10, paddingHorizontal: 30, width: "97%", flexDirection: 'column', justifyContent: "center", alignItems: 'center', borderRadius: 10 }}>
          <Text style={{ width: '115%', fontWeight: 'bold', color: 'lightgray' }}>
            Contact
          </Text>
          <View style={{ ...styles.inputContainer, borderColor: '#001A72', borderBottomWidth: 2, height: SCREEN_HEIGHT / 15 }}>
            <View style={{ justifyContent: 'center', width: 24 }}>
              <MaterialCommunityIcons name="email-multiple" size={21} color="#f9a971" />
            </View>
            <TextInput
              style={{
                flex: 1,
                color: "#001A72",
                paddingLeft: 10,
                fontSize: ((SCREEN_WIDTH * 0.9 / email.length) > 24 ? 24 : (SCREEN_WIDTH * 0.9 / email.length))
              }}
              autoCapitalize='words'
              onChangeText={setEmail}
              value={email} />
            <View style={{ justifyContent: 'center', width: 36 }}>
              <Text style={{ color: 'lightgray', fontSize: 9, textAlign: 'right' }}>EMAIL</Text>
            </View>
          </View>

          <View style={{ ...styles.inputContainer, borderColor: '#001A72', borderBottomWidth: 2, height: SCREEN_HEIGHT / 15 }}>
            <View style={{ justifyContent: 'center', width: 24 }}>
              <MaterialIcons name="contact-phone" size={21} color="#f9a971" />
            </View>
            <TextInput
              style={{
                flex: 1,
                color: '#001A72',
                paddingLeft: 10,
                fontSize: ((SCREEN_WIDTH * 0.7 / contactnum.length) > 15 ? 15 : (SCREEN_WIDTH * 0.7 / contactnum.length))
              }}
              autoCapitalize='words'
              value={contactnum}
              placeholder="Phone Number"
              onChangeText={setNum} />
            <View style={{ justifyContent: 'center', width: 36 }}>
              <Text style={{ color: 'lightgray', fontSize: 9, textAlign: 'right' }}>PHONE</Text>
            </View>
          </View>

          <View style={{ ...styles.inputContainer, borderColor: '#001A72', borderBottomWidth: 2, height: SCREEN_HEIGHT / 15 }}>
            <View style={{ justifyContent: 'center', width: 24 }}>
              <Entypo name="phone" size={21} color="#f9a971" />
            </View>
            <TextInput
              style={{
                flex: 1,
                color: '#001A72',
                paddingLeft: 10,
                fontSize: ((SCREEN_WIDTH * 0.7 / contactnum.length) > 15 ? 15 : (SCREEN_WIDTH * 0.7 / contactnum.length))
              }}
              autoCapitalize='words'
              value={'+8613738298368'}
              placeholder="Emergency Phone Number"
            // onChangeText={setNum} 
            />
            <View style={{ justifyContent: 'center', width: 57 }}>
              <Text style={{ color: 'lightgray', fontSize: 9, textAlign: 'right' }}>EMERGENCY</Text>
            </View>
          </View>
        </View>
        {/* Contact */}

        <Button
          onPress={onSave}
          title="Save"
          style={{ margin: 10, backgroundColor: "blue" }}
        />

        <View style={{ height: 500 }} />

        {(Platform.OS == 'ios' && show &&
          <Animated.View style={{ opacity: fadeAnim, position: 'absolute', alignItems: 'center', width: '97%', backgroundColor: 'lightgray', borderRadius: 10 }}>
            <DateTimePicker style={{ width: 300, height: 350, marginLeft: 5 }}
              testID="dateTimePicker"
              display="spinner"
              value={new Date(date)}
              mode={mode}
              is24Hour={true}
              onChange={onChange} />
            <TouchableOpacity
              style={{ backgroundColor: '#007AFF', padding: 10, borderRadius: 10, marginBottom: 10 }}
              onPress={closePicker}
              underlayColor='#FFFFFF'>
              <Text style={{ color: 'white', fontSize: 18 }}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
};


{/* <Text
            style={{
              color: "#001A72",
              fontSize: SCREEN_WIDTH / firstname.length > 33 ? 33 : SCREEN_WIDTH / firstname.length,
              fontWeight: "bold",
            }}
          >
            {firstname}
          </Text> */}
{/* <View style={{ width: "90%", height: 300, marginTop: 30,  }}>
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
          </View> */}

{/* <ScrollView style={{ paddingHorizontal: "3%", paddingVertical: 0, zIndex: -100 }}>
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

          <Text
            onPress={() => Auth.signOut()}
            style={{ textAlign: "center", color: "red", margin: 10 }}
          >
            Sign Out
          </Text>
        <View />
        <View style={{ height: 1000 }} />
      </ScrollView> */}


export default EditUserProfile;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 0,
    marginVertical: 10
  },
  shadowProp: {
    shadowColor: '#001A72',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingBottom: 0,
    borderRadius: 5,
    paddingHorizontal: 5,
    height: SCREEN_HEIGHT / 12,
    justifyContent: 'center'
  },
  cardinput: {
    borderRadius: 10,
    width: '90%',
    height: 30,
    margin: 5,
    borderBottomWidth: 1,
    paddingVertical: 0,
    color: 'white',
    textAlignVertical: 'bottom',
    paddingVertical: 0,
    paddingLeft: 30
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
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
