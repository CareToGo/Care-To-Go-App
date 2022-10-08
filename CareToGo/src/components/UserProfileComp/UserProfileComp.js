import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Image,
  Dimensions,
  Pressable
} from "react-native";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function UserProfileComp() {
  const { dbUser } = useAuthContext();

  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.navigate('EditUserProfile');

  }

  const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');

  const namewidth = SCREEN_WIDTH * 0.75 / (dbUser.firstname.length);
  let namesize;
  if (namewidth <= 27) {
    namesize = namewidth;
  } else {
    namesize = 27;
  }

  return (
    <ScrollView style={{ paddingHorizontal: "5%", paddingBottom: 20 }}>
      <View style={styles.mainContainer}>
        <TouchableHighlight style={styles.editbtn}>
          <Pressable onPress={pressHandler}>
            <MaterialCommunityIcons name="account-edit" size={namesize+3} color="#001A72" />
          </Pressable>
        </TouchableHighlight>
        <Image
          source={{ uri: 'https://i.ibb.co/gvpcXQr/23333927-361240270993890-3212046802957152739-o.jpg' }}
          style={{ width: SCREEN_WIDTH * 0.35, height: SCREEN_WIDTH * 0.4, borderRadius: 10 }}
        />
        <View style={{ paddingLeft: "5%", Top: 10 }}>
          <Text style={{ fontSize: namesize, fontWeight: "bold" }}>{dbUser.firstname} {dbUser.lastname}</Text>
          <View style={{ top: 10 }}>
            <Text
              style={{ fontSize: 12, fontWeight: "bold", color: "#B8C5D0" }}
            >
              Address
            </Text>
            <Text>{dbUser.address}</Text>
          </View>
          <View style={{ top: 10 }}>
            <Text
              style={{ fontSize: 12, fontWeight: "bold", color: "#B8C5D0" }}
            >
              Contact Number
            </Text>
            <Text>+14163181502</Text>
          </View>
          <View style={{ top: 10 }}>
            <Text
              style={{ fontSize: 12, fontWeight: "bold", color: "#B8C5D0" }}
            >
              Emergency Contact
            </Text>
            <Text>+14163181502</Text>
          </View>
        </View>
      </View>

      <View style={styles.mainContainer}>
        <Text style={{ fontSize: 20, fontStyle: "italic" }}>BIO</Text>
        <Text style={{ top: 10, fontSize: 12, paddingHorizontal: 15 }}>
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat..
        </Text>
      </View>

      <View style={styles.mainContainer}>
        <Text
          style={{
            paddingLeft: 20,
            paddingTop: 10,
            fontSize: 12,
            fontStyle: "italic",
            fontWeight: "bold",
          }}
        >
          Emergency Contact
        </Text>
        <View style={{ paddingLeft: 70, paddingTop: 10 }}>
          <Text>Tommy Sawyer</Text>
          <Text>647-420-420</Text>
        </View>
      </View>
      <View style={{ height: 300 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFFFFF",
    padding: "5%",
    borderRadius: 20,
    top: "5%",
    flexDirection: "row",
    marginVertical: "2%",
  },
  editbtn: {
    position: 'absolute',
    right: 3,
    top: +3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailsContainer: { padding: "5%" },
  email: {
    top: 20,
  },
  date: {
    top: 30,
  },
  bioContainer: {
    backgroundColor: "#FFFFFF",
    width: "80%",
    height: "35%",
    borderRadius: 20,
    top: 50,
    left: 45,
  },

  emergencyContainer: {
    backgroundColor: "#FFFFFF",
    width: "80%",
    height: "20%",
    borderRadius: 20,
    top: 70,
    left: 45,
    flexDirection: "row",
  },
});
