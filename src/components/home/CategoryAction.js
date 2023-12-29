import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../constants/theme'
import Icons from '../Icons'

//
export default function CategoryAction({ nameCategory, iconName, style }) {
    return (
        <TouchableOpacity
            style={[
                {
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                style,
            ]}
        >
            <View
                style={{
                    backgroundColor: colors.lightPurple,
                    width: 46,
                    height: 46,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                }}
            >
                <View
                    style={{
                        backgroundColor: colors.light,
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Icons icon={iconName} size={28} />
                </View>
            </View>
            <Text
                style={{
                    fontSize: 10,
                    marginBottom: 8,
                }}
            >
                {nameCategory}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})
