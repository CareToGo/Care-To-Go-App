import {View, StyleSheet, Text} from 'react-native';

export default function Profile() {
    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})