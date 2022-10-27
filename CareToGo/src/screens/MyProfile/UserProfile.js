import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Button,
} from "react-native";
import { Auth } from "aws-amplify";
import UserProfileComp from "../../components/UserProfileComp/UserProfileComp"

export default function UserProfile() {
  return (
    <View style={styles.container}>
      <UserProfileComp />
      {/* <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 15 }}>
        <TouchableHighlight underlayColor="#b55e5e" style={styles.signout} onPress={() => Auth.signOut()}>
          <Text style={{ color: "white" }}>Sign Out</Text>
        </TouchableHighlight>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#C4C4C4",
    bottom: 70,
    left: 120,
  },
  signout: {
    justifyContent: 'center',
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#ff6666",
    padding: 10,
    width: 120,
    borderRadius: 6
  }
});
