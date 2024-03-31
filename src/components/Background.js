import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Background() {
    return (
        <Image source={require("../images/background_image.png")}
            style={styles.image} />
    )
}

const styles = StyleSheet.create({
    image: {
        height: "100%",
        width: "100%",
        position: "absolute"
    }
})