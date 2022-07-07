import { StyleSheet, Text, View, Image} from 'react-native';

const Contractor = ({restaurant}) => {

  return (

    <View style={styles.resturauntContainer}>
        <Image 
          source= {{
            uri: restaurant.image
          }}
          style={styles.image}
        />

        <View style={styles.background}>
            <Text style={styles.nurseTitle}>{restaurant.name}</Text>
            <Text style={styles.details}> -RATING- &#8226; -experience- &#8226; -distance-</Text>
        </View>

      </View>
  )
}

export default Contractor;

const styles = StyleSheet.create({
    resturauntContainer: {
      width: '90%',
      marginVertical: 10,
    },
  
    image: {
      width: "100%",
      aspectRatio: 4/3,
    },
  
    nurseTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        marginHorizontal: 10,
    },
  
    details: {
      color: 'white',
      marginVertical: 5,
      marginHorizontal: 10,
      marginBottom: 20

    },

    background: {
        backgroundColor: '#4D80C5'
    }
  });