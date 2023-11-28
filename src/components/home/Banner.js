import { Image, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { colors, sizes } from '../../constants/theme'

const data = [
    {
        id: '1',
        image: require('../../../assets/images/hotels/ac-1.jpeg'),
    },
    {
        id: '2',
        image: require('../../../assets/images/hotels/ac-2.jpeg'),
    },
    {
        id: '3',
        image: require('../../../assets/images/hotels/capri-1.jpeg'),
    },
    {
        id: '4',
        image: require('../../../assets/images/hotels/capri-2.jpeg'),
    },
    {
        id: '5',
        image: require('../../../assets/images/hotels/granada-1.jpeg'),
    },
]
const renderItem = ({ item, index, itemStyle }) => {
    return (
        <Image
            id={index.toString()}
            style={[itemStyle, { resizeMode: 'cover' }]}
            source={item.image}
        />
    )
}
const DotIndicators = ({ listData, styleAll, currentIndex }) => {
    return (
        <View
            style={[
                {
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 4,
                    position: 'absolute',
                },
                styleAll,
            ]}
        >
            {listData.map((data, index) => {
                if (currentIndex == index) {
                    return (
                        <View
                            key={index}
                            style={{
                                backgroundColor: colors.orange,
                                height: 8,
                                width: 8,
                                borderRadius: 4,
                            }}
                        ></View>
                    )
                } else {
                    return (
                        <View
                            key={index}
                            style={{
                                backgroundColor: colors.lightGray,
                                height: 8,
                                width: 8,
                                borderRadius: 4,
                            }}
                        ></View>
                    )
                }
            })}
        </View>
    )
}

function Banner({ bannerStyle, itemStyle }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    console.log('Re render banner')
    const handleScroll = useCallback((event) => {
        //get the scroll position
        //get the index of current active item
        //update the index
        const scrollPosition = event.nativeEvent.contentOffset.x
        const index = Math.round(scrollPosition / (sizes.width - 16))
        setCurrentIndex(index)
    }, [])

    return (
        <View style={{ flex: 1, position: 'relative', alignItems: 'center' }}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                style={bannerStyle}
                data={data}
                renderItem={({ item, index }) => {
                    return renderItem({ item, index, itemStyle })
                }}
                pagingEnabled={true}
                horizontal={true}
                onScroll={handleScroll}
            />
            <DotIndicators
                styleAll={{
                    bottom: 4,
                    paddingVertical: 2,
                    paddingHorizontal: 8,
                    borderRadius: 4,
                }}
                currentIndex={currentIndex}
                listData={data}
            />
        </View>
    )
}
export default memo(Banner)

const styles = StyleSheet.create({})
