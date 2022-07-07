import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList, } from 'react-native';
import Header from './src/components/header/header';
import Homescreen from './src/screens/homescreen/homescreen';
import ContractorDetails from './src/screens/contractordetails/contractordetails';
import OrderScreen from './src/screens/orderscreen/orderscreen';


export default function App() {
  return (
    <View style={styles.container}>
      <ContractorDetails/>
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
    top: 50,
    left: 30
  },

  buttonBackground: {
    backgroundColor: 'lightgray',
    width: 33,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 10
  }
});
