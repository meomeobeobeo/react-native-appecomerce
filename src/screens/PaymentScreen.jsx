import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useLayoutEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'

import * as api from '../api/index'
import { colors, sizes } from '../constants/theme'
import Icons from '../components/Icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PaymentMethodItem from '../components/PaymentMethodItem'
import ButtonCustom from '../components/ButtonCustom'
import LoadingScreen from './LoadingScreen'
import Collapsible from 'react-native-collapsible'
import Icon from 'react-native-vector-icons/FontAwesome'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'


const ImageSekeleton = () => {
    return (
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item width={120} height={120} borderRadius={8} />
        </SkeletonPlaceholder>
    )
}

const ProductInfor = ({ product_item_infor, qty, handleIncreaseQty, handleDecreaseQty }) => {
    // console.log(qty)
    const [isImageLoader, setIsImageLoader] = useState(false)
    return (
        <View style={{ marginLeft: 24, flexDirection: 'row', gap: 24, alignItems: 'center' }}>
            {isImageLoader && <ImageSekeleton />}
            <Image
                style={[
                    isImageLoader && styles.hidden,
                    {
                        marginTop: 4,
                        width: 80,
                        height: 80, // Set fixed height to avoid resizing
                        borderRadius: 20,
                        resizeMode: 'contain',
                    },
                ]}
                source={{
                    uri:
                        product_item_infor?.product_image ||
                        'https://firebasestorage.googleapis.com/v0/b/meoeco-d3c20.appspot.com/o/image%2Fquan.jpg-6fbeec7f-3527-45ca-a2f8-f63c4e9d536a?alt=media&token=144ac50b-0a33-455a-affa-421adc5a37f1',
                }}
                onLoadStart={(e) => {
                    setIsImageLoader(true)
                }}
                onLoadEnd={(e) => {
                    setIsImageLoader(false)
                }}
            />
            <View style={{ justifyContent: 'space-between', gap: 8 }}>
                <Text style={{ fontSize: 18 }}>Quần thể thao</Text>
                <Text style={{ color: colors.red }}>210,000 VND</Text>
                <View
                    style={{ flexDirection: 'row', width: 100, justifyContent: 'space-between', alignItems: 'center' }}
                >
                    <TouchableOpacity onPress={handleDecreaseQty}>
                        <Icon style={{}} name={'minus'} size={14} color={colors.black} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 14 }}>{qty?.toString() || 0}</Text>
                    <TouchableOpacity onPress={handleIncreaseQty}>
                        <Icon style={{}} name={'plus'} size={14} color={colors.black} />
                    </TouchableOpacity>
                </View>
            </View>
            <View></View>
        </View>
    )
}

