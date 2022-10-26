import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet, TouchableHighlight, Image, Dimensions, Pressable } from "react-native";
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

  const namewidth = SCREEN_WIDTH / (dbUser.firstname.length + dbUser.lastname.length);
  let namesize = 33;
  if (namewidth <= 33) {
    namesize = namewidth;
  } else {
    namesize = 33;
  }

  return (
    <View style={{ paddingHorizontal: "0%", paddingVertical: 0 }}>
      <View style={{ ...styles.mainContainer, ...styles.shadowProp, height: 105, justifyContent: "space-between", elevation: 15, shadowColor: '#CDB050', }}>
        <View style={{ width: "30%", justifyContent:"center", alignItems:"center" }}>
          <Image
            source={{ uri: 'https://i.ibb.co/gvpcXQr/23333927-361240270993890-3212046802957152739-o.jpg' }}
            style={{ width: "80%", height: undefined, aspectRatio: 1, borderRadius: 100 }}
          />
        </View>

        <View style={{ width: "70%", padding: "3%", justifyContent: "space-between" }}>
          
          <Text 
            style={{
              fontStyle: "italic",
              fontSize: 12,
              fontWeight: "bold",
              color: "gray"
            }}>
              WELCOME!
          </Text>
          <Text 
            style={{
              color:"#001A72",
              fontSize: SCREEN_WIDTH/dbUser.firstname.length,
              fontWeight: "bold"
            }}>
              {dbUser.firstname}
          </Text>  
          <Text 
            style={{
              color:"#001A72",
              fontSize: 12,
            }}>
              +1{dbUser.contactnum}
          </Text> 
          <Text 
            style={{
              color:"#001A72",
              fontSize: 12,
            }}>
              {dbUser.email}
          </Text>  
        </View>

        <View style={{ ...styles.mainContainer }}>

          
          <Text 
            style={{
              fontStyle: "italic",
              fontSize: 12,
              fontWeight: "bold",
              color: "gray"
            }}>
              WELCOME!
          </Text>

        </View>

      </View>

      {/* <View style={styles.mainContainer}>
        <Text style={{ fontSize: namewidth, fontStyle: "italic", width: "15%", paddingRight: 10 }} numberOfLines={1} adjustsFontSizeToFit >BIO</Text>
        <View style={{ width: "85%", padding: 10, borderColor: "#001A72", paddingVertical: 5, borderLeftWidth: 2, backgroundColor: "#EBF5FB", borderRadius: 10 }}>
          <Text style={{ fontSize: 15, textAlign: "justify" }}>
            I am a student / young adult. I am mainly using this app for my routine std checkups.
            I find it extremely convinient that a nurse can come to me at the comfort of my own home to help me deliver test kits and samples,
            and it is very reasonably priced.
            I am thrilled to start using this platform.
          </Text>
          <View style={{ height: 10 }}>
          </View>
        </View>
      </View>

      <View style={styles.mainContainer}>
        <Text style={{ fontSize: namewidth, fontStyle: "italic", width: "21%", paddingRight: 10 }} numberOfLines={1} adjustsFontSizeToFit >MORE</Text>
        <View style={{ width: "79%", padding: 10, borderColor: "#001A72", paddingVertical: 5, borderLeftWidth: 2, backgroundColor: "#EBF5FB", borderRadius: 10 }}>
          <Text style={{ fontSize: 12, fontWeight: "bold", color: "#B8C5D0" }}>Emergency Contact</Text>
          <Text>+1647420420</Text>
        </View>
      </View> */}
      <View style={{ height: 100 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFFFFF",
    padding: "5%",
    borderRadius: 0,
    // top: "5%",
    flexDirection: "row",
    // marginVertical: "2%",
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
  shadowProp: {
    shadowColor: 'green',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
