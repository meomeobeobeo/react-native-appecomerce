import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icons from '../components/Icons'
import { colors } from '../constants/theme'
import BottomCustom from '../components/ButtonCustom'
import * as api from '../api/index'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoadingModal from '../components/LoadingModal'

import LoadingScreen from './LoadingScreen'
import PaymentMethodItem from '../components/PaymentMethodItem'

export default function CreditCardScreen({ navigation }) {
    const [isShowFormCredit, setIsShowFormCredit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [paymentMethodList, setPaymentMethodList] = useState([])
    const [formCreditCard, setFormCreditCard] = useState({
        user_id: '',
        payment_type_id: '0030511238739031',
        cvv: '',
        account_number: '',
        expire_date: '',
        cart_holder_name: '',
    })
    const [userId, setUserId] = useState('')

    const fetchData = async () => {
        try {
            setIsLoading(true)
            const userData = JSON.parse(await AsyncStorage.getItem('userInfor'))

            const user_id = userData.id
            let paymentMethodList = await api.getListPaymentMethodForUser(user_id)

            setPaymentMethodList(paymentMethodList.data.metaData)
            setFormCreditCard({
                ...formCreditCard,
                user_id: user_id,
            })
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }
    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        } else {
            // Navigate to ControllScreen if there is no screen to go back to
            navigation.navigate('Root')
        }
    }
    const handleAddCreditCard = async () => {
        try {
            let request = await api.addCreditCard({ formData: formCreditCard })
            setFormCreditCard({
                payment_type_id: '0030511238739031',
                cvv: '',
                account_number: '',
                expire_date: '',
                cart_holder_name: '',
            })
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    if (isLoading) {
        return <LoadingModal />
    }
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
                        paddingBottom: 24,
                        borderBottomWidth: 1,
                        borderColor: colors.moreLightGray,
                    }}
                >
                    <Icons onPress={handleGoBack} icon={'Back'} size={18} />
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>Thẻ tín dụng , ghi nợ</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 12 }}>
                        <Icons icon={'Visa'} />
                        <Icons icon={'MasterCard'} />
                    </View>
                </View>
                <View
                    style={{
                        width: '84%',
                    }}
                >
                    <Text
                        style={{
                            width: '100%',
                            paddingVertical: 12,
                            fontSize: 16,
                        }}
                    >
                        Danh sách thẻ tín dụng
                    </Text>
                </View>
                <View
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {paymentMethodList.length > 0 ? (
                        <>
                            {paymentMethodList.map((value, index) => {
                                return <PaymentMethodItem key={value.id} value={value} />
                            })}
                        </>
                    ) : (
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: colors.lightGray, width: '84%' }}>Danh sách trống</Text>
                        </View>
                    )}
                </View>
                <View style={{ width: '100%' }}></View>
                <TouchableOpacity
                    onPress={() => {
                        setIsShowFormCredit(!isShowFormCredit)
                    }}
                    style={{
                        width: '84%',
                    }}
                >
                    <Text
                        style={{
                            width: '100%',
                            paddingVertical: 12,
                            fontSize: 16,
                        }}
                    >
                        Thêm thẻ thanh toán
                    </Text>
                </TouchableOpacity>
                {/* form */}
                {isShowFormCredit ? (
                    <>
                        <View
                            style={{
                                width: '84%',
                                marginTop: 18,
                                gap: 12,
                            }}
                        >
                            <TextInput
                                onChangeText={(e) => {
                                    setFormCreditCard({
                                        ...formCreditCard,
                                        account_number: e,
                                    })
                                }}
                                style={{
                                    width: '100%',
                                    height: 40,
                                    padding: 4,
                                    borderBottomColor: colors.moreLightGray,
                                    borderBottomWidth: 1,
                                }}
                                placeholder="Số thẻ"
                            />
                            <TextInput
                                onChangeText={(e) => {
                                    setFormCreditCard({
                                        ...formCreditCard,
                                        expire_date: e,
                                    })
                                }}
                                style={{
                                    width: '100%',
                                    height: 40,
                                    padding: 4,
                                    borderBottomColor: colors.moreLightGray,
                                    borderBottomWidth: 1,
                                }}
                                placeholder="Ngày hết hạn(MM/YY)"
                            />
                            <TextInput
                                style={{
                                    width: '100%',
                                    height: 40,
                                    padding: 4,
                                    borderBottomColor: colors.moreLightGray,
                                    borderBottomWidth: 1,
                                }}
                                placeholder="Mã CVV"
                                onChangeText={(e) => {
                                    setFormCreditCard({
                                        ...formCreditCard,
                                        cvv: e,
                                    })
                                }}
                            />
                            <TextInput
                                onChangeText={(e) => {
                                    setFormCreditCard({
                                        ...formCreditCard,
                                        cart_holder_name: e,
                                    })
                                }}
                                style={{
                                    width: '100%',
                                    height: 40,
                                    padding: 4,
                                    borderBottomColor: colors.moreLightGray,
                                    borderBottomWidth: 1,
                                }}
                                placeholder="Họ tên chủ thẻ"
                            />
                        </View>
                        <BottomCustom
                            onPress={() => {
                                handleAddCreditCard()
                            }}
                            buttonTextStyle={{
                                color: colors.lightPurple,
                                fontSize: 14,
                                fontWeight: '400',
                            }}
                            buttonText="Thêm thẻ tín dụng"
                            style={{
                                marginTop: 40,
                                backgroundColor: colors.moreLightGray,
                                borderWidth: 0,
                                width: 160,
                                height: 44,
                                borderRadius: 20,
                            }}
                        />
                    </>
                ) : (
                    <></>
                )}
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
