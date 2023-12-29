import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/theme'
import CartItem from '../components/CartItem'
import Icons from '../components/Icons'

export default function CartScreen({navigation}) {
    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        } else {
            // Navigate to ControllScreen if there is no screen to go back to
            navigation.navigate('Root')
        }
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
                <Text style = {{width : '90%' , marginVertical : 12 , fontSize : 20 , fontWeight : 500}}>Sản phẩm trong giỏ hàng</Text>
                <View style={{ width: '90%', alignItems: 'center', marginTop: 12 }}>
                    <CartItem />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
