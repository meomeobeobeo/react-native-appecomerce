import { Animated, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/theme'

export default function ProgressiveImage({ style }) {
    const defaultImageAnimated = new Animated.Value(0)
    const imageAnimated = new Animated.Value(0)

    const handleDefaultImageLoad = () => {
        Animated.timing(defaultImageAnimated, {
            toValue: 1,
            useNativeDriver: true,
        }).start()
    }

    const handeleImageLoad = () => {
        Animated.timing(imageAnimated, {
            toValue: 1,
            useNativeDriver: true,
        }).start()
    }

    return (
        <View style={styles.container}>
            <Animated.Image
                source={''}
                style={[
                    style,
                    {
                        opacity: defaultImageAnimated,
                    },
                ]}
                onLoad={handleDefaultImageLoad}
                blurRadius={1}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.moreLightGray,
    },
    imageOverlay : {
        position : 'absolute',
        top : 0,
        bottom : 0,
        left : 0,
        right : 0
    }

})
