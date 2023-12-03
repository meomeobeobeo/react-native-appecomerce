import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { sizes } from '../constants/theme'
import Icons from './Icons'

export default function ControllButton({ iconName, title, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: sizes.width - 16,
                paddingVertical: 12,
                borderTopWidth: 0.5,

                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    width: '10%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Icons size={18} icon={iconName}></Icons>
            </View>
            <Text
                style={{
                    width: '78%',
                    fontSize: 16,
                }}
            >
                {title}
            </Text>
            <View
                style={{
                    width: '10%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Icons size={18} icon={'ArrowRight'}></Icons>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})
