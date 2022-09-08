import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { Auth } from "aws-amplify";
import UserProfileComp from "../../components/UserProfileComp/UserProfileComp"

export default function UserProfile() {
    return (
      <View style={styles.container}>
        <UserProfileComp />
        <Text
          style={{ textAlign: "center", color: "red", margin: 10 }}
          onPress={() => Auth.signOut()}
        >
          Sign Out
        </Text>
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
});
