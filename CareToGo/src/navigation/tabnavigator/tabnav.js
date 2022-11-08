import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import SavedContractors from "../../screens/savedcontractors/savedcontractors";
import Appointments from "../../screens/appointments/appointments";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import UserProfileNav from "../UserProfileNavigator/UserProfileNav";
import { Text } from "react-native";
import HomeNav from "../HomeNavigator/HomeNav"

const Tab = createMaterialBottomTabNavigator();

export default function TabNav() {
  return (
    <Tab.Navigator activeColor="#ffde59" inactiveColor="#001A72" barStyle={{ backgroundColor: "#FFFFFF" }}>
      <Tab.Screen
        name="Home"
        component={HomeNav}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color}/>
          ),
          tabBarLabel: <Text style={{ color:'#001A72' }}>HOME</Text>
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedContractors}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="heart" size={24} color={color} />
          ),
          tabBarLabel: <Text style={{ color:'#001A72' }}>FAVORITES</Text>
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={Appointments}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="calendar" size={24} color={color} />
          ),
          tabBarLabel: <Text style={{ color:'#001A72' }}>APPOINTMENTS</Text>
        }}
      />
      <Tab.Screen
        name="My Profile"
        component={UserProfileNav}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
          tabBarLabel: <Text style={{ color:'#001A72' }}>PROFILE</Text>
        }}
      />
    </Tab.Navigator>
  );
}
