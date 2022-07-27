import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import StackNav from "./src/navigation/stacknavigator/stacknav";
import { Amplify } from "aws-amplify";
import config from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native/dist/Auth";

Amplify.configure({
  ...config,
  Analytics: {
    disavled: true,
  },
});

function App() {
  return StackNav();
}

export default withAuthenticator(App);
