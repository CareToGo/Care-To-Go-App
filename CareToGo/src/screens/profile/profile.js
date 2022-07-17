import {View, StyleSheet, Text, FlatList} from 'react-native';

export default function Profile() {

    const DailyLivingList = ['Mobility', 'Feeding', 'Toileting','Showering', 'Grooming', 'Meal Preparation']
    const CareNeeds = ['Stoma', 'G-Tube', 'Picc Line', 'TPN', 'Wound Care']

    const ActivitiesListItems = DailyLivingList.map((activity) => {
        <Text>{activity}</Text>
    })

    const NeedsListItem = CareNeeds.map((need) => {
        <Text>{need}</Text>
    })
    return (
        <View style={styles.container}>
            <View style={styles.activities}>
                <View style={styles.activitesTitle}>
                    <Text style={{fontWeight: 'bold', fontSize: 15, top: 30, left: 70}}>Activites of Daily Living</Text>
                </View>
                <View style={styles.activitiesList}>
                    {ActivitiesListItems}
                </View>
            </View>

            <View style={styles.needs}>
                <View style={styles.needsTitle}>
                    <Text style={{fontWeight: 'bold', fontSize: 15, top: 30, left: 70}}>Care Needs</Text>
                </View> 
            </View> 
        </View>
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

    }
})