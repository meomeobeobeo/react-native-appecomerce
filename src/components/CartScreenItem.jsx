import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { colors } from '../constants/theme'
import Icons from './Icons'

export default function CartScreenItem() {
    const [isLoadingImage, setIsLoadingImage] = useState(false)
    const [qty, setQty] = useState(1)
    useLayoutEffect(() => {
        if (qty < 0) {
            setQty(0)
        }
    }, [qty])
    return (
        <View
            style={{
                width: '100%',
                borderWidth: 2,
                borderColor: colors.lightPurple,
                height: 100,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <Image
                style={[
                    isLoadingImage && styles.hidden,
                    {
                        marginLeft: 8,
                        padding: 4,
                        width: 80,
                        height: 80, // Set fixed height to avoid resizing
                        borderRadius: 8,
                        resizeMode: 'contain',
                    },
                ]}
                source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/meoeco-d3c20.appspot.com/o/image%2FMacbook_Pro_14_inch_2022_Apple_M2_18p8-60.png-333638c4-02b6-48f3-8311-c9c219c29579?alt=media&token=ebff95e4-2587-4eb6-89cd-f23aecabf390',
                }}
                onLoadStart={(e) => {
                    setIsLoadingImage(true)
                }}
                onLoadEnd={(e) => {
                    setIsLoadingImage(false)
                }}
            />

            <View style={{ flexDirection: 'column', alignItems: 'center', gap: 12, marginLeft: 12, width: 252 }}>
                <Text style={{ width: '100%' }}>Macbook pro m1 14 inch</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 12,
                        width: '100%',
                    }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 100 }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                gap: 18,
                                alignItems: 'center',
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: colors.moreLightGray,
                                    padding: 8,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 8,
                                }}
                            >
                                <Icons
                                    onPress={() => {
                                        setQty((prev) => prev - 1)
                                    }}
                                    icon={'Minus'}
                                    size={10}
                                />
                            </View>
                            <Text
                                style={{
                                    color: colors.red,
                                    fontSize: 12,
                                }}
                            >
                                {qty}
                            </Text>
                            <View
                                style={{
                                    backgroundColor: colors.moreLightGray,
                                    padding: 8,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 8,
                                }}
                            >
                                <Icons
                                    onPress={() => {
                                        setQty((prev) => prev + 1)
                                    }}
                                    icon={'Plus'}
                                    size={10}
                                />
                            </View>
                        </View>
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: 500 }}>30000000 đ</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    hidden: {
        display: 'none',
    },
    show: {
        display: 'flex',
    },
})
