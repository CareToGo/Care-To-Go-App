import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
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

const PUBLISHABLE_KEY = 'pk_test_51LPvpUDNDwI2KDMrrnp2QTRXShgLkjMZME7p8cSlhOvGa9XxXtMPbfJiLCgCLWE7z2PcDvULJdoiP5rpW9u7KMD200dEKnJAmM'

function App() {
  return (
    <StripeProvider publishableKey={PUBLISHABLE_KEY}>
      {StackNav()}
    </StripeProvider>
    );
}

export default withAuthenticator(App);
