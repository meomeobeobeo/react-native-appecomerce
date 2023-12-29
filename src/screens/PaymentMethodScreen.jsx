import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icons from '../components/Icons'
import { colors } from '../constants/theme'
import InputField from '../components/InputField'
import BottomCustom from '../components/ButtonCustom'
import PreviewAddress from '../components/PreviewAddress'
import ControllButton from '../components/ControllButton'
export default function PaymentMethodScreen({ navigation }) {
    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        } else {
            // Navigate to ControllScreen if there is no screen to go back to
            navigation.navigate('Root')
        }
    }
    const navigateToCreditCardScreen = () => {
        navigation.navigate('CreditCardScreen')
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
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>Phương thức thanh toán</Text>
                </View>
                <TouchableOpacity
                    style={{
                        width: '90%',
                    }}
                >
                    <Text
                        style={{
                            width: '100%',
                            paddingVertical: 12,
                            fontSize: 16,
                        }}
                    >
                        Phương thức thanh toán
                    </Text>
                </TouchableOpacity>
                <View
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 24,
                    }}
                >
                    <ControllButton onPress={navigateToCreditCardScreen} iconName={'CreditCard'} title={'Thẻ tín dụng, ghi nợ'} />
                    <ControllButton iconName={'DigitalWallet'} title={'Zalo Pay'} />
                    <ControllButton iconName={'DigitalWallet'} title={'Momo'} />
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
