import React, { useEffect, useState } from "react";
import { Button, Modal, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from "react-native-vision-camera";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Linking } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
export default function Scanner({ navigation }) {
    const { name, email, token } = useSelector((state) => state.credential)
    const device = useCameraDevice('back')
    const { hasPermission, requestPermission } = useCameraPermission()
    const [modal, setModal] = useState(false)
    const [isActive, setIsActive] = useState(true)
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: async (codes) => {
            setIsActive(false)
            try {
                // const canGoBack = navigation.canGoBack()
                let respon
                // console.log(codes[0].value);
                if (codes[0].value == "Pulang") {
                    // console.log("masuk kondisi pulang");
                    const { data } = await axios.post(
                        "https://dev.pondokdigital.pondokqu.id/api/presence-out",
                        null,
                        { headers: { Authorization: `Bearer ${token}` } },
                    )
                    // console.log(data.message);
                    respon = data
                } else if (codes[0].value == "Hadir") {
                    const { data } = await axios.post(
                        "https://dev.pondokdigital.pondokqu.id/api/presence-in",
                        {
                            status: codes[0].value,
                            latitude: Math.ceil(Math.random() * 1000000),
                            longitude: Math.ceil(Math.random() * 1000000),
                            desc: ""
                        },
                        {
                            headers: {
                                Accept: `application/json`,
                                Authorization: `Bearer ${token}`
                            }
                        },
                    )
                    // console.log(data.message, "DATA");
                    respon = data
                }
                const canGoBack = navigation.canGoBack()
                if (respon.message && canGoBack) {
                    ToastAndroid.show(respon.message, ToastAndroid.LONG)
                    console.log(respon.message, "RESPON");
                    console.log("MASUK KE GOBACK");
                    navigation.goBack()
                }
            } catch (error) {
                console.log(error);
            }
        }
    })
    // console.log(hasPermission, token);
    async function permission() {
        await Linking.openSettings()
        // requestPermission()
    }
    if (!device) {
        return (
            <View>
                <Text>No Camera</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {hasPermission && device && (
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={isActive}
                    codeScanner={codeScanner}
                />
            )}
            <Modal
                transparent={true}
                visible={!hasPermission}>
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <Text style={styles.teks}>{hasPermission ? "Memeriksa Perizinan...." : "Izin kamera diperlukan..."}</Text>
                        {!hasPermission && (
                            <TouchableOpacity onPress={permission}>
                                <Icon
                                    name={"refresh"}
                                    color={"black"}
                                    size={50} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create({
    teks: {
        color: "black",
        alignSelf: "center"
    },
    modal: {
        width: 270,
        height: 50,
        backgroundColor: "white",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    },
    modalContainer: {
        // backgroundColor: "black",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        backgroundColor: "black"
    }
})





// export default function LibDemo() {
//   const {hasPermission, requestPermission} = useCameraPermission();
//   const device = useCameraDevice('back');

//   const [modal, setModal] = useState(true);

//   if (device == null) return <Text>Tidak ada kamera</Text>;

//   return (
//     <View style={{flex: 1}}>
//       {hasPermission && (
//         <Camera
//           style={StyleSheet.absoluteFill}
//           device={device}
//           isActive={true}
//         />
//       )}
//       <Modal visible={!hasPermission}>
//         <View
//           style={{
//             backgroundColor: 'black',
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <View style={{backgroundColor: 'white', padding: 20}}>
//             <Text>Izinkan kamera</Text>
//             <Button
//               title="izinkan kamera"
//               onPress={() => Linking.openSettings()}
//             />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({});