export default function PaymentScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(false)
    const [paymentMethodList, setPaymentMethodList] = useState([])
    const [choosePaymentMethod, setChoosePaymentMethod] = useState(null)
    const [isExpandPaymentMethod, setIsExpandPaymentMethod] = useState(false)
    const [isExpandPromotion, setIsExpandPromotion] = useState(false)
    const [isExpandAddress, setIsExpandAddress] = useState(false)
    const [isExpandShippingMethod, setIsExpandShippingMethod] = useState(false)

    const route = useRoute()
    const params = route.params
    const formData = params?.formData
    const [qty, setQty] = useState(null)
    useEffect(() => {
        if (formData) {
            setQty(parseInt(formData.qty))
        }
    }, [formData])

    const handleIncreaseQty = () => {
        setQty((prev) => prev + 1)
    }
    const handleDecreaseQty = () => {
        setQty((prev) => prev - 1)
    }
    useLayoutEffect(() => {
        if (qty < 0) {
            setQty(0)
        }
    }, [qty])

    const product_item_infor = params?.product_item_infor
    // console.log(product_item_infor)

    const handleExpandPaymentMethod = () => {
        setIsExpandPaymentMethod(!isExpandPaymentMethod)
    }

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
            let data = JSON.stringify({
                ...formData,
                payment_method_id: choosePaymentMethod,
                qty: qty.toString(),
            })
         

            let result = await api.purchaseShoppingCartItem({
                formData: {
                    ...formData,
                    payment_method_id: choosePaymentMethod,
                    qty: qty.toString(),
                },
            })
            console.log(result.data)
            if (result.data.statusCode === 201) {
                navigation.navigate('PaymentNotifyScreen', {
                    messageContent: 'Payment successfully',
                    typeNotify: 'success',
                })
            } else {
                navigation.navigate('PaymentNotifyScreen', {
                    messageContent: 'Payment failed',
                    typeNotify: 'payment_failed',
                })
            }
            
        } catch (error) {
            navigation.navigate('PaymentNotifyScreen', {
                messageContent: 'Payment failed',
                typeNotify: 'payment_failed',
            })
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
        <ScrollView
            contentContainerStyle={{ flex: 1, backgroundColor: colors.white }}
            keyboardShouldPersistTaps="handled"
        >
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
                    <View
                        style={{
                            width: '100%',
                            marginTop: 24,
                            marginLeft: 0,
                            paddingVertical: 8,
                            borderWidth: 1,
                            borderColor: colors.moreLightGray,
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <Text
                            style={{
                                marginLeft: 24,
                                fontSize: 18,
                                fontWeight: 500,
                            }}
                        >
                            Địa chỉ nhận hàng
                        </Text>
                        <Icon
                            style={{ position: 'absolute', right: 12 }}
                            name={isExpandAddress ? 'chevron-right' : 'chevron-down'}
                            size={20}
                            color="#111"
                        />
                    </View>
                    {/* product infor */}
                    <View
                        style={{
                            width: '100%',
                            marginTop: 24,
                            marginLeft: 0,
                            paddingVertical: 8,
                            borderWidth: 1,
                            borderColor: colors.moreLightGray,
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <ProductInfor
                            qty={qty}
                            handleDecreaseQty={handleDecreaseQty}
                            handleIncreaseQty={handleIncreaseQty}
                            product_item_infor={product_item_infor}
                        />
                    </View>

                    <View
                        style={{
                            width: '100%',
                            marginLeft: 0,
                            paddingVertical: 8,
                            borderWidth: 1,
                            borderTopWidth: 0,
                            borderColor: colors.moreLightGray,
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <Text
                            style={{
                                marginLeft: 24,
                                fontSize: 18,
                                fontWeight: 500,
                            }}
                        >
                            Mã khuyễn mãi
                        </Text>
                        <Icon
                            style={{ position: 'absolute', right: 12 }}
                            name={isExpandPromotion ? 'chevron-right' : 'chevron-down'}
                            size={20}
                            color="#111"
                        />
                    </View>
                    <View
                        style={{
                            width: '100%',
                            marginLeft: 0,
                            paddingVertical: 8,
                            borderWidth: 1,
                            borderTopWidth: 0,
                            borderColor: colors.moreLightGray,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                marginLeft: 24,
                                fontSize: 18,
                                fontWeight: 500,
                            }}
                        >
                            Phương thức vận chuyển
                        </Text>
                        <Icon
                            style={{ position: 'absolute', right: 12 }}
                            name={isExpandShippingMethod ? 'chevron-right' : 'chevron-down'}
                            size={20}
                            color="#111"
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleExpandPaymentMethod}
                        style={{
                            width: '100%',
                            marginLeft: 0,
                            paddingVertical: 8,
                            flexDirection: 'row',
                            gap: 12,
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                marginLeft: 24,
                                fontSize: 18,
                                fontWeight: 500,
                            }}
                        >
                            Mời bạn chọn phương thức thanh toán
                        </Text>
                        <Icon
                            style={{ position: 'absolute', right: 12 }}
                            name={isExpandPaymentMethod ? 'chevron-right' : 'chevron-down'}
                            size={20}
                            color="#111"
                        />
                    </TouchableOpacity>
                    <Collapsible style={{ width: sizes.width - 16 }} collapsed={isExpandPaymentMethod}>
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
                    </Collapsible>
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
