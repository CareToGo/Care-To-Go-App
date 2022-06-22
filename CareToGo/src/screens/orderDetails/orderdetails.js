import { View, Text , Image, FlatList} from 'react-native'
import React from 'react'
import orders from '../../../assets/data/orders.json';
import restaurant from '../../../assets/data/restaurants.json';
import styles from './styles';
import BasketDishItem from '../../components/basketdishitem/basketdishitem';

const order = orders[0]

const OrderDetailsHeader = () => {
  return (
    <View>
         <View style={styles.page}>
            <Image source={{uri: order.Restaurant.image}} style={styles.image} /> 

            <View style={styles.container}>
                <Text style={styles.title}>{order.Restaurant.name}</Text>
                <Text style={styles.subtitle}>{order.status} &#8226; 2 days agp</Text>

                <Text style={styles.menutitle}>Your Orders</Text>
            </View>
        </View>
    </View>
  )
}

const OrderDetails = () => {
    return (
        <FlatList
            ListHeaderComponent={OrderDetailsHeader}
            data={restaurant[0].dishes}
            renderItem={({item}) => <BasketDishItem basketDish={item}/>}
        />
    )
}
export default OrderDetails;