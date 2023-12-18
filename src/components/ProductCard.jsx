import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import React, { memo, useState } from 'react'
import { colors, sizes } from '../constants/theme'
import Icons from './Icons'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { formatNumberWithCommas } from '../helper/fomat'
import { useNavigation } from '@react-navigation/native'
const ImageSekeleton = () => {
    return (
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
                width={120}
                height={120}
                borderRadius={8}
            />
        </SkeletonPlaceholder>
    )
}

function ProductCard({ item }) {
    const [isLoading, setIsloading] = useState(true)
    const navigation = useNavigation()
    const navigateToDetailProduct = () => {
        navigation.navigate('ProductDetail', { product_item_id: item.id })
    }

    return (
        <Pressable
            android_ripple={{ color: colors.moreLightGray }}
            onPress={() => {
                navigateToDetailProduct()
            }}
            style={{
                width: 180,
                height: 300, // Set a fixed height
                margin: 4,
                padding: 4,
                backgroundColor: colors.white,
                borderRadius: 8,
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderColor: colors.moreLightGray,
                borderWidth: 1,
            }}
        >
            {/* image product */}
            {isLoading && <ImageSekeleton />}
            <Image
                style={[
                    isLoading && styles.hidden,
                    {
                        marginTop: 4,
                        width: 120,
                        height: 120, // Set fixed height to avoid resizing
                        borderRadius: 8,
                        resizeMode: 'contain',
                    },
                ]}
                source={{ uri: item.product_image }}
                onLoadStart={(e) => {
                    setIsloading(true)
                }}
                onLoadEnd={(e) => {
                    setIsloading(false)
                }}
            />
            {/* name product */}
            <View style={{ height: 30, alignItems: 'center' }}>
                <Text
                    style={{
                        fontSize: 14,
                        marginTop: 4,
                    }}
                >
                    {item.name}
                </Text>
            </View>

            {/* evaluate : đánh giá */}
            <View style={{ flexDirection: 'row', gap: 2, margin: 4 }}>
                <Icons icon={'Star'} size={16} />
                <Icons icon={'Star'} size={16} />
                <Icons icon={'Star'} size={16} />
                <Icons icon={'Star'} size={16} />
                <Icons icon={'StarHalf'} size={16} />
            </View>
            {/* price */}
            <View style={{ height: 30, alignItems: 'center' }}>
                <Text
                    style={{
                        margin: 4,
                        fontSize: 18,
                        color: colors.lightPurple,
                    }}
                >
                    {`${formatNumberWithCommas(item.price)} VND`}
                </Text>
            </View>
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
                    <TouchableOpacity style={{ flexDirection: 'row', gap: 4 }}>
                        <Icons icon={'Scales'} size={18} />
                        <Text style={{ color: colors.blue }}>So sánh</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Icons icon={'Cartblack'} size={20} />
                </TouchableOpacity>
            </View>
        </Pressable>
    )
}
export default memo(ProductCard)

const styles = StyleSheet.create({
    hidden: {
        display: 'none',
    },
    show: {
        display: 'flex',
    },
})
