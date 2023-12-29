import { Image, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native'
import { colors, sizes } from '../../constants/theme'

const data = [
    {
        id: '0',
        image: require('../../../assets/images/banner/banner1.png'),
    },
    {
        id: '1',
        image: require('../../../assets/images/banner/banner2.jpg'),
    },
    {
        id: '2',
        image: require('../../../assets/images/banner/banner3.jpg'),
    },
    {
        id: '3',
        image: require('../../../assets/images/banner/banner4.jpg'),
    },
    {
        id: '4',
        image: require('../../../assets/images/banner/banner5.jpg'),
    },
]
const renderItem = ({ item, index, itemStyle }) => {
    return <Image id={index.toString()} style={[itemStyle, { resizeMode: 'contain' }]} source={item.image} />
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
    const [activeIndex, setActiveIndex] = useState(0)

    const flashListRef = useRef()

    const getItemLayout = (data, index) => {
        return {
            length: sizes.width - 16,
            offset: (sizes.width - 16) * index,
            index: index,
        }
    }

    useEffect(() => {
        let interval = setInterval(() => {
            setActiveIndex(activeIndex + 1)
            if (activeIndex === data.length) {
                setActiveIndex(0)
                flashListRef.current.scrollToIndex({
                    index: 0,
                    animation: true,
                })
            } else {
                flashListRef.current.scrollToIndex({
                    index: activeIndex,
                    animation: true,
                })
            }
        }, 4000)

        return () => {
            clearInterval(interval)
        }
    })
    // console.log('Re render banner')
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
                ref={flashListRef}
                showsHorizontalScrollIndicator={false}
                style={bannerStyle}
                data={data}
                getItemLayout={getItemLayout}
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
