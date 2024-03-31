import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Gap from "./Gap";

export default function FormInput({
    label,
    onChangeText,
    value = "",
    iconName = "set-none",
    placeholder = "none",
    inputMode = "default"
}) {
    const [secure, setSecure] = useState(true)
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.formContainer}>
                    <Icon style={styles.icon}
                        name={iconName} size={27} color={"black"} />
                    <TextInput style={styles.form}
                        value={value}
                        onChangeText={onChangeText}
                        placeholder={placeholder}
                        placeholderTextColor={"grey"}
                        keyboardType={inputMode}
                        secureTextEntry={label == "Password" && secure ? true : false} />
                    {
                        label == "Password" &&
                        (<TouchableOpacity onPress={() => { setSecure(!secure) }}>
                            <Icon style={styles.icon}
                                name={secure ? "eye" : "eye-off"} size={27} color={"black"} />
                        </TouchableOpacity>)
                    }
                </View>
            </View>
            <Gap height={20} />
        </>
    )
}

const styles = StyleSheet.create({
    icon: {
        marginHorizontal: 5
    },
    form: {
        color: "black",
        flex: 1,
        // backgroundColor: "red",
    },
    formContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    label: {
        fontWeight: "bold",
        color: "black"
    },
    container: {
        width: "100%",
        borderBottomColor: "#B8BC00",
        borderBottomWidth: 2
    }
})