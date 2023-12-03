import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icons from '../components/Icons'
import { colors } from '../constants/theme'
import BottomCustom from '../components/ButtonCustom'

export default function CreditCardScreen({ navigation }) {
    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        } else {
            // Navigate to ControllScreen if there is no screen to go back to
            navigation.navigate('Root')
        }
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
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>
                        Thẻ tín dụng , ghi nợ
                    </Text>
                    <View style={{ flexDirection: 'row', marginLeft: 12 }}>
                        <Icons icon={'Visa'} />
                        <Icons icon={'MasterCard'} />
                    </View>
                </View>
                <TouchableOpacity
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
                <View
                    style={{
                        width: '84%',
                        marginTop: 18,
                        gap: 12,
                    }}
                >
                    <TextInput
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
                    />
                    <TextInput
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
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
