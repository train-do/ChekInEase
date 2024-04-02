import React, { useCallback, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Icon2 from "react-native-vector-icons/MaterialIcons"
import { FlatList, Modal, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Background from "../components/Background";
import Gap from "../components/Gap";
import EncryptedStorage from "react-native-encrypted-storage/";
import { useSelector } from "react-redux";
import BoxTanggal from "../components/BoxTanggal";
import ModalCalendar from "../components/ModalCalendar";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

export default function Home({ navigation }) {
    const months = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ];
    const { name, email, token } = useSelector((state) => state.credential)
    const [modal, setModal] = useState(false)
    const [year, setYear] = useState({})
    // const [months, setMonths] = useState([])
    const [month, setMonth] = useState(new Date().getMonth())
    const [days, setDays] = useState([])
    function selectMonth(select) {
        if (select == "++") {
            setMonth(month + 1)
        } else if (select == "--") {
            setMonth(month - 1)
        } else {
            setMonth(select)
        }
        console.log(year[months[month]]);
        // setDays(year[months[month]])
    }
    async function getPresence() {
        try {
            // console.log(token);
            const { data } = await axios.get(
                `https://dev.pondokdigital.pondokqu.id/api/get-data-user-in-year`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            const tempArr = []
            for (const key in data) {
                tempArr.push(key)
            }
            setYear(data)
            // setDays(data[months[month]])
            console.log(data[months[month]], months[month]);
        } catch (error) {
            console.log(error.response.data);
        }
    }
    function showModal() {
        setModal(true)
    }
    async function logout() {
        try {
            await EncryptedStorage.clear()
            navigation.replace("Login")
        } catch (error) {
        }
    }
    useFocusEffect(useCallback(() => {
        getPresence()
    }, []))
    return (
        <View style={styles.container}>
            <Background />
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.topHeader}>
                    <TouchableOpacity onPress={logout}>
                        <Icon style={{ transform: [{ rotate: "180deg" }] }}
                            name="logout"
                            color="black"
                            size={35} />
                    </TouchableOpacity>
                    <Gap width={20} />
                    <Text style={{ ...styles.teks, fontSize: 20 }}>CheckInEase</Text>
                </View>
                <Gap height={20} />
                <Text style={{ ...styles.teks, fontWeight: "normal", fontStyle: "italic" }}>Selamat datang,</Text>
                <Gap height={10} />
                <View style={styles.profileHeader}>
                    <Icon
                        name="account-circle"
                        color="black"
                        size={55} />
                    <Gap width={15} />
                    <View style={styles.profile}>
                        <Text style={{ ...styles.teks, fontSize: 22 }}>{name}</Text>
                        <Text style={{ ...styles.teks, fontWeight: "normal", fontStyle: "italic" }}>{email}</Text>
                    </View>
                </View>
            </View>
            {/* Header */}
            <Gap height={30} />
            {/* Calender */}
            <View style={styles.containerCalendar}>
                <View style={styles.headerCalendar}>
                    <View style={styles.navCalendar}>
                        <TouchableOpacity onPress={() => selectMonth("--")}
                            disabled={month == 0}>
                            <View style={styles.btnCalendar}>
                                <Icon2
                                    name={"chevron-left"}
                                    size={25}
                                    color={"black"} />
                            </View>
                        </TouchableOpacity>
                        <Pressable onPress={showModal}>
                            <View style={{ ...styles.btnCalendar, width: 130, height: 25, borderRadius: 25 / 3 }}>
                                <Text style={styles.teksBulan}>{months[month]}</Text>
                            </View>
                        </Pressable>
                        <TouchableOpacity onPress={() => selectMonth("++")}
                            disabled={month == new Date().getMonth()}>
                            <View style={styles.btnCalendar}>
                                <Icon2
                                    name={"chevron-right"}
                                    size={25}
                                    color={"black"} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={showModal}>
                        <View style={{ ...styles.btnCalendar, width: 40, height: 40 }}>
                            <Icon2
                                name={"calendar-month"}
                                size={22}
                                color={"black"} />
                        </View>
                    </TouchableOpacity>
                </View>
                <Gap height={15} />
                <FlatList
                    data={year[months[month]]}
                    renderItem={({ item, index, separators }) => (
                        <BoxTanggal item={item} index={index} />
                    )}
                    keyExtractor={(item, index) => index}
                    numColumns={4}
                    columnWrapperStyle={{ alignSelf: "center" }} />
            </View>
            <TouchableOpacity style={styles.qr}
                onPress={() => navigation.navigate("Scanner")}>
                <Icon2
                    name={"qr-code"}
                    color={"white"}
                    size={30} />
            </TouchableOpacity>
            {/* Calender */}

            {/* Modal */}
            <ModalCalendar
                visible={modal}
                handleCloseModal={() => setModal(false)}
                months={months.slice(0, new Date().getMonth() + 1)}
                selectMonth={selectMonth}
            />
            {/* Modal */}

        </View>
    )
}

const styles = StyleSheet.create({
    qr: {
        backgroundColor: "#D4CB00",
        width: 60,
        height: 60,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 30,
        right: 30
    },
    teksBulan: {
        color: "black",
        fontWeight: "bold"
    },
    btnCalendar: {
        backgroundColor: "#FFFFFF",
        elevation: 2,
        width: 30,
        height: 30,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
        // shadowColor: "black",
        // shadowRadius: 2
    },
    navCalendar: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    headerCalendar: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    containerCalendar: {
        paddingHorizontal: 40,
        flex: 1,
        paddingBottom: 110
    },
    profileHeader: {
        flexDirection: "row",
        alignItems: "center"
    },
    teks: {
        color: "black",
        fontWeight: "bold"
    },
    topHeader: {
        flexDirection: "row",
        alignItems: "center"
    },
    header: {
        marginTop: StatusBar.currentHeight + 20,
        marginHorizontal: 20
    },
    container: {
        flex: 1,
        position: "relative"
    }
})