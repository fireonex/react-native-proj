import {StyleSheet} from "react-native";

export const globalStyles = StyleSheet.create({
    border: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#001e1d',
    },
    button: {
        backgroundColor: '#f9bc60',
        color: '#001e1d',
        borderStyle: undefined
    },
    text: {
        color: '#001e1d',
        fontSize: 18
    },
    box: {
        paddingTop: 10
    },
    errorText: {
        color: 'red',
        paddingTop: 5
    }
})