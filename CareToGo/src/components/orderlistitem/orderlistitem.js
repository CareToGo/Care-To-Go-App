import { View, Text, Image, Pressable} from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';


const OrderListItem = ({order}) => {
  
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate("Order", {id: order.id})} style={{flexDirection: 'row', margin: 10}}>
        <Image
            source={{uri: order.Restaurant.image}}
            style={{width: 75, height: 75, marginRight: 10}}
        />

        <View>
            <Text style={{fontWeight: '600', fontSize: 16}}>{order.Restaurant.name}</Text>
            <Text style={{marginVertical: 5}}>3 items $38.45</Text>
            <Text>2 days ago $#8226; {order.status}</Text>
        </View>
    </Pressable>
  )
}

export default OrderListItem