import { CardField, useStripe } from '@stripe/stripe-react-native';
import { useState } from 'react';
import { View, TextInput, StyleSheet, Text} from 'react-native';

export default function InstantPayments() {
  const { confirmPayment } = useStripe();
  const [ email, setEmail ] = useState(''); 

  return (
    <View style={styles.container}>

        <View style={styles.paymentTitle}>
            <Text style={{fontWeight: 'bold', fontSize: 30}}>A few more details...</Text>
        </View>

        <TextInput
            placeholder='E-mail'
            keyboardType='email-address'
            style={styles.input}
        />

        <CardField
            postalCodeEnabled={true}
            placeholders={{
                number: '4242 4242 4242 4242',
            }}
            cardStyle={styles.card}
            style={styles.cardContainer}
            onCardChange={(cardDetails) => {
                console.log('cardDetails', cardDetails);
            }}
            onFocus={(focusedField) => {
                console.log('focusField', focusedField);
            }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        fontSize: 20,
        height: 50,
        padding: 10,
        marginHorizontal: 20
    },

    cardContainer: {
        height: 50,
        marginVertical: 30,
        marginHorizontal: 20
    },
    card: {
        backgroundColor: '#FFFFFF',

    }
})