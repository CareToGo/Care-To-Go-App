import { Image } from "react-native";
import C2G from "../../../assets/homespage/c2g.png";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNav from "../tabnavigator/tabnav";
import { useAuthContext } from "../../contexts/AuthContext";
import ProfileScreen from "../../screens/ProfileScreen";
import UserProfileNav from "../UserProfileNavigator/UserProfileNav";
import { StorageClass } from "aws-amplify";

const Stack = createNativeStackNavigator();

const LogoTitle = () => {
  return <Image style={{ width: 150, height: 30 }} source={C2G} />;
};

const StackNav = () => {
  const { dbUser } = useAuthContext();
  return (
    <Stack.Navigator>
      {dbUser ? (
        <Stack.Screen
          name="MainHome"
          component={TabNav}
          options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
        />
      ) : (
        <Stack.Screen name="Profile" component={ProfileScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNav;
