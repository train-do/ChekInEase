import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Background from "../components/Background";
import EncryptedStorage from "react-native-encrypted-storage/";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredential } from "../redux/slices/credentialSlice";

export default function SplashScreen({ navigation }) {
    const dispatch = useDispatch()
    async function validasi() {
        try {
            const credentials = await EncryptedStorage.getItem("credentials")
            if (credentials) {
                const form = JSON.parse(credentials)
                const { data } = await axios.post(
                    `https://dev.pondokdigital.pondokqu.id/api/login`,
                    {
                        email: form.email,
                        password: form.password
                    }
                )
                dispatch(setCredential({ email: form.email, token: data.token, name: data.user.name }))
                navigation.replace("Home")
            } else {
                navigation.replace("Login")
            }
        } catch (error) {
            console.log(error, "SPLASHHHHH");
        }
    }
    useEffect(() => {
        validasi()
    }, [])
    return (
        <View style={styles.container}>
            <Background />
            <Image source={require("../images/Logo_QR.png")}
                style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' },
    image: { alignSelf: "center" }
})