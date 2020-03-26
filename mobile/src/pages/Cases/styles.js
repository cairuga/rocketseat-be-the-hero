import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    containter: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    headerText: {
        fontSize: 15,
        color: "#737380",
    },

    headerTextBold: {
        fontWeight: "bold",
    },

    title: {
        fontSize: 30,
        color: "#13131a",
        marginBottom: 16,
        marginTop: 48,
        fontWeight: "bold",
    },

    descriptio: {
        fontSize: 16,
        color: "#737380",
        lineHeight: 24,
    },

});