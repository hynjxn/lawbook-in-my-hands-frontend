import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import CustomHeader from "../../template/CustomHeader";
import CustomInput from "../../atom/CustomInput";
import {colors} from "../../../variable/color";
import CustomButton from "../../atom/CustomButton";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {useInputs} from "../../../hooks/useInputs";
import axios from "axios";

function PasswordChangePage({navigation: drawerNavigation}) {
    const [value, onChange] = useInputs({pwd: "", pwd_check: ""});
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordChangeButtonPress = async () => {
        setIsLoading(true);
        const token = await asyncStorage.getItem("@access_token");
        await axios.post(`http://3.39.59.151:5000/user/password`, value, {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(() => {
                Alert.alert(
                    "비밀번호 변경이 완료되었습니다.",
                    "",
                    [
                        {
                            text: "확인"
                        }
                    ]
                );
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <CustomHeader content={"비밀번호 변경"}
                              handleMoreButtonPress={() => {
                                  drawerNavigation.toggleDrawer()
                              }}
                />
            </View>

            <View style={styles.content}>
                <View style={styles.inputContainer}>
                    <Text style={{fontSize: 15, color: `${colors.darkgrey}`}}>비밀번호</Text>
                    <CustomInput width={"300px"} height={"40px"} name={"pwd"} onChange={onChange} value={value.name}/>
                </View>

                <View style={{...styles.inputContainer, marginBottom: 60}}>
                    <Text style={{fontSize: 15, color: `${colors.darkgrey}`}}>비밀번호 확인</Text>
                    <CustomInput width={"300px"} height={"40px"} name={"pwd_check"} onChange={onChange}
                                 value={value.nickname}/>
                </View>

                <CustomButton handlePressButton={handlePasswordChangeButtonPress} width={"350px"} height={"60px"}
                              pointColor={colors.pointBlue} borderRadius={50}>
                    {
                        isLoading ? <ActivityIndicator/> : "비밀번호 변경"
                    }
                </CustomButton>

            </View>
        </SafeAreaView>);
}

export default PasswordChangePage;

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: 1,
        width: "100%",
    },
    content: {
        flex: 9,
        alignItems: "center",
        width: "100%",

    },
    inputContainer: {
        width: 350,
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    }
}

