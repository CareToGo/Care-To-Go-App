import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeStackNavigator from "../homestacknavigator/homestacknavigator";
import SavedContractors from "../../screens/savedcontractors/savedcontractors";
import ProfileScreen from "../../screens/ProfileScreen";
import Appointments from "../../screens/appointments/appointments";
import Profile from "../../screens/profile/profile";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// import Profile from "../../screens/profile/profile";

const Tab = createMaterialBottomTabNavigator();

export default function TabNav() {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: "white" }}>
      <Tab.Screen
        name="home"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
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
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
