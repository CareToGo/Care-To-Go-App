import { View, Text, FlatList, StyleSheet} from 'react-native';
import OrderListItem from '../../components/orderlistitem/orderlistitem';
import orders from '../../../assets/data/orders.json';

const OrderScreen = () => {
    return(
        <View style={{flex: 1, width: '100%', paddingTop: 50}}>
            <FlatList
                data={orders}
                renderItem={({item}) => <OrderListItem order={item}/>}
            />
        </View>
    )
}

export default OrderScreen