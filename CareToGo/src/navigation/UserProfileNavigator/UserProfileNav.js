import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfile from "../../screens/MyProfile/UserProfile";
import EditUserProfile from "../../screens/EditUserProfile/EditUserProfile";
import { Text, View, ScrollView, StyleSheet, TouchableHighlight, Image, Dimensions, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../contexts/AuthContext";


const ProfileStack = createNativeStackNavigator();

const UserProfileNav = () => {
  const navigation = useNavigation();

  const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');

  const namewidth = SCREEN_WIDTH * 0.75;
  let namesize = 27;
  if (namewidth <= 27) {
    namesize = namewidth;
  } else {
    namesize = 27;
  }

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerShadowVisible: false,
          headerTitleAlign: "left",
          // headerRight: () => (
          //   <TouchableHighlight style={{ textAlign: "right", width: 120, marginRight: -100 }}>
          //     <Pressable onPress={() => navigation.navigate('EditUserProfile')}>
          //       <MaterialCommunityIcons name="account-edit" size={30} color="#001A72" />
          //     </Pressable>
          //   </TouchableHighlight>
          // ),
          headerLeft: () => (
            <Text style={{ fontSize: namewidth / 10 }}>
              My Profile
            </Text>
          )
        }}
      />
      <ProfileStack.Screen
        name="EditUserProfile"
        component={EditUserProfile}
        options={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default UserProfileNav;
