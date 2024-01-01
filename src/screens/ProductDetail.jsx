import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { colors, sizes } from '../constants/theme'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icons from '../components/Icons'
import * as data from '../assets/listDataTest.json'
import SuggestProduct from '../components/SuggestProduct'
import { useRoute } from '@react-navigation/native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { useFocusEffect } from '@react-navigation/native'
import * as API from '../api/index'
import LoadingScreen from './LoadingScreen'
import { formatNumberWithCommas } from '../helper/fomat'
import ModalChooseVariation from '../components/ModalChooseVariation'
const ImageSekeleton = () => {
    return (
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item borderRadius={8} width={sizes.width} height={sizes.height / 2}></SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    )
}
function ProductDetail({ navigation }) {
    const [isLoading, setIsLoading] = useState(true)
    const [isImageLoading, setIsImageLoading] = useState(true)
    const [productDetail, setProductDetail] = useState(null)
    const [isShowModalChooseVariation, setIsShowModalChooseVariation] = useState(false)
    const [variationChoose, setVariationChoose] = useState([])
    const [purchaseForm, setPurChaseForm] = useState({})
    const [action_type, setAction_type] = useState('add_to_cart')

    const route = useRoute()

    const params = route.params
    const product_item_id = route.params?.product_item_id || '0030081012898317'

    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        } else {
            // Navigate to ControllScreen if there is no screen to go back to
            navigation.navigate('Root')
        }
    }
    const showModalChooseVariation = () => {
        setIsShowModalChooseVariation(true)
    }
    const hiddenModalChooseVariation = () => {
        setIsShowModalChooseVariation(false)
    }

    useFocusEffect(
        React.useCallback(() => {
            setIsLoading(true)
            async function fetchData() {
                let productDetailData = await API.getProductDetailData({
                    product_item_id: product_item_id,
                })
                setIsLoading(false)

                setProductDetail(productDetailData.data?.metaData)

                // ...
            }

            fetchData()

            return () => {
                console.log('unfocus root')
            }
        }, [navigation, product_item_id]),
    )
    if (isLoading || !productDetail?.product_image) {
        return <LoadingScreen />
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: colors.white, flex: 1 }} showsVerticalScrollIndicator={false}>
                <KeyboardAwareScrollView style={{ flex: 1, marginBottom: 20 }}>
                    <SafeAreaView
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: colors.white,
                        }}
                    >
                        {/* Image product  */}
                        <View
                            style={{
                                width: '100%',
                                height: sizes.height * (1 / 2),
                                backgroundColor: colors.moreLightGray,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {isImageLoading && <ImageSekeleton />}
                            <Image
                                style={[
                                    {
                                        marginTop: 4,
                                        width: '100%',
                                        height: sizes.height / 2,
                                        borderRadius: 8,
                                        resizeMode: 'contain',
                                        borderRadius: 8,
                                    },
                                    isImageLoading && styles.hidden,
                                ]}
                                source={{ uri: productDetail?.product_image }}
                                onLoadStart={(e) => {
                                    setIsImageLoading(true)
                                }}
                                onLoadEnd={(e) => {
                                    setIsImageLoading(false)
                                }}
                            />

                            {/* icons */}
                            <View
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    top: 12,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Icons
                                    style={{ marginLeft: 8 }}
                                    onPress={() => {
                                        handleGoBack()
                                    }}
                                    icon={'GoBack'}
                                    size={28}
                                />

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 4,
                                        marginRight: 8,
                                    }}
                                >
                                    <Icons style={{ marginLeft: 8 }} onPress={() => {}} icon={'ShareFill'} size={28} />
                                    <Icons style={{ marginLeft: 8 }} onPress={() => {}} icon={'AddShoppingCard'} size={28} />
                                    <Icons style={{ marginLeft: 8 }} onPress={() => {}} icon={'MoreInfor'} size={20} />
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                width: '100%',
                                marginVertical: 12,
                                marginLeft: 8,
                            }}
                        >
                            <Text
                                style={{
                                    width: '86%',
                                    fontSize: 18,
                                    fontWeight: '500',
                                    padding: 4,
                                }}
                            >
                                {productDetail.name}
                            </Text>
                            <Text
                                style={{
                                    color: colors.red,
                                    fontSize: 18,
                                    padding: 4,
                                    borderBottomWidth: 0,
                                }}
                            >
                                {`${formatNumberWithCommas(productDetail.price)} VND`}
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    borderTopWidth: 0.5,
                                    borderBottomWidth: 0.5,
                                    borderColor: colors.moreLightGray,
                                }}
                            >
                                {/* start  */}
                                <View
                                    style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            gap: 2,
                                            margin: 4,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Icons icon={'Star'} size={16} />
                                        <Icons icon={'Star'} size={16} />
                                        <Icons icon={'Star'} size={16} />
                                        <Icons icon={'Star'} size={16} />
                                        <Icons icon={'StarHalf'} size={16} />
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                marginLeft: 4,
                                            }}
                                        >
                                            4.6
                                        </Text>
                                        <Text
                                            style={{
                                                marginHorizontal: 8,
                                                color: colors.gray,
                                                fontSize: 20,
                                            }}
                                        >
                                            |
                                        </Text>
                                        <Text
                                            style={{
                                                color: colors.gray,
                                                fontSize: 14,
                                            }}
                                        >
                                            Đã bán 20k
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            gap: 12,
                                            marginRight: 20,
                                        }}
                                    >
                                        <Icons onPress={() => {}} icon={'FavoriteFill'} size={18} />
                                        <Icons onPress={() => {}} icon={'Share'} size={18} />
                                    </View>
                                </View>
                            </View>

                            {/* vocher ( promotion) */}
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'column',
                                    marginTop: 8,
                                    marginLeft: 4,
                                    justifyContent: 'center',
                                }}
                            >
                                <View
                                    style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 400,
                                            width: '80%',
                                        }}
                                    >
                                        Vocher
                                    </Text>
                                    <Icons icon={'Next'} size={18} style={{ marginRight: 12 }} />
                                </View>
                                <View
                                    style={{
                                        backgroundColor: colors.lightGray,
                                        width: '80%',
                                        height: 24,
                                        marginVertical: 4,
                                        borderRadius: 8,
                                    }}
                                />
                            </View>

                            {/* Tranport */}
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'column',
                                    marginTop: 8,
                                    marginLeft: 4,
                                    justifyContent: 'center',
                                }}
                            >
                                <View
                                    style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderTopWidth: 0.5,
                                        borderBottomWidth: 0.5,
                                        borderColor: colors.moreLightGray,
                                        paddingVertical: 8,
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '80%',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Icons
                                            icon={'Transport'}
                                            size={20}
                                            style={{
                                                margin: 4,
                                            }}
                                        />
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                fontWeight: 400,
                                            }}
                                        >
                                            Vận chuyển
                                        </Text>
                                    </View>
                                    <Icons icon={'Next'} size={18} style={{ marginRight: 12 }} />
                                </View>
                            </View>
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'column',
                                    marginTop: 8,
                                    marginLeft: 4,
                                    justifyContent: 'center',
                                }}
                            >
                                <View
                                    style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderBottomWidth: 0.5,
                                        borderColor: colors.moreLightGray,
                                        paddingVertical: 8,
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '80%',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 12,
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 200,
                                                backgroundColor: colors.moreLightGray,
                                            }}
                                        >
                                            <ImageBackground source={require('../../assets/icons/LogoNotText.png')} style={{ flex: 1 }} resizeMode="contain" />
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: 'column',
                                                gap: 4,
                                            }}
                                        >
                                            <Text style={{ fontSize: 14 }}>Meomeo shop</Text>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    gap: 4,
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Icons icon={'Map'} size={18} />
                                                <Text>Hà Nội</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/* description */}
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'column',
                                    marginTop: 8,
                                    marginLeft: 4,
                                    justifyContent: 'center',
                                }}
                            >
                                <View
                                    style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',

                                        borderBottomWidth: 0.5,
                                        borderColor: colors.moreLightGray,
                                        paddingVertical: 8,
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '80%',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                fontWeight: 400,
                                            }}
                                        >
                                            Mô tả sản phẩm
                                        </Text>
                                    </View>
                                    <Icons icon={'Next'} size={18} style={{ marginRight: 12 }} />
                                </View>
                            </View>
                            {/* Evaluate of customer */}
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'column',
                                    marginTop: 8,
                                    marginLeft: 4,
                                    justifyContent: 'center',
                                }}
                            >
                                <View
                                    style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',

                                        borderBottomWidth: 0.5,
                                        borderColor: colors.moreLightGray,
                                        paddingVertical: 12,
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '80%',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                fontWeight: 400,
                                            }}
                                        >
                                            Đánh giá sản phẩm
                                        </Text>
                                    </View>
                                    <Icons icon={'Next'} size={18} style={{ marginRight: 12 }} />
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 12,
                                        marginTop: 12,
                                    }}
                                >
                                    <View style={{ width: 48, height: 48 }}>
                                        <ImageBackground style={{ flex: 1 }} resizeMode="contain" source={require('../../assets/images/defaultAvatar.png')} />
                                    </View>
                                    {/*customer */}
                                    <View
                                        style={{
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Text style={{ fontSize: 14 }}>Customer name</Text>
                                        {/* start  */}
                                        <View
                                            style={{
                                                width: '100%',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    gap: 2,
                                                    margin: 4,
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Icons icon={'Star'} size={16} />
                                                <Icons icon={'Star'} size={16} />
                                                <Icons icon={'Star'} size={16} />
                                                <Icons icon={'Star'} size={16} />
                                                <Icons icon={'StarHalf'} size={16} />
                                            </View>

                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    gap: 12,
                                                    marginRight: 20,
                                                }}
                                            ></View>
                                        </View>
                                        <View
                                            style={{
                                                marginTop: 8,
                                                paddingTop: 4,
                                                borderTopWidth: 0.5,
                                                borderColor: colors.moreLightGray,
                                            }}
                                        >
                                            <Text>Sản phẩm rất tốt</Text>
                                        </View>
                                    </View>

                                    {/* date comment */}
                                    <View
                                        style={{
                                            position: 'absolute',
                                            right: 16,
                                            top: 0,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                width: '100%',
                                                color: colors.black,
                                            }}
                                        >
                                            1/1/2023
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        width: '100%',
                                        marginVertical: 24,
                                    }}
                                >
                                    <SuggestProduct listData={data.data} title={'Sản phẩm tương tự'} />
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </KeyboardAwareScrollView>
            </ScrollView>
            {/* Bottom bar */}
            <View
                style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    width: '100%',
                    height: 60,
                    bottom: 0,
                    backgroundColor: colors.white,
                    borderTopWidth: 1,
                    borderColor: colors.gray,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}
                >
                    <Icons icon={'Chat'} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}
                >
                    <Icons icon={'ShoppingCard'} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        showModalChooseVariation()
                        setAction_type('purchase_productItem')
                    }}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        backgroundColor: colors.lightPurple,
                        height: 60,
                    }}
                >
                    <Text style={{ fontSize: 20, color: colors.white }}>Mua</Text>
                </TouchableOpacity>
                <ModalChooseVariation
                    product_item_id={productDetail.id}
                    action_type={action_type}
                    visible={isShowModalChooseVariation}
                    closeModal={hiddenModalChooseVariation}
                    variation_list={productDetail.variation_list}
                    price={productDetail.price}
                    product_item_infor={
                        {
                            id : productDetail.id ,
                            SKU : productDetail.SKU,
                            qty_in_stock : productDetail.qty_in_stock,
                            product_image : productDetail.product_image,
                            price : productDetail.price,
                            rateValue : productDetail.rateValue
                        }
                    }
                />
            </View>
        </View>
    )
}
export default memo(ProductDetail, (prevProps, nextProps) => {
    return prevProps.someProp === nextProps.someProp
})
const styles = StyleSheet.create({
    hidden: {
        display: 'none',
    },
    show: {
        display: 'flex',
    },
})
