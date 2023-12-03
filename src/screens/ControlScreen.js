import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import React from 'react'
import { colors } from '../constants/theme'
import ControllButton from '../components/ControllButton'
import ButtonCustom from '../components/ButtonCustom'

export default function ControlScreen({ navigation }) {
    const handleLogOut = async () => {
        navigation.navigate('Login')
    }
    const navigateToUserInformationScreen = () => {
        navigation.navigate('UserInformationScreen')
    }
    const navigateToAddressScreen = () => {
        navigation.navigate('AddressScreen')
    }
    const navigateToPaymentMethodScreen = () => {
        navigation.navigate('PaymentMethodScreen')
    }

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: colors.white,
            }}
        >
            <SafeAreaView
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                }}
            >
                {/* header */}
                <View
                    style={{
                        width: '100%',
                        marginLeft: 24,
                        marginTop: 24,
                        flexDirection: 'row',
                        alignContent: 'center',
                        alignItems: 'center',
                        gap: 8,
                    }}
                >
                    <Image
                        source={require('../../assets/images/defaultAvatar.png')}
                        style={{
                            // backgroundColor : colors.lightPurple,
                            width: 100,
                            height: 100,
                            borderRadius: 100,
                        }}
                    ></Image>
                    <View style={{ flexDirection: 'column' }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '500',
                                color: colors.black,
                            }}
                        >
                            Abc
                        </Text>
                        <Text
                            style={{
                                color: colors.lightGray,
                                fontSize: 16,
                                fontWeight: '400',
                            }}
                        >
                            abc@gmail.com
                        </Text>
                    </View>
                </View>
                {/* controll */}
                <View
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 24,
                    }}
                >
                    <ControllButton
                        iconName={'ShoppingBag'}
                        title={'Đơn hàng'}
                    />
                    <ControllButton
                        onPress={navigateToUserInformationScreen}
                        iconName={'User'}
                        title={'Thông tin tài khoản'}
                    />
                    <ControllButton
                        onPress={navigateToAddressScreen}
                        iconName={'Map'}
                        title={'Địa chỉ'}
                    />
                    <ControllButton iconName={'Quest'} title={'Trợ giúp'} />
                    <ControllButton
                        iconName={'Information'}
                        title={'Giới thiệu'}
                    />
                    <ControllButton
                        onPress={navigateToPaymentMethodScreen}
                        iconName={'Credit'}
                        title={'Phương thức thanh toán'}
                    />
                    <ControllButton iconName={'Language'} title={'Ngôn ngữ'} />
                </View>

                {/* button logout */}
                <ButtonCustom
                    onPress={handleLogOut}
                    buttonText="Đăng xuất"
                    iconName={'Logout'}
                    style={{
                        marginTop: 180,
                        marginBotton: 20,
                        borderWidth: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    buttonTextStyle={{
                        color: colors.lightPurple,
                    }}
                    iconButtonSize={18}
                    backgroundColor={'#F2F3F2'}
                />
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
