import { StyleSheet, Text, View, Image} from 'react-native';
import C2G from '../../../assets/homespage/c2g.png';

const Contractor = () => {
  return (
    <View style={styles.resturauntContainer}>
        <Image 
          source= {{
            uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg"
          }}
          style={styles.image}
        />

        <View style={styles.background}>
            <Text style={styles.nurseTitle}>Nurse Name</Text>
            <Text style={styles.details}> -rating- -experience- -distance-</Text>
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