import { View, Text, Image } from 'react-native';
import restaurants from '../../../assets/data/restaurants.json';
import DishListItem from '../../components/dishitem/dishindex';
import styles from './styles';

const restaurant = restaurants[0];

const ResturantHeader = ({restaurant}) =>  {
    return (
        <View style={styles.page}>
            <Image source={{uri: restaurant.image}} style={styles.image} /> 

            <View style={styles.container}>
                <Text style={styles.title}>{restaurant.name}</Text>
                <Text style={styles.subtitle}>
                    $ {restaurant.deliveryFee} &#8226;  
                    {restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime} minutes
                </Text>
                <Text style={styles.menutitle}>Menu</Text>
            </View>
        </View>
    );
};

export default ResturantHeader