import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import icons from '../constants/icons'
export default function Icons({ onPress, icon, style, size = 32 }) {
    const image = (
        <Image
            source={icons[icon]}
            resizeMode="cover"
            style={[
                {
                    width: size,
                    height: size,
                },
                style,
            ]}
        />
    )
    if (onPress) {
        return (
            <TouchableOpacity
                style={[
                    {
                        width: size,
                        height: size,
                    },
                    style,
                ]}
                onPress={onPress}
            >
                <Image
                    source={icons[icon]}
                    resizeMode="cover"
                    style={[
                        {
                            width: size,
                            height: size,
                        },
                    ]}
                />
            </TouchableOpacity>
        )
    } else {
        return image
    }
}

const styles = StyleSheet.create({})
