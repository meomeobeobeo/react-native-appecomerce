import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/theme'
import Icons from './Icons'

export default function InputField({ label, iconLabel, inputData, handleChangeInputData  }) {
    return (
        <View
            style={{
                paddingVertical: 6,
                gap: 8,
                borderBottomWidth: 1,
                borderBottomColor: colors.moreLightGray,
            }}
        >
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: colors.lightGray,
                    }}
                >
                    {label}
                </Text>
                {iconLabel ? <Icons icon={iconLabel} size={16} /> : <></>}
            </View>
            <TextInput value={inputData} style={{ height: 28, lineHeight: 20, fontSize: 18 }} />
        </View>
    )
}

const styles = StyleSheet.create({})
