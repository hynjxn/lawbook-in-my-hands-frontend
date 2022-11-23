import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import CustomHeader from "../../template/CustomHeader";
import CustomInput from "../../atom/CustomInput";
import {colors} from "../../../variable/color";
import CustomButton from "../../atom/CustomButton";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {useInputs} from "../../../hooks/useInputs";
import axios from "axios";

function MyProfileEditPage({navigation: stackNavigation, drawerNavigation}) {
    const [value, onChange, setValue] = useInputs({nickname: "", name: ""});
    const [isLoading, setIsLoading] = useState(false);
    const handleEditInfoButtonPress = async () => {
        setIsLoading(true);
        const token = await asyncStorage.getItem("@access_token");
        await axios.post(`http://3.39.59.151:5000/user/profile`, value, {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(async () => {
                await asyncStorage.setItem("@nickname", value.nickname);
                await asyncStorage.setItem("@name", value.name)
                await Alert.alert(
                    "회원 정보 수정이 완료 되었습니다.",
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

    const fetchUserInfo = async () => {
        const nickname = await asyncStorage.getItem("@nickname");
        const name = await asyncStorage.getItem("@name");
        await setValue({nickname, name})
    }

    useEffect(() => {
        fetchUserInfo();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <CustomHeader content={"마이페이지 수정"}
                              handleMoreButtonPress={() => {
                                  drawerNavigation.toggleDrawer()
                              }}
                />
            </View>

            <View style={styles.content}>
                <View style={styles.inputContainer}>
                    <Text style={{fontSize: "15px", color: `${colors.darkgrey}`}}>이름</Text>
                    <CustomInput width={"300px"} height={"40px"} name={"name"} onChange={onChange} value={value.name}/>
                </View>

                <View style={{...styles.inputContainer, marginBottom: 60}}>
                    <Text style={{fontSize: "15px", color: `${colors.darkgrey}`}}>닉네임</Text>
                    <CustomInput width={"300px"} height={"40px"} name={"nickname"} onChange={onChange}
                                 value={value.nickname}/>
                </View>

                <CustomButton handlePressButton={handleEditInfoButtonPress} width={"350px"} height={"60px"}
                              pointColor={colors.pointBlue} borderRadius={"50%"}>
                    {
                        isLoading ? <ActivityIndicator/> : "정보수정"
                    }
                </CustomButton>

            </View>
        </SafeAreaView>);
}

export default MyProfileEditPage;

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

