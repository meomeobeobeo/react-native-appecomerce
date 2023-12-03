import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icons from '../components/Icons'
import { colors } from '../constants/theme'
import InputField from '../components/InputField'
import BottomCustom from '../components/ButtonCustom'
import PreviewAddress from '../components/PreviewAddress'
export default function AddresssScreen({ navigation }) {
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
                        Địa chỉ
                    </Text>
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
                        Thêm địa chỉ
                    </Text>
                </TouchableOpacity>
                {/* input field */}
                <View style={{ width: '84%', marginTop: 32, gap: 12 }}>
                    <InputField
                        label={'Tỉnh/Thành phố, Quận/Huyện, Phường/Xã'}
                    />
                    <InputField label={'Tên đường, toà nhà , số nhà'} />
                </View>
                <BottomCustom
                    buttonTextStyle={{
                        color: colors.lightPurple,
                        fontSize: 14,
                        fontWeight: '400',
                    }}
                    buttonText="Thêm địa chỉ"
                    style={{
                        marginTop: 20,
                        backgroundColor: colors.moreLightGray,
                        borderWidth: 0,
                        width: 160,
                        height: 44,
                        borderRadius: 20,
                    }}
                />
                {/* Preview address */}
                <View
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                    }}
                >
                    <PreviewAddress />
                    <PreviewAddress />
                    <PreviewAddress />
                    <PreviewAddress />
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
