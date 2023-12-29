import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import LottieView from 'lottie-react-native'

import successAnimate from '../assets/SuccessAnimation.json'
import errorAnimate from '../assets/PaymentFailed.json'
import Icons from '../components/Icons'
import { colors } from '../constants/theme'
import ButtonCustom from '../components/ButtonCustom'

export default function PaymentNotifyScreen({ navigation }) {

    const route = useRoute()
    const params = route.params
    const messageContent = params?.messageContent
    const typeNotify = params?.typeNotify
    console.log(params)

    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        } else {
            // Navigate to ControllScreen if there is no screen to go back to
            navigation.navigate('Root')
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white }}>
            <TouchableOpacity
                onPress={() => {
                    handleGoBack()
                }}
                style={{
                    position: 'absolute',
                    top: 12,
                    left: 8,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                }}
            >
                <Icons icon={'Back'} size={16} />
                <Text style={{ fontSize: 18, fontWeight: 500 }}>Back</Text>
            </TouchableOpacity>
            {typeNotify === 'success' ? (
                <LottieView
                    style={{
                        width: 200,
                        height: 200,
                    }}
                    source={successAnimate}
                    autoPlay
                    loop={false}
                    resizeMode="cover"
                ></LottieView>
            ) : (
                <LottieView
                    style={{
                        width: 200,
                        height: 200,
                    }}
                    source={errorAnimate}
                    autoPlay
                    loop={false}
                    resizeMode="cover"
                ></LottieView>
            )}
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: 500,
                }}
            >
                {messageContent}
            </Text>
            <ButtonCustom
                onPress={() => {handleGoBack()}
            }
                style={{
                    marginVertical: 24,
                    backgroundColor: colors.lightPurple,
                    width: '80%',
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: colors.white,
                }}
                buttonTextStyle={{
                    color: colors.white,
                }}
                buttonText="Tiếp tục"
            />
        </View>
    )
}

const styles = StyleSheet.create({})
