import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Profile from "../../ProfileScreen";
import UserProfile from "../../screens/MyProfile/UserProfile";
import EditUserProfile from "../../screens/EditUserProfile/EditUserProfile";

const ProfileStack = createNativeStackNavigator();

const UserProfileNav = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="EditUserProfile"
        component={EditUserProfile}
        options={{ headerShown: false,
                     animation: 'slide_from_right' }}
      />
    </ProfileStack.Navigator>
  );
};

export default UserProfileNav;
