import { Image } from "react-native";
import C2G from "../../../assets/homespage/C2G.png";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNav from "../tabnavigator/tabnav";
import { useAuthContext } from "../../contexts/AuthContext";
import EditUserProfile from "../../screens/EditUserProfile/EditUserProfile";
import { StorageClass } from "aws-amplify";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../../models";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

const LogoTitle = () => {
  return <Image style={{ width: 150, height: 30 }} source={C2G} />;
};


const StackNav = () => {
  const { dbUser, sub, setDbUser } = useAuthContext();
  console.log('--------------------------------',sub)
  return (
    <Stack.Navigator>
      {dbUser ? (
        <Stack.Screen
          name="HomeTabs"
          component={TabNav}
          options={{ 
            headerShown: false
          }}
        />
      ) : (
        <Stack.Screen
          name="EditUserProfile"
          component={EditUserProfile}
          options={{
            headerShown: false,
            animation: 'slide_from_bottom'
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default StackNav;
