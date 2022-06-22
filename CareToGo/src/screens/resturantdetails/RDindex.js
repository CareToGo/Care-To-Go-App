import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import restaurants from '../../../assets/data/restaurants.json';
import DishListItem from '../../components/dishitem/dishindex';
import ResturantHeader from './RDheader';
import styles from './styles';
import { useRoute, useNavigation} from '@react-navigation/native';

const restaurant = restaurants[0];

const ResturantDetails = () =>  {

    const route = useRoute();
    const navigation = useNavigation();
    const id = route.params?.id;

    return (
        <View style={styles.page}>
            <FlatList
                ListHeaderComponent={ () => <ResturantHeader restaurant={restaurant} />}
                data={restaurant.dishes}
                renderItem={({item}) => <DishListItem dish={item}/>}
                keyExtractor={(item) => item.name}
            />
            <Ionicons
                onPress={ () => navigation.goBack()}
                name="arrow-back-circle"
                size={45}
                color="white"
                style={styles.iconcontainer}
            />
        </View>
    );
};

export default ResturantDetails