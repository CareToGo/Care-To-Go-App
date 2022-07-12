import { StyleSheet, View, Text, } from 'react-native'
import { Calendar } from 'react-native-calendars'
import Day from 'react-native-calendars/src/calendar/day'

const Datepicker = () => {
    return (
        <View>
            <Calendar
                onDayPress={(e) => {
                    console.log(e.day)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default Datepicker;