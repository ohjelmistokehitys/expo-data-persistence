import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        width: "100%"
    },
    paragraph: {
        marginBottom: 20,
        width: "100%"
    },
    link: {
        textDecorationLine: "underline",
        color: "blue",
        padding: 10 // makes it easier to click
    },
    textInput: {
        minWidth: 150,
        borderColor: "black",
        borderWidth: 1
    }
})