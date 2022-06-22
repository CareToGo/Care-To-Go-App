import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    page: {
        flex: 1,
    },
    iconcontainer: {
        position: 'absolute',
        top: 40,
        left: 10,
    },

    image: {
        width: "100%",
        aspectRatio: 4/3
    },

    title: {
        fontSize: 35,
        fontWeight: "600",
        marginVertical: 10,
        margin: 10, 
    },
    menutitle: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.7,
    },
    subtitle: {
        color: 'gray',
        fontSize: 15
    },

    container: {
        margin: 10,
    }
});