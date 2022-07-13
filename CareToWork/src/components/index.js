import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';


const OrderItem = ({order}) => {
  return (
 
      <View style={{flexDirection:'row', margin:10, borderColor:'#1F2937', borderWidth: 2, borderRadius: 12}}> 
      <Image 
        source={{uri: order.Nurse.image}} 
        style={{width: "25%", height:'100%', borderRadius:10}}/>

        <View style={{flex:1, marginLeft:10, paddingVertical:5}}>
       
        <Text style={{fontSize:18, fontWeight:'500'}}>{order.Nurse.name}</Text>
        <Text style={{color: 'grey'}}>{order.Nurse.address}</Text>

        <Text style={{marginTop:10,color:'grey'}} >{order.User.name} ({order.User.age}) - {order.User.phone}</Text>
        <Text style={{color: 'grey'}}>{order.User.address}</Text>
        </View>

        </View>
      
  );
}

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    justifyContent: 'center',
  },
});
