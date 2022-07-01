import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import Contractor from './src/components/contractorcomponent/contractor';
import Logo from './src/components/care-logo/logo';
import Saved from './src/components/saved-button/savedbutton';
import AppointButton from './src/components/calender-button/appointmentButton';



export default function App() {
  return (
    <View style={styles.container}>

      <View style={styles.tabContainer}>

        <View style={styles.logContainer}>
          <Logo/>
        </View>

        <View style={styles.buttonContainer}>
          <Saved />
          <AppointButton />
        </View>

      </View>
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
  },
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  logContainer: {
    position: 'absolute',
    right: 50
  },

  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 56,
    left: 50
  }
});
