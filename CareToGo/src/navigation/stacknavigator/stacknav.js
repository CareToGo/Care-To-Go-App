import { Image } from "react-native";
import C2G from "../../../assets/homespage/c2g.png";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNav from "../tabnavigator/tabnav";
import AuthContextProvider from "../../contexts/AuthContet";
import { useAuthContext } from "../../contexts/AuthContet";
import Profile from "../../screens/profile/profile";

const Stack = createNativeStackNavigator();

const LogoTitle = () => {
  return <Image style={{ width: 150, height: 30 }} source={C2G} />;
};

export default function StackNav() {
  const { dbUser } = useAuthContext();
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={TabNav}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
        </Stack.Navigator>
      </AuthContextProvider>
    </NavigationContainer>
  );
}
