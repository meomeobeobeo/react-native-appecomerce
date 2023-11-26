import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/theme'
import icons from '../constants/icons'

export default function ButtonCustom({
    onPress,
    iconName,
    iconButtonSize = 24,
    style = {},
    backgroundColor = '#111',
    width = '80%',
    borderRadius = 12,
    borderWidth = 1,
    buttonText = 'Hello',
    padding = 12,
    buttonTextStyle = {},
}) {
    // iconName is name of icon import as constants

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                {
                    backgroundColor: backgroundColor,
                    width: width,
                    borderRadius: borderRadius,
                    borderWidth: borderWidth,
                    padding: padding,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 8,
                },
                style,
            ]}
        >
            {iconName ? (
                <Image
                    source={icons[iconName]}
                    style={{ width: iconButtonSize, height: iconButtonSize }}
                />
            ) : (
                <></>
            )}

            <Text
                style={[
                    {
                        color: colors.white,
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: '600',
                    },
                    buttonTextStyle,
                ]}
            >
                {buttonText}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})
