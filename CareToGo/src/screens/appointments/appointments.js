import {View, StyleSheet, Text} from 'react-native';

export default function Appointments() {
    return (
        <View style={styles.container}>
            <Text>Appointments Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})