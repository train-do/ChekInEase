import React, { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, View } from "react-native";
import Background from "../components/Background";
import Gap from "../components/Gap";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import DropdownPicker from "../components/DropdownPicker";
import axios from "axios";
import EncryptedStorage from "react-native-encrypted-storage";
import { useDispatch } from "react-redux";
import { setCredential } from "../redux/slices/credentialSlice";

export default function Register({ navigation }) {
    const dispatch = useDispatch()
    const [dataPicker, setDataPicker] = useState(
        {
            division: [], department: [], branch: [], position: [],
            gender: [{ name: "Pria" }, { name: "Wanita" }],
            position: [{ name: "staff" }, { name: "supervisor" }, { name: "manager" }]
        })
    const [form, setForm] = useState({
        name: "Tester", gender: "Pria", email: "tester2@gmail.com", phone_number: "0812113223", password: "123456", division: "", department: "", branch: "", position: "", device_model: `${Math.ceil(Math.random() * 100000000000)}`
    })
    const [loading, setLoading] = useState(false)
    async function getDivisi() {
        try {
            const { data } = await axios.get("https://dev.pondokdigital.pondokqu.id/api/getAllDivision")
            setDataPicker({ ...dataPicker, division: data })
        } catch (error) {
            console.log(error, "getDivisi");
        }
    }
    async function getDepartment(id) {
        try {
            const { data } = await axios.get(`https://dev.pondokdigital.pondokqu.id/api/getDepartment/${id}`)
            if (data.data) {
                console.log(data.data);
                setDataPicker({ ...dataPicker, department: [{ name: data.data }] })
            } else {
                setDataPicker({ ...dataPicker, department: data })
            }
        } catch (error) {
            console.log(error, "getDivisi");
        }
    }
    async function getBranch() {
        try {
            const { data } = await axios.get(`https://dev.pondokdigital.pondokqu.id/api/branches`)
            setDataPicker({ ...dataPicker, branch: data })
        } catch (error) {
            console.log(error, "getDivisi");
        }
    }
    async function register() {
        try {
            setLoading(true)
            // console.log(form);
            const { data } = await axios.post(
                'https://dev.pondokdigital.pondokqu.id/api/register',
                form
            )
            const { data: login } = await axios.post(
                'https://dev.pondokdigital.pondokqu.id/api/login',
                form
            )
            console.log(login);
            await EncryptedStorage.setItem("credentials", JSON.stringify({ email: form.email, password: form.password }))
            dispatch(setCredential({ email: form.email, token: login.token, name: login.user.name }))
            setLoading(false)
            navigation.reset({
                routes: [
                    { name: 'Home' }
                ],
            })
        } catch (error) {
            console.log(error.response.data, "REGISTER");
            if (error.response) {
                const errors = error.response.data.errors
                if (errors.email) {
                    console.log("MASUK ERROR EMAIL");
                    ToastAndroid.show(errors.email[0], ToastAndroid.LONG)
                }
            }
            setLoading(false)
        }
    }
    function back() {
        navigation.goBack()
    }
    useEffect(() => {
        getDivisi()
    }, [])
    return (
        <View style={styles.container}>
            <Background />
            <View style={styles.wrapper}>
                <View>
                    <ScrollView>
                        <Text style={styles.title}>Register</Text>
                        <Gap height={20} />
                        <FormInput
                            label={"Nama Lengkap"}
                            placeholder="Masukkan nama..."
                            value={form.name}
                            onChangeText={(name) => setForm({ ...form, name })}
                            iconName="account-circle" />
                        <DropdownPicker
                            label="Pilih Gender"
                            iconName="human-male-female"
                            listOption={dataPicker.gender}
                            selectedValue={form.gender}
                            onValueChange={(itemValue, itemIndex) =>
                                setForm({ ...form, gender: itemValue })
                            }
                        />
                        <FormInput
                            label={"Nomor Telepon"}
                            placeholder="08xxxxxxxxxx"
                            value={form.phone_number}
                            onChangeText={(phone_number) => setForm({ ...form, phone_number })}
                            iconName="phone"
                            inputMode="numeric" />
                        <FormInput
                            label={"Email"}
                            placeholder="contoh@email.com"
                            value={form.email}
                            onChangeText={(email) => setForm({ ...form, email })}
                            iconName="email" />
                        <FormInput
                            label={"Password"}
                            placeholder="Kata sandi..."
                            value={form.password}
                            onChangeText={(password) => setForm({ ...form, password })}
                            iconName="lock" />
                        <DropdownPicker
                            label="Pilih Divisi"
                            iconName="office-building"
                            listOption={dataPicker.division}
                            selectedValue={form.division}
                            onValueChange={(itemValue, itemIndex) => {
                                setForm({ ...form, division: itemValue })
                                getDepartment(itemValue)
                            }
                            }
                        />
                        <DropdownPicker
                            label="Pilih Departemen"
                            iconName="domain"
                            listOption={dataPicker.department}
                            selectedValue={form.department}
                            onValueChange={(itemValue, itemIndex) => {
                                setForm({ ...form, department: itemValue })
                                getBranch()
                            }
                            }
                            enabled={dataPicker.department.length == 0 ? false : true}
                        />
                        <DropdownPicker
                            label="Pilih Cabang"
                            iconName="source-branch"
                            listOption={dataPicker.branch}
                            selectedValue={form.branch}
                            onValueChange={(itemValue, itemIndex) =>
                                setForm({ ...form, branch: itemValue })
                            }
                            enabled={dataPicker.branch.length == 0 ? false : true}
                        />
                        <DropdownPicker
                            label="Pilih Jabatan"
                            iconName="account-group"
                            listOption={dataPicker.position}
                            selectedValue={form.position}
                            onValueChange={(itemValue, itemIndex) =>
                                setForm({ ...form, position: itemValue })
                            }
                        />
                        <Button
                            title={loading ? "Memuat..." : "Daftar"}
                            bgColor="#D4CB00"
                            onPress={register} />
                        <Gap height={10} />
                        <Button
                            title="Kembali"
                            width={150}
                            onPress={back} />
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: "bold",
        alignSelf: "center",
        color: "black"
    },
    wrapper: {
        // backgroundColor: "blue",
        flex: 1,
        justifyContent: "center",
        width: 300,
        maxWidth: 480,
        alignSelf: "center",
        marginTop: StatusBar.currentHeight + 20,
        marginBottom: StatusBar.currentHeight + 20,
    },
    container: {
        flex: 1
    },
})