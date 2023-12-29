import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useReducer } from 'react'
import { colors } from '../constants/theme'
import icons from '../constants/icons'
import Button from '../components/ButtonCustom'
import ButtonCustom from '../components/ButtonCustom'
import { useFocusEffect } from '@react-navigation/native'
import { getUniqueId, getManufacturer, getDeviceId, getDeviceName, getBaseOs, getApiLevel, getBatteryLevel, getBaseOsSync, getIpAddress } from 'react-native-device-info'
import * as expo_devide from 'expo-device'
import NetInfo from '@react-native-community/netinfo'
import { useTranslation } from 'react-i18next'
import * as api from '../api/index'
import axios from 'axios'

export default function Welcome({ navigation }) {
    const { t } = useTranslation()

    useFocusEffect(
        React.useCallback(() => {
            console.log('focus welcome')
            // let devideId = getDeviceId()
            // console.log(devideId)
            getDevideInfomation()
            // testCallRequestToServe()

            return () => {
                console.log('unfocus login')
            }
        }, [navigation]),
    )

    const testCallRequestToServe = async () => {
        let data = await api.testRequest()
        console.log(data.data)
    }

    const getDevideInfomation = async () => {
        const os = expo_devide.osName
        const osVersion = expo_devide.osVersion
        const uniqueDevideId = await getUniqueId()

        // network infomation
        const netInfor = await NetInfo.fetch()
        const isNetWorkConnected = netInfor.isConnected
        const isWifiEnable = netInfor.isWifiEnabled
        const typeConnect = netInfor.type
        const ipAddress = netInfor.details.ipAddress
        console.log(isNetWorkConnected)

        const devide_information = {
            os: os,
            osVersion: osVersion,
            uniqueDevideId: uniqueDevideId,
            ipAddress: ipAddress,
        }
        console.log(devide_information)
    }
    useEffect(() => {}, [])

    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.slider}>
                <View style={{ width: '100%', flex: 2 }}>
                    <ImageBackground source={icons.Logo} resizeMode="cover" style={styles.image} />
                </View>
                <View
                    style={{
                        width: '100%',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontSize: 28 }}>{t('welcome')}</Text>
                    <Text style={{ fontSize: 20 }}>{t('title')}</Text>
                </View>
            </View>
            <View style={styles.control}>
                <ButtonCustom
                    onPress={() => {
                        navigation.navigate('Login')
                    }}
                    buttonText={t('log-in')}
                />
                <ButtonCustom
                    onPress={() => {
                        navigation.removeListener()
                        navigation.navigate('Register')
                    }}
                    style={{
                        backgroundColor: 'rgba(17, 17, 17, 0.0)',
                        width: '80%',
                        borderRadius: 12,
                        borderWidth: 1,
                    }}
                    buttonTextStyle={{ color: colors.black }}
                    buttonText={t('sign-up')}
                />
                <ButtonCustom
                    onPress={() => {
                        navigation.navigate('Root')
                    }}
                    style={{
                        backgroundColor: 'rgba(17, 17, 17, 0.0)',
                        width: '80%',
                        borderRadius: 12,
                        borderWidth: 0,
                    }}
                    buttonTextStyle={{ color: '#40403d' }}
                    buttonText={t('skip-for-now')}
                />
            </View>
        </SafeAreaView>
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
        flex: 7,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    control: {
        backgroundColor: colors.white,
        flex: 3,
        alignItems: 'center',
        gap: 8,
    },
})
