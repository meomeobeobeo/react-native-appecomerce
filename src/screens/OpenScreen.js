import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import icons from '../constants/icons'
import { sizes } from '../constants/theme'

export default function OpenScreen() {
    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
            }}
        >
            <View
                style={{
                    width: sizes.width * 0.7,
                    height: sizes.width * 0.7,
                    backgroundColor: '#fff',
                }}
            >
                <ImageBackground
                    source={icons.Logo}
                    resizeMode="cover"
                    style={styles.image}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center',
    },
})
