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
import ButtonCustom from './ButtonCustom'
import icons from '../constants/icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icons from './Icons'
const widthBox = sizes.width * (4 / 9)
const heightBox = sizes.width * (4 / 9)

export default function RederModalVerifyEmail({ visible, closeModal, formAction, navigation }) {
    let [otpValue, setOtpValue] = useState('')

    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <TouchableOpacity
                onPress={() => {
                    closeModal()
                }}
                style={[styles.modalBackDrop]}
                activeOpacity={1}
            >
                <ScrollView
                    contentContainerStyle={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.0)',
                    }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View
                        style={[
                            {
                                flex: 1,
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                backgroundColor: 'rgba(0,0,0,0.0)', // Adjust the alpha value as needed
                            },
                        ]}
                    >
                        <View
                            style={[
                                {
                                    backgroundColor: 'rgba(255, 255, 255, 1)', // Set the alpha value to 1 for a fully opaque background
                                    padding: 16,
                                    width: '100%',
                                    height: '92%',
                                    borderTopRightRadius: 16,
                                    borderTopLeftRadius: 16,
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                },
                                styles.shadowProp,
                            ]}
                        >
                            {/* header */}
                            <View style={{ width: '60%', alignItems: 'center' }}>
                                <Text
                                    style={{
                                        color: '#0c144f',
                                        fontSize: 24,
                                        fontWeight: '600',
                                        textAlign: 'center',
                                    }}
                                >
                                    Enter your verification code
                                </Text>
                                <Text
                                    style={{
                                        color: '#0c144f',
                                        fontSize: 14,
                                        fontWeight: '400',
                                        textAlign: 'center',
                                        marginTop: 32,
                                    }}
                                >
                                    We sent a verification code to meomeo@gmail.com
                                </Text>
                                <View
                                    style={{
                                        width: 180,
                                        height: 180,
                                    }}
                                >
                                    <ImageBackground source={icons.Logo} resizeMode="cover" style={styles.image} />
                                </View>
                            </View>

                            {/* verify code */}
                            <View style={{ width: '80%', alignItems: 'center' }}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(e) => {
                                        setOtpValue(e)
                                    }}
                                    placeholder="verify code"
                                    keyboardType="number-pad"
                                    maxLength={6}
                                />
                            </View>
                            {/* Controll */}
                            <View
                                style={{
                                    width: '100%',
                                    alignItems: 'center',
                                    marginTop: 80,
                                    marginBottom: 40,
                                    gap: 8,
                                }}
                            >
                                <ButtonCustom
                                    onPress={() => {
                                        formAction({ otpCode: otpValue })
                                    }}
                                    style={{
                                        backgroundColor: '#151d56',
                                        width: '60%',
                                        borderRadius: 16,
                                        borderWidth: 0,
                                    }}
                                    buttonTextStyle={{ color: colors.white }}
                                    buttonText="Verify"
                                />

                                <ButtonCustom
                                    onPress={() => {}}
                                    style={{
                                        backgroundColor: colors.white,
                                        width: '60%',
                                        borderRadius: 16,
                                        borderWidth: 0,
                                        borderColor: colors.lightBlue,
                                    }}
                                    buttonTextStyle={{
                                        color: colors.lightBlue,
                                    }}
                                    buttonText="Send the code again."
                                />

                                <ButtonCustom
                                    onPress={() => {}}
                                    style={{
                                        backgroundColor: colors.white,
                                        width: '60%',
                                        borderRadius: 16,
                                        borderWidth: 0,
                                        borderColor: colors.lightBlue,
                                    }}
                                    buttonTextStyle={{
                                        color: colors.lightBlue,
                                    }}
                                    buttonText="Change your infomation"
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </TouchableOpacity>
        </Modal>
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
