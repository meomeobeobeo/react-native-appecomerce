import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    StatusBar,
    TextInput,
    KeyboardAvoidingView,
    KeyboardAvoidingViewComponent,
    Animated,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, sizes } from '../constants/theme'
import ButtonCustom from '../components/ButtonCustom'
import icons from '../constants/icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icons from '../components/Icons'
import { useFocusEffect } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import NetInfo from '@react-native-community/netinfo'
import * as expo_devide from 'expo-device'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { i18next } from '../in18/in18'
import LoadingModal from '../components/LoadingModal'
import RederModalVerifyEmail from '../components/RederModalVerifyEmail'
import * as api from '../api/index'
import { getUniqueId } from 'react-native-device-info'
import { timeOutApiCall } from '../helper/error'

const widthBox = sizes.width * (4 / 9)
const heightBox = sizes.width * (4 / 9)
export default function LoginScreen({ navigation }) {
    const [isVisiblePassWord, setIsVisiblePassword] = useState(false)
    const [isShowOtpVerify, setIsShowOtpVerify] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    })
    const { t } = useTranslation()

    useEffect(() => {
        navigation.addListener('focus', async () => {
            console.log('login')
        })
    }, [])
    useFocusEffect(
        React.useCallback(() => {
            return () => {
                console.log('unfocus login')
            }
        }, [navigation]),
    )

    const visiblePassWord = () => {
        setIsVisiblePassword(!isVisiblePassWord)
    }

    const verifyOtpLoginDevide = async ({ otpCode }) => {
        const devideInfor = await getCurrentDevideInfor()

        let request = await api.verifyOtpDevide({
            email: loginForm.email,
            otpCode: otpCode,
            password: loginForm.password,
            typeOtp: 'VERIFY_DEVIDE',
            phone_number: '',
            ip: devideInfor.ip,
            devide_id: devideInfor.devide_id,
            os: devideInfor.os,
            osVersion: devideInfor.osVersion,
        })
        console.log(request.data)

        setIsShowOtpVerify(false)
        setLoginForm({
            email: '',
            password: '',
        })

        navigation.navigate('Root')
    }

    const getCurrentDevideInfor = async () => {
        const netInfor = await NetInfo.fetch()

        const os = expo_devide.osName
        const osVersion = expo_devide.osVersion
        const uniqueDevideId = await getUniqueId()
        const ipAddress = netInfor.details.ipAddress
        return {
            os: os,
            osVersion: osVersion,
            browser: '',
            browserVersion: '',
            devide_id: uniqueDevideId,
            ip: ipAddress,
        }
    }

    const handleLoginWithPassword = async () => {
        // login with email and password
        // base on statusCode = 200 (login success) , statusCode = 202 (verify devide with otp)
        // email,
        // password,
        // os,
        // osVersion,
        // browser,
        // browserVersion,
        // devide_id,
        // ip,

        try {
            setIsLoading(true)

            //network infomation
            const devideInfor = await getCurrentDevideInfor()

            const timeOutMs = 15000
            let result = await timeOutApiCall({
                apiPromise: api.loginWithPassWord({
                    email: loginForm.email,
                    password: loginForm.password,
                    browser: null,
                    browserVersion: null,
                    devide_id: devideInfor.devide_id,
                    ip: devideInfor.ip,
                    os: devideInfor.os,
                    osVersion: devideInfor.osVersion,
                }),
                timeoutMs : timeOutMs
            })
            


            if (result.data?.statusCode === 202) {
                // show modal verify devide
                setIsLoading(false)
                setIsShowOtpVerify(true)
            } else if (result.data?.statusCode === 200) {
                const loginData = result.data?.metaData

                await AsyncStorage.setItem(
                    'AccessToken',
                    loginData?.token || '',
                )
                await AsyncStorage.setItem(
                    'userInfor',
                    JSON.stringify(loginData?.userInfor),
                )

                setIsLoading(false)
                setLoginForm({
                    email: '',
                    password: '',
                })
                navigation.navigate('Root')
            } else {
                setIsLoading(false)
                console.error(result.data?.message)
            }
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }
    const closeModalOtpVerify = () => {
        setIsShowOtpVerify(false)
    }

    return (
        <ScrollView
            contentContainerStyle={{ flex: 1, backgroundColor: colors.white }}
            keyboardShouldPersistTaps="handled"
        >
            <KeyboardAwareScrollView style={{ flex: 1, marginBottom: 20 }}>
                <View style={styles.slider}>
                    <View
                        style={{
                            backgroundColor: colors.lightPurple,
                            position: 'absolute',
                            width: widthBox,
                            height: heightBox,
                            right: 0,
                            borderBottomLeftRadius: widthBox,
                        }}
                    ></View>
                    <View
                        style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                width: widthBox,
                                height: heightBox,
                                marginTop: widthBox,
                                justifyContent: 'center',
                            }}
                        >
                            <ImageBackground
                                source={icons.Logo}
                                resizeMode="cover"
                                style={styles.image}
                            />
                        </View>
                    </View>
                    <View style={styles.inputArea}>
                        <TextInput
                            value={loginForm.email}
                            style={styles.input}
                            onChangeText={(e) => {
                                setLoginForm({
                                    ...loginForm,
                                    email: e,
                                })
                            }}
                            autoCompleteType="email"
                            placeholder={t('email-placeholder')}
                            keyboardType="email-address"
                        />

                        <View
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <TextInput
                                value={loginForm.password}
                                style={styles.input}
                                onChangeText={(e) => {
                                    setLoginForm({
                                        ...loginForm,
                                        password: e,
                                    })
                                }}
                                secureTextEntry={isVisiblePassWord}
                                placeholder={t('password-placeholder')}
                                keyboardType="default"
                            />
                            {isVisiblePassWord ? (
                                <Icons
                                    onPress={visiblePassWord}
                                    style={{
                                        position: 'absolute',
                                        right: sizes.width / 10 + 12,
                                    }}
                                    size={18}
                                    icon={'VisibleLogo'}
                                />
                            ) : (
                                <Icons
                                    onPress={visiblePassWord}
                                    style={{
                                        position: 'absolute',
                                        right: sizes.width / 10 + 12,
                                    }}
                                    size={18}
                                    icon={'HideLogo'}
                                />
                            )}
                        </View>

                        <View style={styles.suggest}>
                            <Text style={{ flex: 1, textAlign: 'left' }}>
                                {t('suggest-register')}{' '}
                                <Text
                                    style={{ color: colors.red }}
                                    onPress={() => {
                                        navigation.navigate('Register')
                                    }}
                                >
                                    {t('register')}
                                </Text>{' '}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.control}>
                    <ButtonCustom
                        onPress={() => {
                            handleLoginWithPassword()
                        }}
                        style={{
                            backgroundColor: colors.lightPurple,
                            width: '80%',
                            borderRadius: 12,
                            borderWidth: 0,
                        }}
                        buttonTextStyle={{ color: colors.white }}
                        buttonText={t('log-in')}
                    />
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '600',
                            marginVertical: 8,
                        }}
                    >
                        {t('or')}
                    </Text>
                    <ButtonCustom
                        onPress={() => {}}
                        style={{
                            backgroundColor: colors.white,
                            width: '80%',
                            borderRadius: 12,
                            borderWidth: 2,
                            borderColor: colors.lightPurple,
                        }}
                        buttonTextStyle={{ color: colors.gray }}
                        buttonText={t('continute-with-facebook')}
                        iconName={'FaceBookLogo'}
                    />
                    <ButtonCustom
                        onPress={() => {}}
                        style={{
                            backgroundColor: colors.white,
                            width: '80%',
                            borderRadius: 12,
                            borderWidth: 2,
                            borderColor: colors.lightPurple,
                        }}
                        buttonTextStyle={{ color: colors.gray }}
                        buttonText={t('continute-with-google')}
                        iconName={'GoogleLogo'}
                    />
                    <ButtonCustom
                        onPress={() => {}}
                        style={{
                            backgroundColor: colors.white,
                            width: '80%',
                            borderRadius: 12,
                            borderWidth: 2,
                            borderColor: colors.lightPurple,
                        }}
                        buttonTextStyle={{ color: colors.gray }}
                        buttonText={t('continute-with-apple')}
                        iconName={'AppleLogo'}
                    />
                </View>
                {<LoadingModal visible={isLoading} />}
                {
                    <RederModalVerifyEmail
                        visible={isShowOtpVerify}
                        closeModal={closeModalOtpVerify}
                        formAction={verifyOtpLoginDevide}
                    />
                }
            </KeyboardAwareScrollView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white,
    },
    slider: {
        backgroundColor: colors.white,
        flex: 5,
        marginBottom: 40,
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        width: '80%',
        backgroundColor: '#f6f6f6',
        borderRadius: 8,
        borderWidth: 0,
    },
    inputArea: {
        flex: 4,
        alignItems: 'center',
        gap: 12,
    },
    suggest: {
        marginTop: 12,
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        marginLeft: 12,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    control: {
        backgroundColor: colors.white,
        flex: 5,
        alignItems: 'center',
        gap: 8,
    },
})
