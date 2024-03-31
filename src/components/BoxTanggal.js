import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { StyleSheet, View, Text } from "react-native";

export default function BoxTanggal({ item, index }) {
    const time = item.out == " " || item.out == null ? item.in?.slice(0, 5) : item.out?.slice(0, 5)
    const absen = item.statusPresence == "Hadir" ? true : false
    return (
        <View style={{ ...styles.boxTanggal, backgroundColor: absen ? "#1E90FF" : "black" }}>
            <View style={styles.headerTanggal}>
                <Text style={styles.teksCalendar}>{index + 1}</Text>
                {item.isReturn && (<Icon
                    name={"check-circle"}
                    color={"white"}
                    size={15} />)}
            </View>
            <View style={styles.status}>
                <Text style={{ ...styles.teksCalendar, fontSize: 15, alignSelf: "center", fontWeight: "400" }}>{item.statusPresence}</Text>
            </View>
            <View>
                <Text style={{
                    ...styles.teksCalendar,
                    fontSize: 10, alignSelf: "center",
                    fontWeight: "normal",
                }}>{time}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    status: {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 70,
        width: 70,
        // backgroundColor: 'red',
        top: "50%",
        left: "50%",
        transform: [
            { translateX: -70 / 2 },
            { translateY: -70 / 2 },
        ]
    },
    teksCalendar: {
        color: "white",
        // fontWeight: "bold"
    },
    headerTanggal: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 7,
    },
    boxTanggal: {
        backgroundColor: "black",
        height: 70,
        width: 70,
        borderRadius: 70 / 10,
        justifyContent: "space-between",
        paddingVertical: 3,
        margin: 5,
        position: "relative"
    },
})