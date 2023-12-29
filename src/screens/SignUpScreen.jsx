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
    Modal,
    TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, sizes } from '../constants/theme'
import ButtonCustom from '../components/ButtonCustom'
import icons from '../constants/icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icons from '../components/Icons'
import RederModalVerifyEmail from '../components/RederModalVerifyEmail'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { i18next } from '../in18/in18'
import LoadingScreen from './LoadingScreen'
import LoadingModal from '../components/LoadingModal'
import * as api from '../api/index'
import { timeOutApiCall } from '../helper/error'
import ModalNotify from '../components/ModalNotify'
const widthBox = sizes.width * (4 / 9)
const heightBox = sizes.width * (4 / 9)

export default function SignUpScreen({ navigation }) {
    const [isVisiblePassWord, setIsVisiblePassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isShowOtpVerify, setIsShowOtpVerify] = useState(false)
    const [signUp_form, setSignUp_form] = useState({
        userName: null,
        email: null,
        password: null,
    })
    const [isShowNotifyModal, setIsShowNotifyModal] = useState(false)
    const [notifyMessage, setNotifyMessage] = useState([])

    const language = useSelector((state) => state?.language?.language)
    console.log(language)

    const { t } = useTranslation()

    const closeModal = () => {
        setIsShowOtpVerify(false)
    }
    const closeNotifyModal = () => {
        setIsShowNotifyModal(false)
    }

    const visiblePassWord = () => {
        setIsVisiblePassword(!isVisiblePassWord)
    }

    const verifyOtpSignUp = async ({ otpCode }) => {
        let request = await api.verifyOtpWithEmailWhenRegister({
            email: signUp_form.email,
            userName: signUp_form.userName,
            otpCode: otpCode,
            password: signUp_form.password,
            typeOtp: 'VERIFY_EMAIL',
            phone_number: '',
        })
        setIsShowOtpVerify(false)
        setSignUp_form({
            userName: null,
            email: null,
            password: null,
        })

        navigation.navigate('Login')
    }

    const handleSignUp = async () => {
        // call api , send form
        // set isloading = true if have result
        // if errorCode == 0 , set isShowOtpVerify = true

        try {
            setIsLoading(true)

            // Set a time limit of 1 minute (adjust as needed)
            const timeoutMs = 15000 //

            // Make the API call with a time limit
            let request = await timeOutApiCall({
                apiPromise: api.registerInfor({ email: signUp_form.email }),
                timeoutMs: timeoutMs,
            })

            console.log(request.data)

            if (request?.data) {
                setIsLoading(false)
                setIsShowOtpVerify(true)
            }
        } catch (error) {
            setIsLoading(false)
            setNotifyMessage(error?.response?.data?.message || ['Server error'])
            setIsShowNotifyModal(true)

            console.error(error)
            // Handle the error here
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: colors.white }} keyboardShouldPersistTaps="handled">
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
                            <ImageBackground source={icons.Logo} resizeMode="cover" style={styles.image} />
                        </View>
                    </View>
                    <View style={styles.inputArea}>
                        <TextInput
                            value={signUp_form.userName}
                            style={styles.input}
                            onChangeText={(e) => {
                                setSignUp_form({
                                    ...signUp_form,
                                    userName: e,
                                })
                            }}
                            placeholder={t('user-name-placeholder')}
                            keyboardType="default"
                        />
                        <TextInput
                            value={signUp_form.email}
                            style={styles.input}
                            onChangeText={(e) => {
                                setSignUp_form({
                                    ...signUp_form,
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
                                value={signUp_form.password}
                                style={styles.input}
                                onChangeText={(e) => {
                                    setSignUp_form({
                                        ...signUp_form,
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
                                {t('suggest-login')}{' '}
                                <Text
                                    style={{ color: colors.red }}
                                    onPress={() => {
                                        navigation.navigate('Login')
                                    }}
                                >
                                    {t('login')}
                                </Text>{' '}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.control}>
                    <ButtonCustom
                        onPress={() => {
                            handleSignUp()
                        }}
                        style={{
                            backgroundColor: colors.lightPurple,
                            width: '80%',
                            borderRadius: 12,
                            borderWidth: 0,
                        }}
                        buttonTextStyle={{ color: colors.white }}
                        buttonText={t('sign-up')}
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
                {<RederModalVerifyEmail visible={isShowOtpVerify} closeModal={closeModal} formAction={verifyOtpSignUp} />}
                <ModalNotify header={'Có lỗi xảy ra'} notiMessage={notifyMessage} visible={isShowNotifyModal} closeModal={closeNotifyModal} />
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
    modalBackDrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.0)',
    },
    shadowProp: {
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 2, // for android
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
    suggest: {
        marginTop: 12,
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        marginLeft: 12,
    },
    inputArea: {
        flex: 4,
        alignItems: 'center',
        gap: 12,
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
