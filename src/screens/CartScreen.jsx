import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/theme'
import Icons from '../components/Icons'
import CartScreenItem from '../components/CartScreenItem'
import ButtonCustom from '../components/ButtonCustom'

export default function CartScreen({ navigation }) {
    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        } else {
            // Navigate to ControllScreen if there is no screen to go back to
            navigation.navigate('Root')
        }
    }
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <ScrollView
                contentContainerStyle={{ backgroundColor: colors.white, width: '100%' }}
                keyboardShouldPersistTaps="handled"
            >
                <View
                    style={{
                        width: '100%',
                        alignItems: 'center',

                        backgroundColor: colors.white,
                        marginBottom: 80,
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
                    <Text style={{ width: '90%', marginVertical: 12, fontSize: 20, fontWeight: 500 }}>
                        Sản phẩm trong giỏ hàng
                    </Text>
                    <View style={{ width: '90%', alignItems: 'center', marginTop: 12, gap: 8 }}>
                        <CartScreenItem />
                        <CartScreenItem />
                        <CartScreenItem />
                        <CartScreenItem />
                        <CartScreenItem />
                        <CartScreenItem />
                        <CartScreenItem />
                        <CartScreenItem />
                        <CartScreenItem />
                        <CartScreenItem />
                    </View>
                </View>
            </ScrollView>
            <View style = {{width : '100%' , alignItems : 'center'}}>
                <ButtonCustom
                    onPress={() => {
                        // purchaseProductItem()
                        // handlePayment()
                    }}
                    style={{
                        position: 'absolute',
                        bottom: 12,
                        backgroundColor: colors.lightPurple,
                        width: '80%',
                        borderRadius: 16,
                        borderWidth : 0
                    }}
                    buttonTextStyle={{
                        color: colors.white,
                    }}
                    buttonText="Thanh toán"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
