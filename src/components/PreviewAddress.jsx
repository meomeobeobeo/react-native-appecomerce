import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/theme'
import Icons from './Icons'

export default function PreviewAddress({}) {
    return (
        <View
            style={{
                width: '84%',
                marginTop: 0,
                borderTopColor: colors.moreLightGray,
                borderTopWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    paddingVertical: 12,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Icons icon={'Address'} size={24} />
                <View style={{ width: '80%' }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 500,
                        }}
                    >
                        Cầu Giấy
                    </Text>
                    <Text style={{}}>Toà 9C</Text>
                </View>
                <Icons onPress={() => {}} icon={'EditText'} size={18} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
