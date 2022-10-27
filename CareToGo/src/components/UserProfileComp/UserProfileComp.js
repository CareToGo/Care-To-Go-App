import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet, TouchableHighlight, Image, Dimensions, Pressable, Linking } from "react-native";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Auth } from "aws-amplify";


export default function UserProfileComp() {
  const { dbUser } = useAuthContext();
  const navigation = useNavigation();

  const editprofile = () => {
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
      <View style={{ ...styles.mainContainer, padding: "5%", ...styles.shadowProp, height: SCREEN_HEIGHT / 6, justifyContent: "space-between", elevation: 15, shadowColor: '#CDB050', }}>
        <View style={{ width: "30%", justifyContent: "center", alignItems: "center" }}>
          <Image
            source={{ uri: 'https://i.ibb.co/gvpcXQr/23333927-361240270993890-3212046802957152739-o.jpg' }}
            style={{ width: "95%", height: undefined, aspectRatio: 1, borderRadius: 100 }}
          />
        </View>

        <View style={{ width: "70%", paddingLeft: 30, justifyContent: "space-between" }}>

          <Text
            style={{ fontSize: 12, fontWeight: "bold", color: "gray" }}>
            WELCOME!
          </Text>
          <Text
            style={{
              color: "#001A72",
              fontSize: SCREEN_WIDTH * 0.9 / dbUser.firstname.length,
              fontWeight: "bold"
            }}>
            {dbUser.firstname}
          </Text>
          <Text
            style={{
              color: "#001A72",
              fontSize: 12,
            }}>
            +1{dbUser.contactnum}
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

      <View style={{ paddingLeft: 5, marginTop: SCREEN_HEIGHT / 30, paddingBottom: 5 }}>
        <Text style={{ fontSize: 12, fontWeight: "bold", color: "#B8C5D0" }}>Options</Text>
      </View>
      
      <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="gray" onPress={() => navigation.navigate('EditUserProfile')}>
        <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT/15 }}>
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

      <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="gray" onPress={() => navigation.navigate('EditUserProfile')}>
        <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT/15 }}>
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

      <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="gray" >
        <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT/15 }}>
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

      <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="gray" onPress={ ()=>{ Linking.openURL('https://caretogo.ca')}}>
        <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT/15 }}>
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

      <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="gray" onPress={() => Auth.signOut()} >
        <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT/15 }}>
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

      <View style={{ height: 100 }} />
    </View>
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
