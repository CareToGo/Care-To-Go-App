import {View, StyleSheet, Text, TouchableOpacity, ScrollView} from 'react-native';
import ProfileNav from './profile-navigator/profilenav';

export default function Profile() {

    return (
        ProfileNav()
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    activities: {
        backgroundColor: 'white',
        width: '80%',
        height: '50%',
        borderRadius: 40,
        top: 50,
        left: 45,
    },
    activitesTitle: {

    },
    needs: {
        backgroundColor: '#D1D9E6',
        width: '80%',
        height: '50%',
        borderRadius: 40,
        marginTop: 80,
        left: 45,
    },
    needsTitle: {

    },

    
})