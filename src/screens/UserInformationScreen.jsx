import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Icons from '../components/Icons'
import InputField from '../components/InputField'
import ButtonCustom from '../components/ButtonCustom'
import { colors } from '../constants/theme'

export default function UserInformationScreen({ navigation }) {
    const [userInfor, setUserInfor] = useState({
        userName : '',
        email : '',

    })
    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        } else {
            // Navigate to ControllScreen if there is no screen to go back to
            navigation.navigate('Root')
        }
    }
    useFocusEffect(
        React.useCallback(() => {
          
            async function fetchData() {
                const userData = JSON.parse(await AsyncStorage.getItem('userInfor'))
                console.log(userData.userName)
                setUserInfor({
                    userName : userData.userName,
                    email : userData.email,
                })
               
                // ...
            }

            fetchData()

            return () => {
                console.log('unfocus root')
            }
        }, [navigation]),
    )

    useEffect(() => {}, [])

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                {/* navigate */}
                <View
                    style={{
                        width: '100%',
                        marginTop: 32,
                        marginLeft: 12,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 12,
                    }}
                >
                    <Icons onPress={handleGoBack} icon={'Back'} size={18} />
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>Thông tin tài khoản</Text>
                </View>
                {/* avarta view */}
                <View
                    style={{
                        width: 160,
                        height: 160,
                        alignItems: 'center',
                        marginTop: 12,
                    }}
                >
                    <Image
                        style={{
                            width: 140,
                            height: 140,
                        }}
                        source={require('../../assets/images/defaultAvatar.png')}
                    />
                    {/* handle change avatar button */}
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 20,
                        }}
                    >
                        <Icons icon={'Camera'} size={48} />
                    </TouchableOpacity>
                </View>
                {/* information */}
                <View
                    style={{
                        width: '80%',
                        gap: 6,
                    }}
                >
                    <InputField inputData={userInfor.userName}  label={'Họ Tên'} />
                    <InputField inputData={userInfor.email} label={'Email'} />
                    <InputField iconLabel={'Calendar'} label={'Ngày sinh'} />
                    <InputField label={'Số điện thoại'} />
                </View>

                {/* button edit infomation */}
                <ButtonCustom
                    style={{
                        marginTop: 52,
                        backgroundColor: colors.lightPurple,
                        borderWidth: 0,
                    }}
                    buttonText="Chỉnh sửa thông tin"
                />
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
