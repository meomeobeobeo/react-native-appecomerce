import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'

import * as api from '../api/index'
import { colors } from '../constants/theme'
import Icons from '../components/Icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PaymentMethodItem from '../components/PaymentMethodItem'
import ButtonCustom from '../components/ButtonCustom'
import LoadingScreen from './LoadingScreen'
export default function PaymentScreen({ navigation, productNeedPayData }) {
    const [isLoading, setIsLoading] = useState(false)
    const [paymentMethodList, setPaymentMethodList] = useState([])
    const [choosePaymentMethod, setChoosePaymentMethod] = useState(null)
    const route = useRoute()
    const params = route.params
    const formData = params?.formData

    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        } else {
            // Navigate to ControllScreen if there is no screen to go back to
            navigation.navigate('Root')
        }
    }

    const fetchData = async () => {
        try {
            setIsLoading(true)
            const userData = JSON.parse(await AsyncStorage.getItem('userInfor'))

            const user_id = userData.id
            let paymentMethodList = await api.getListPaymentMethodForUser(user_id)
            setPaymentMethodList(paymentMethodList.data.metaData)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }
    }
    const handlePayment = async () => {
        try {
            let result = await api.purchaseShoppingCartItem({
                formData: {
                    ...formData,
                    payment_method_id: choosePaymentMethod,
                },
            })
            console.log(result.data)
            if (result.data.statusCode === 201) {
                navigation.navigate('PaymentNotifyScreen', { messageContent: 'Payment successfully', typeNotify: 'success' })
            } else {
                navigation.navigate('PaymentNotifyScreen', { messageContent: 'Payment failed', typeNotify: 'payment_failed' })
            }
            //
        } catch (error) {
            navigation.navigate('PaymentNotifyScreen', { messageContent: 'Payment failed', typeNotify: 'payment_failed' })
            console.log(error)
        }
    }
    const handleChoosePaymentMethod = (user_payment_method_id) => {
        if (choosePaymentMethod === user_payment_method_id) {
            setChoosePaymentMethod(null)
        } else {
            setChoosePaymentMethod(user_payment_method_id)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (!formData) {
            navigation.navigate('Root')
        }
    }, [])
    if (isLoading) {
        return <LoadingScreen />
    }
    return (
        <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: colors.white }} keyboardShouldPersistTaps="handled">
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: colors.white,
                }}
            >
                <View
                    style={{
                        width: '100%',
                        marginLeft: 0,
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            handleGoBack()
                        }}
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                        }}
                    >
                        <Icons icon={'Back'} size={16} />
                        <Text style={{ fontSize: 18, fontWeight: 500 }}>Back</Text>
                    </TouchableOpacity>
                    <Text
                        style={{
                            marginTop: 24,
                            marginLeft: 12,
                            fontSize: 18,
                            fontWeight: 500,
                            width: '100%',
                        }}
                    >
                        Mời bạn chọn phương thức thanh toán
                    </Text>
                    {paymentMethodList.length > 0 ? (
                        <>
                            {paymentMethodList.map((value, index) => {
                                return (
                                    <TouchableOpacity
                                        key={value.id}
                                        onPress={() => {
                                            handleChoosePaymentMethod(value.id)
                                        }}
                                        style={{
                                            width: '100%',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <PaymentMethodItem value={value} activeItemId={choosePaymentMethod} />
                                    </TouchableOpacity>
                                )
                            })}
                        </>
                    ) : (
                        <View
                            style={{
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    color: colors.lightGray,
                                    width: '90%',
                                }}
                            >
                                Danh sách trống
                            </Text>
                        </View>
                    )}
                </View>
                <ButtonCustom
                    onPress={() => {
                        // purchaseProductItem()
                        handlePayment()
                    }}
                    style={{
                        position: 'absolute',
                        bottom: 24,
                        backgroundColor: colors.lightPurple,
                        width: '80%',
                        borderRadius: 16,
                        borderWidth: 1,
                        borderColor: colors.white,
                    }}
                    buttonTextStyle={{
                        color: colors.white,
                    }}
                    buttonText="Thanh toán"
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
