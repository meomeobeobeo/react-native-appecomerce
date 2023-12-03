import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, sizes } from '../constants/theme'
import Icons from './Icons'

export default function ProductCard({ item }) {
    // console.log(item)
    return (
        <View
            style={{
                width: 180,
                margin: 4,
                padding: 4,
                backgroundColor: colors.white,
                borderRadius: 8,
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderColor : colors.moreLightGray,
                borderWidth : 1
            }}
        >
            {/* image product */}
            <Image
                style={{
                    marginTop: 4,
                    width: 120,
                    height: 120,
                    borderRadius: 8,
                    resizeMode: 'cover',
                }}
                source={{ uri: item.image }}
            />
            {/* name product */}
            <Text
                style={{
                    fontSize: 14,
                    marginTop: 4,
                }}
            >
                Iphone 14 Promax
            </Text>

            {/* evaluate : đánh giá */}
            <View style={{ flexDirection: 'row', gap: 2, margin: 4 }}>
                <Icons icon={'Star'} size={16} />
                <Icons icon={'Star'} size={16} />
                <Icons icon={'Star'} size={16} />
                <Icons icon={'Star'} size={16} />
                <Icons icon={'StarHalf'} size={16} />
            </View>
            {/* price */}
            <Text
                style={{
                    margin: 4,
                    fontSize: 18,
                }}
            >
                33,500,000 vnd
            </Text>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 12,
                    paddingHorizontal: 4,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 4,
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity style = {{flexDirection : 'row', gap : 4}}>
                        <Icons icon={'Scales'} size={18} />
                        <Text style={{ color: colors.blue }}>So sánh</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Icons icon={'Cartblack'} size={20} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
