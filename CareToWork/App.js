import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import { store } from "./store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CheckOrder from "./screens/CheckOrder";




import { useEffect, useState } from "react";

import * as Location from "expo-location";


const App = () => {
  const Stack = createStackNavigator();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    const updateUserSupport = async () => {
      const authenticatedUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      if (!authenticatedUser) {
        return;
      }

      const supportData = await API.graphql(
        graphqlOperation(getSupportId, { id: authenticatedUser.attributes.sub })
      );
      if (!!supportData.data.getSupport) {
        // console.log("User already has a Support assigned");
        return;
      }

      const newSupport = {
        id: authenticatedUser.attributes.sub,
        type: "Nursing Care",
        userID: authenticatedUser.attributes.sub,
        latitude: 43.763592,
        longitude: -79.4107051,
      };
      await API.graphql(graphqlOperation(createSupport, { input: newSupport }));
    };

    updateUserSupport();
  }, []);
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen
                name="CheckOrder"
                component={CheckOrder}
                options={{ headerShown: false }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
