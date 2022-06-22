import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './src/screens/homescreen';
import ResturantDetails from './src/screens/resturantdetails/RDindex';
import DishDetails from './src/screens/dishdetails/dishdetails';
import Basket from './src/screens/basket/basketdeets';
import OrderScreen from './src/screens/orderscreen/orders';
import OrderDetails from './src/screens/orderDetails/orderdetails';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation/navigation';

export default function App() {
  return (
    <NavigationContainer>
        <RootNavigator />
        <StatusBar style='auto'/> 
    </NavigationContainer>
  );
}

