import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Button({
    title = "Button",
    bgColor = "#3ADE00",
    width = 220,
    onPress
}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{
                ...styles.button,
                backgroundColor: bgColor,
                width: width
            }}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    title: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
        textShadowColor: "black",
        textShadowRadius: 1,
        textShadowOffset: { width: 1, height: 1 }
    },
    button: {
        height: 40,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        // elevation: 1
    }
})