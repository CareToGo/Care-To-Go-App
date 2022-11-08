import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableHighlight, Image, Dimensions, Linking, Platform } from "react-native";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Auth } from "aws-amplify";
import Constants from "expo-constants";
import { Storage } from "aws-amplify";
import * as ImagePicker from "expo-image-picker";
import * as Progress from 'react-native-progress'
import { configureFonts } from "react-native-paper";



export default function UserProfile() {
  const { dbUser, sub } = useAuthContext();
  const navigation = useNavigation();
  const [imageLink, setImageLink] = useState('9');
  const [percentage, setPercentage] = useState(0);

  const fetchLink = async () => {
    Storage.get(`${sub}.jpg`)
    .then((mylink) => 
      setImageLink(mylink)
      )
    .catch((e) => console.log(e))
  }

  useEffect(() => {
    fetchLink();
    console.log('--------------------',imageLink)
  }, []);

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
        const uploadUrl = await uploadImage(`${sub}.jpg`, img);
        console.log(uploadUrl);
        const result = await Storage.get(uploadUrl);
        console.log(result);
        setImageLink(result);
        setPercentage(0);
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

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const editprofile = () => {
    navigation.navigate('EditUserProfile', { thelink: imageLink });
  }

  const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');


  return (
    <SafeAreaView style={{ paddingHorizontal: "0%", paddingVertical: 0 }}>
      <View style={{ backgroundColor: "#FFFFFF", padding: "3%", ...styles.shadowProp, height: SCREEN_HEIGHT / 4.5, justifyContent: "space-between", elevation: 15, shadowColor: '#296899' }}>
        <View style={{ borderWidth: 0, width: '100%', flexDirection: "row" }}>
          <View style={{ width: "30%", justifyContent: "center", alignItems: "center" }}>
            <Image
              source={{ uri: imageLink }}
              style={{ width: "95%", height: undefined, aspectRatio: 1, borderRadius: 100 }}
            />
            <MaterialCommunityIcons
              onPress={pickImage}
              name="image-edit"
              size={24} color="#001A72"
              style={{ marginTop: -15, marginLeft: Platform.OS === 'ios' ? 60 : 60 }}
            />
          </View>

          <View style={{ width: "70%", marginLeft: 15, justifyContent: "flex-end", borderLeftWidth: 1, paddingLeft: 15, borderLeftColor: 'lightgray' }}>

            <Text
              style={{ fontSize: 12, fontWeight: "bold", color: "gray" }}>
              WELCOME!
            </Text>
            <Text
              style={{
                color: "#001A72",
                fontSize: ((SCREEN_WIDTH * 0.9 / dbUser.firstname.length) > 33 ? 33 : (SCREEN_WIDTH * 0.9 / dbUser.firstname.length)),
                fontWeight: "bold"
              }}>
              {dbUser.firstname}
            </Text>
            <Text
              style={{
                color: "#001A72",
                fontSize: 12,
              }}>
              {dbUser.contactnum}
            </Text>
            <Text
              style={{
                color: "#001A72",
                fontSize: 12,
              }}>
              {dbUser.email}
            </Text>
          </View>
        </View>

        <View style={{ width: '100%', height: 20, borderWidth: 0, alignItems: 'center', justifyContent: 'center' }}>
          {percentage !== 0 && (
            <Progress.Bar progress={percentage / 100} width={SCREEN_WIDTH * 0.75} color='#001A72' />
          )}
        </View>

      </View>

      <View style={{ paddingLeft: 5, marginTop: SCREEN_HEIGHT / 30, paddingBottom: 5 }}>
        <Text style={{ fontSize: 12, fontWeight: "bold", color: "#B8C5D0" }}>OPTIONS</Text>
      </View>

      <View style={{ ...styles.shadowProp, elevation: 15, shadowColor: '#296899', borderWidth: 0 }}>
        <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="lightgray" onPress={() => editprofile()} >
          <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT / 15 }}>
            <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons name="account-edit" size={30} color="#001A72" />
            </View>
            <View style={{ width: "75%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center' }}>
              <Text style={{ fontSize: 16 }}>Edit Profile</Text>
            </View>
            <View style={{ width: "10%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="lightgray" onPress={() => sizeOnTouch()} >
          <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT / 15 }}>
            <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name="accessible" size={30} color="#001A72" />
            </View>
            <View style={{ width: "75%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center' }}>
              <Text style={{ fontSize: 16 }}>Accessibility Settings</Text>
            </View>
            <View style={{ width: "10%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="lightgray" >
          <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT / 15 }}>
            <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons name="file-document" size={30} color="#001A72" />
            </View>
            <View style={{ width: "75%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center' }}>
              <Text style={{ fontSize: 16 }}>Terms of Services</Text>
            </View>
            <View style={{ width: "10%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="lightgray" onPress={() => { Linking.openURL('https://caretogo.ca') }}>
          <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT / 15 }}>
            <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons name="web" size={30} color="#001A72" />
            </View>
            <View style={{ width: "75%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center' }}>
              <Text style={{ fontSize: 16 }}>Visit Our Website!</Text>
            </View>
            <View style={{ width: "10%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="lightgray" onPress={() => Auth.signOut()} >
          <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT / 15 }}>
            <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons name="logout-variant" size={30} color='#E87272' />
            </View>
            <View style={{ width: "75%", borderBottomWidth: 0, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: '#E87272' }}>Log Out</Text>
            </View>
            <View style={{ width: "10%", borderBottomWidth: 0, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
            </View>
          </View>
        </TouchableHighlight>
      </View>

      <View style={{ marginTop: SCREEN_HEIGHT / 10, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: SCREEN_HEIGHT / 70, color: "lightgray" }}>CareToGo V. 1.0.0</Text>
        <Text style={{ fontSize: SCREEN_HEIGHT / 70, color: "lightgray" }}>© 2022 BelairCareMedical All Rights Reserved</Text>
        <Image
          source={{ uri: 'https://i.ibb.co/xFGw8GR/BCM.png' }}
          style={{ width: SCREEN_HEIGHT / 30, height: undefined, aspectRatio: 0.87 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 0,
    flexDirection: "row",
  },
  shadowProp: {
    shadowColor: '#CDB050',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

