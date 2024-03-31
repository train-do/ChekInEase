import React from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Icon2 from "react-native-vector-icons/MaterialIcons"
import FormInput from "./FormInput";
import Gap from "./Gap";
import Button from "./Button";

export default function ModalCalendar({
    visible,
    handleCloseModal,
    months,
    selectMonth
}) {
    // console.log(months);
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={handleCloseModal}>
            <View style={styles.modal}>
                <Pressable style={styles.modalClose}
                    onPress={handleCloseModal} />
                <View style={styles.containerModal}>
                    <View style={styles.headerModal}>
                        <Icon2
                            name={"calendar-month"}
                            size={22}
                            color={"black"} />
                        <Text style={styles.teks}>Pilih Bulan</Text>
                        <TouchableOpacity onPress={handleCloseModal}>
                            <Icon
                                name={"close-circle"}
                                size={22}
                                color={"black"} />
                        </TouchableOpacity>
                    </View>
                    {months.map((el, idx) => (
                        <View key={idx}>
                            <TouchableOpacity onPress={() => {
                                selectMonth(idx)
                                handleCloseModal()
                            }}>
                                <View style={styles.month} >
                                    <Text style={styles.teks}>{el}</Text>
                                </View>
                            </TouchableOpacity>
                            <Gap height={5} />
                        </View>
                    ))}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    month: {
        backgroundColor: "#EBEBEB",
        width: "80%",
        height: 35,
        alignSelf: "center",
        justifyContent: "center",
        paddingLeft: 10,
        borderRadius: 5,
    },
    headerModal: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        justifyContent: "space-between"
    },
    containerModal: {
        backgroundColor: "white",
        // height: 330,
        paddingBottom: 20,
        width: 270,
        borderRadius: 20
    },
    teks: {
        color: "black"
    },
    modalClose: {
        position: "absolute",
        height: "100%",
        width: "100%",
        // backgroundColor: "red"
    },
    modal: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#181616b0"
    },
})