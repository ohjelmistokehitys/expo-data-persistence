import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 20,
        gap: 20,
    },
    title: {
        fontSize: 20,
        width: "100%"
    },
    paragraph: {
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
    },
    list: {
        alignSelf: "stretch",
        paddingHorizontal: 40
    },
    listItem: {
        fontSize: 18,
        marginBottom: 10
    }
});
