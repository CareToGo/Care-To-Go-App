import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import Contractor from './src/components/contractorcomponent/contractor';
import Logo from './src/components/care-logo/logo';



export default function App() {
  return (
    <View style={styles.container}>
      <Logo/>
      <Contractor />
      <Contractor />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
