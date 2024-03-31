import React from "react";
import { View } from "react-native";

export default function Gap({ height = 0, width = 0 }) {
    return (
        <View style={{
            height: height,
            width: width,
            // backgroundColor: "red"
        }}></View>
    )
}