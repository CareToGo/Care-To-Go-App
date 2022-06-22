import { StyleSheet, Text, View, Image, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Resturauntitem = ({ resturant }) => {

    const navigation = useNavigation();

    const  onPress = () => {
      navigation.navigate("Restaurant", {id: resturant.id})
    }
    return (
        <Pressable onPress={onPress} style={styles.resturauntContainer}>
            <Image 
                source={{uri: resturant.image}}
                style={styles.image}
            />
            <View style={styles.row}>
                <View>
                    <Text style={styles.title}>{resturant.name}</Text>
                    <Text style={styles.subtitle}>
                        $ {resturant.deliveryFee} &#8226;  
                        {resturant.minDeliveryTime}-{resturant.maxDeliveryTime} minutes
                    </Text>
                </View>
                <View style={styles.rating}>
                    <Text>{resturant.rating}</Text>
                </View>
            </View>
        </Pressable>
  )
}

export default Resturauntitem;

const styles = StyleSheet.create({
    resturauntContainer: {
      width: "100%",
      marginVertical: 10,
    },
    image: {
      width: "100%",
      aspectRatio: 5/3,
      marginBottom: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 5,
    },
    subtitle: {
      color: 'gray'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        marginLeft:'auto',
        backgroundColor: 'lightgray',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    }
  });
  