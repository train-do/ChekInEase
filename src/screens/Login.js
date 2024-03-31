import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Background from "../components/Background";
import FormInput from "../components/FormInput";
import Gap from "../components/Gap";
import Button from "../components/Button";
import EncryptedStorage from "react-native-encrypted-storage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredential } from "../redux/slices/credentialSlice";

export default function Login({ navigation }) {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    async function login() {
        try {
            setLoading(true)
            const { data } = await axios.post(
                "https://dev.pondokdigital.pondokqu.id/api/login",
                { email, password }
            )
            console.log(data);
            await EncryptedStorage.setItem("credentials", JSON.stringify({ email, password }))
            dispatch(setCredential({ email, token: data.token, name: data.user.name }))
            setLoading(false)
            navigation.replace("Home")
        } catch (error) {
            setLoading(false)
            setError(error.response.data.message)
            // console.log(error.response.data);
        }
    }
    function register() {
        navigation.navigate("Register")
    }
    return (
        <View style={styles.container}>
            <Background />
            <View style={styles.formLogin}>
                <Text style={styles.title}>Masuk</Text>
                <Gap height={20} />
                <FormInput
                    label={"Email"}
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                    placeholder="contoh@email.com"
                    iconName="email" />
                <Gap height={20} />
                <FormInput
                    label={"Password"}
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    placeholder="Kata sandi..."
                    iconName="lock" />
                {error && <Text style={styles.errorMsg}>{error}</Text>}
                <Gap height={20} />
                <Button
                    title={loading ? "Memuat..." : "Masuk"}
                    bgColor="#D4CB00"
                    onPress={login} />
                <Gap height={10} />
                <Button
                    title="Daftar"
                    width={150}
                    onPress={register} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    errorMsg: {
        alignSelf: "center",
        color: "red",
        fontWeight: "bold"
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        alignSelf: "center",
        color: "black"
    },
    formLogin: {
        // backgroundColor: "red",
        width: 300,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})