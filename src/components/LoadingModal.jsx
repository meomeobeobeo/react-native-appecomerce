import { ImageBackground, StyleSheet, Text, View, ScrollView, TextInput, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, sizes } from '../constants/theme'
import ButtonCustom from './ButtonCustom'
import icons from '../constants/icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icons from './Icons'
const widthBox = sizes.width * (4 / 9)
const heightBox = sizes.width * (4 / 9)
import LottieView from 'lottie-react-native'
import loadingAnimate from '../assets/Loading.json'

export default function LoadingModal({ visible }) {
    return (
        <Modal animationType="fade" transparent={true} visible={visible}>
            <TouchableOpacity style={[styles.modalBackDrop]} activeOpacity={1}>
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
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(0,0,0,0.0)', // Adjust the alpha value as needed
                            },
                        ]}
                    >
                        <View
                            style={[
                                {
                                    padding: 16,
                                    width: sizes.width * (1 / 2),
                                    height: sizes.width * (1 / 2),
                                    borderTopRightRadius: 16,
                                    borderTopLeftRadius: 16,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                },
                            ]}
                        >
                            <LottieView
                                style={{
                                    backgroundColor: 'rgba(0,0,0,0.0)',
                                    width: sizes.width * (1 / 2),
                                    height: sizes.width * (1 / 2),
                                }}
                                source={loadingAnimate}
                                autoPlay
                                loop
                                resizeMode="cover"
                            />
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
