import React, {useState} from 'react';
import {Text, View, ScrollView, StyleSheet, TouchableOpacity, Image} from 'react-native';
import HeaderButtons from '../../profile-header-buttons/HeaderButtons'
import DummyImage from '../../../../../assets/profile-dummy-image/emily.png'

export default function AboutComponent() {    
    return(
        <ScrollView>
            <HeaderButtons/>
            <View style={styles.mainContainer}>
                <Image source={DummyImage} style={{left: 15, top: 15}}/>
                <View style={styles.detailsContainer}>
                    <Text style={{fontWeight: 'bold'}}>Emily Nelson</Text>
                    <View style={styles.phone}>
                        <Text style={{fontSize: 10, fontWeight: 'bold', color:'#B8C5D0'}}>Phone</Text>
                        <Text>416-777-7777</Text>
                    </View>
                    <View style={styles.email}>
                        <Text style={{fontSize: 10, fontWeight: 'bold', color:'#B8C5D0'}}>E-mail</Text>
                        <Text>emily.n@hotmail.com</Text>
                    </View>
                    <View style={styles.date}>
                        <Text style={{fontSize: 10, fontWeight: 'bold', color:'#B8C5D0'}}>Date of Birth</Text>
                        <Text>December 07, 1981</Text>
                    </View>                    
                </View>
            </View>
            <View style={styles.bioContainer}>
                <Text style={{fontSize: 20, left: 20, fontStyle: 'italic', top: 10}}>BIO</Text>
                <Text style={{top: 10, fontSize: 12, paddingHorizontal: 15}}>
                     ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat..
                </Text>
            </View>
            <View style={styles.emergencyContainer}>
                <Text style={{paddingLeft: 20, paddingTop: 10, fontSize: 12, fontStyle: 'italic', fontWeight:'bold'}}>Emergency Contact</Text>
                <View style={{paddingLeft: 70, paddingTop: 10}}>
                    <Text>Tommy Sawyer</Text>
                    <Text>647-420-420</Text>
                </View>
            </View>
        </ScrollView>
    )
}
 
const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#FFFFFF',
        width: '80%',
        height: '50%',
        borderRadius: 20,
        top: 30,
        left: 45,
        flexDirection: 'row'
    },
    detailsContainer: {
        top: 30,
        left: 25
    },
    phone: {
        top: 10
    },
    email: {
        top: 20
    },
    date: {
        top: 30
    },
    bioContainer: {
        backgroundColor: '#FFFFFF',
        width: '80%',
        height: '35%',
        borderRadius: 20,
        top: 50,
        left: 45
    },
    
    emergencyContainer: {
        backgroundColor: '#FFFFFF',
        width: '80%',
        height: '20%',
        borderRadius: 20,
        top: 70,
        left: 45,
        flexDirection: 'row'
    },
    
    
    
})