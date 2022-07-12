import { StyleSheet, View, Text, Image, Pressable  } from "react-native";
import Map from '../../../assets/contractor-details-page/contractorDetailsMap.png';
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
    const navigation = useNavigation()

    const pressHandler = () => {
        navigation.navigate('date-picker')
    }

    return (
        <View style={ styles.container}>
            <Image source={Map} style={styles.image} />

            <View style={styles.select}>
                <Text style={{fontWeight: 'bold', fontSize: 30 }}> Select a Service</Text>
            </View>

            <View style={styles.menuitem}>
                <View style={styles.item}>
                    <Text style = {{fontWeight: 'bold', fontSize: 15}}>Personal Care</Text>
                    <View style={{marginLeft: 'auto', fontWeight: 'bold'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15}}>$35</Text>
                    </View>
                </View>
                <Text style={{marginVertical: 5}}>Hygiene, dressing, toileting, and mobilizing</Text>
            </View>

            <View style={styles.menuitem}>
                <View style={styles.item}>
                    <Text style = {{fontWeight: 'bold', fontSize: 15}}>Meal Preparation</Text>
                    <View style={{marginLeft: 'auto', fontWeight: 'bold'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15}}>$35</Text>
                    </View>
                </View>
                <Text style={{marginVertical: 5}}>Nutrition support, cooking, feeding</Text>
            </View>

            <View style={styles.menuitem}>
                <View style={styles.item}>
                    <Text style = {{fontWeight: 'bold', fontSize: 15}}>Transportaion</Text>
                    <View style={{marginLeft: 'auto', fontWeight: 'bold'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15}}>$35</Text>
                    </View>
                </View>
                <Text style={{marginVertical: 5}}>Mobility support and Driving</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable style={styles.now}>
                    <Text style={{color: 'white'}}>Now</Text>
                </Pressable>

                <Pressable onPress={pressHandler} style={styles.later}>
                    <Text>Later</Text>
                </Pressable>            
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    image: {
        top: 50
    },
    select: {
        justifyContent:'center',
        alignItems: 'center',
        top: 130

    },
    menuitem: {
        top: 150,
        marginVertical: 10
    },
    item:{ 
        flexDirection: 'row'
    },
    buttonContainer: {
        top: 185
    },

    now: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',        
    },
    later: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#C4C4C4',
        marginVertical: 10
    }
})

export default OrderScreen;