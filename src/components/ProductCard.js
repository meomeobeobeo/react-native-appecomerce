import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, sizes } from '../constants/theme'
import Icons from './Icons'

export default function ProductCard({ item }) {
    console.log(item)
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
                source={item.image}
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
                    fontSize: 20,
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
                    <Icons icon={'Scales'} size={18} />
                    <Text style={{ color: colors.blue }}>So sánh</Text>
                </View>
                <Icons icon={'Cartblack'} size={20} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
