import { StyleSheet, View, Text, Image, Pressable, ScrollView  } from "react-native";
import Map from '../../../assets/contractor-details-page/contractorDetailsMap.png';
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
    const navigation = useNavigation()

    const pressHandler = () => {
        navigation.navigate('date-picker')
    }

    return (
        <ScrollView style={ styles.container}>
            <Image source={Map} style={styles.image} />

            <View style={styles.select}>
                <Text style={{fontWeight: 'bold', fontSize: 30 }}> Select a Service</Text>
            </View>

            <View style={styles.menuitem}>
                <View style={styles.item}>
                    <Text style = {{fontWeight: 'bold', left: 20, fontSize: 15}}>Personal Care</Text>
                    <View style={{marginLeft: 'auto', right: 20, fontWeight: 'bold'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15}}>$35</Text>
                    </View>
                </View>
                <Text style={{marginVertical: 5, left: 20}}>Hygiene, dressing, toileting, and mobilizing</Text>
            </View>

            <View style={styles.menuitem}>
                <View style={styles.item}>
                    <Text style = {{fontWeight: 'bold', left: 20, fontSize: 15}}>Meal Preparation</Text>
                    <View style={{marginLeft: 'auto', right: 20, fontWeight: 'bold'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15}}>$35</Text>
                    </View>
                </View>
                <Text style={{marginVertical: 5, left: 20,}}>Nutrition support, cooking, feeding</Text>
            </View>

            <View style={styles.menuitem}>
                <View style={styles.item}>
                    <Text style = {{fontWeight: 'bold', left: 20, fontSize: 15}}>Transportaion</Text>
                    <View style={{marginLeft: 'auto', right: 20, fontWeight: 'bold'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15}}>$35</Text>
                    </View>
                </View>
                <Text style={{marginVertical: 5, left: 20,}}>Mobility support and Driving</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable style={styles.now}>
                    <Text style={{color: 'white'}}>Now</Text>
                </Pressable>

                <Pressable onPress={pressHandler} style={styles.later}>
                    <Text>Later</Text>
                </Pressable>            
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    image: {
        top: 20,
        left: 25
    },
    select: {
        justifyContent:'center',
        alignItems: 'center',
        top: 50

    },
    menuitem: {
        top: 60,
        marginVertical: 10
    },
    item:{
        marginTop: 10,
        flexDirection: 'row'
    },
    buttonContainer: {
        top: 100,
        flexDirection: 'row',
        left: 10,
    },

    now: {
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: 'black',
        marginHorizontal: 20        
    },
    later: {
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#C4C4C4',
    }
})

export default OrderScreen;