import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/theme'
import ProductCard from './ProductCard'

const data = [
    {
        id: '1',
        image: 'https://firebasestorage.googleapis.com/v0/b/meoeco-d3c20.appspot.com/o/image%2Fsnowy_castle_3.jpeg-6e4e9624-3cce-40d0-82d5-d0d569850bea?alt=media&token=ac263c8f-86b2-453c-8cf3-4da3834f463d',
    },
    // {
    //     id: '2',
    //     image: require('../../assets/images/hotels/ac-2.jpeg'),
    // },
    // {
    //     id: '3',
    //     image: require('../../assets/images/hotels/capri-1.jpeg'),
    // },
    // {
    //     id: '4',
    //     image: require('../../assets/images/hotels/capri-2.jpeg'),
    // },
    // {
    //     id: '5',
    //     image: require('../../assets/images/hotels/granada-1.jpeg'),
    // },
]
const renderItem = ({ item, index, itemStyle }) => {
    return <ProductCard item={item} key={index.toString()} />
}

export default function SuggestProduct({title , listProductData}) {
    return (
        <View
            style={{
                backgroundColor: colors.white,
                padding : 8,
                height: 320,
                borderRadius: 8,
                display: 'flex',
                flexDirection: 'column',
                marginBottom : 12,
                borderColor : colors.lightGray,
                borderTopWidth : 1
                
            }}
        >
            {/* header */}
            <View
                style={{
                    height: 40,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft:8
                }}
            >
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: '500',
                        flex: 4,
                    }}
                >
                    {title}
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
