import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { useNavigation } from '@react-navigation/native';

const Datepicker = () => {
    const [selectedDay, setSelectedDay] = useState('')
    const [selectedMonth, setSelectedMonth] = useState('')

    const navigation = useNavigation()
    const pressHandler = () => {
        navigation.navigate('appointment-order')
    }
    return (
        <View>
            <Calendar
                onDayPress={(e) => {
                    setSelectedDay(e.day)
                    setSelectedMonth(e.month)
                }}
            />

            <View style = {styles.date}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>{selectedMonth} - {selectedDay} : Available Times</Text>
            </View> 
            <TouchableOpacity style={styles.button} onPress={pressHandler}> 
                    <Text style={{fontWeight: 'bold', fontSize: 20, color:'#FFDE59'}}>Select Timings</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    date: {
        left: 30,
        top: 20
    },

    button: {
        top: 280,
        left: 80,
        alignItems:'center',
        backgroundColor: '#001A72',
        width: '60%',
        paddingVertical: 10,
        borderRadius: 20
    }
})

export default Datepicker;