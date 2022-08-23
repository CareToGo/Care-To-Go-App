import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CareProfile from "../careProfile";
import ProfileAbout from "../profileAbout";
import ProfilePayment from "../profilePayment";
import Support from "../support";
import ProfileScreen from "../../screens/ProfileScreen";

const ProfileStack = createNativeStackNavigator();

const ProfileNav = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="profile-about"
        component={ProfileAbout}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="profile-care"
        component={CareProfile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="profile-payment"
        component={ProfilePayment}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="support"
        component={Support}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileNav;
