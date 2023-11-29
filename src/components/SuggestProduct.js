import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/theme'
import ProductCard from './ProductCard'

const data = [
    {
        id: '1',
        image: require('../../assets/images/hotels/ac-1.jpeg'),
    },
    {
        id: '2',
        image: require('../../assets/images/hotels/ac-2.jpeg'),
    },
    {
        id: '3',
        image: require('../../assets/images/hotels/capri-1.jpeg'),
    },
    {
        id: '4',
        image: require('../../assets/images/hotels/capri-2.jpeg'),
    },
    {
        id: '5',
        image: require('../../assets/images/hotels/granada-1.jpeg'),
    },
]
const renderItem = ({ item, index, itemStyle }) => {
    return <ProductCard item={item} key={index.toString()} />
}

export default function SuggestProduct() {
    return (
        <View
            style={{
                backgroundColor: '#eee',
                height: 300,
                borderRadius: 8,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* header */}
            <View
                style={{
                    height: 40,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: '700',
                        flex: 4,
                    }}
                >
                    BÁN CHẠY
                </Text>
                <Text
                    style={{
                        fontSize: 18,
                        color: colors.purple,
                        fontWeight: '400',
                        flex: 1,
                    }}
                >
                    Thêm
                </Text>
            </View>
            {/* Body  */}
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({ item, index }) => {
                    return renderItem({ item, index })
                }}
                style={{
                    width: '100%',
                }}
                horizontal={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
