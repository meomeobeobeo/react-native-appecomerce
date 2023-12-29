import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import icons from '../constants/icons'
import { sizes } from '../constants/theme'
import LottieView from 'lottie-react-native'
import loadingAnimate from '../assets/Loading.json'
export default function LoadingScreen() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <LottieView
                style={{
                    width: sizes.width * (1 / 2),
                    height: sizes.width * (1 / 2),
                }}
                source={loadingAnimate}
                autoPlay
                loop
                resizeMode="cover"
                // onAnimationFinish={() => {}}
            ></LottieView>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
