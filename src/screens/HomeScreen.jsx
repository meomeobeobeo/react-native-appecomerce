import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import icons from '../constants/icons'
import { colors, sizes } from '../constants/theme'
import CardButton from '../components/CardButton'
import NotifyButton from '../components/NotifyButton'
import Icons from '../components/Icons'
import Banner from '../components/home/Banner'
import QuickAccessDirecTory from '../components/home/QuickAccessDirecTory'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SuggestProduct from '../components/SuggestProduct'
import * as API from '../api/index'
import LoadingScreen from './LoadingScreen'
export const HomeContext = createContext()


export default function HomeScreen({ navigation }) {
    console.log('rerender home')

    const [listSellingProduct, setListSellingProduct] = useState([])
    const [listOutstandingProduct, setListOutstandingProduct] = useState([])
    const [listProduct, setListProduct] = useState([])

    const [isLoading, setIsloading] = useState(false)
    // console.log(listSellingProduct)

    useFocusEffect(
        React.useCallback(() => {
            setIsloading(true)
            async function fetchData() {
                const userData = await AsyncStorage.getItem('userInfor')
                const sellingProduct = await API.getAllSellingProducts()
                const outStandingProduct = await API.getAllOutStandingProducts()

                setListSellingProduct(sellingProduct.data.metaData)
                setListOutstandingProduct(outStandingProduct.data.metaData)
                setIsloading(false)
                // ...
            }

            fetchData()

            return () => {
                console.log('unfocus root')
            }
        }, [navigation]),
    )

    const handleSearchForcus = () => {
        navigation.navigate('SearchScreen')
    }

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <HomeContext.Provider
            value={{
                listSellingProduct: listSellingProduct,
                listOutstandingProduct: listOutstandingProduct,
                listProduct: listProduct,
            }}
        >
            <ScrollView
                style={{ backgroundColor: colors.white }}
                showsVerticalScrollIndicator={false}
            >
                <KeyboardAwareScrollView style={{ flex: 1, marginBottom: 20 }}>
                    <SafeAreaView
                        style={{
                            flex: 1,
                            backgroundColor: '#fff',
                        }}
                    >
                        {/* Header home cart icon ,  */}
                        <View
                            style={{
                                width: '100%',
                                marginBottom: 24,
                            }}
                        >
                            <View
                                style={{
                                    width: 45,
                                    height: 48,
                                    margin: 8,
                                    justifyContent: 'center',
                                }}
                            >
                                <ImageBackground
                                    source={icons.LogoNotText}
                                    resizeMode="cover"
                                    style={styles.image}
                                />
                            </View>

                            <View
                                style={{
                                    position: 'absolute',
                                    width: (sizes.width * 1) / 3,
                                    height: (sizes.width * 1) / 3,
                                    backgroundColor: colors.lightPurple,
                                    right: 0,
                                    borderBottomLeftRadius:
                                        (sizes.width * 1) / 3,
                                }}
                            >
                                <View
                                    style={{
                                        width: '100%',
                                        gap: 16,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        marginTop: 8,
                                        padding: 8,
                                    }}
                                >
                                    <NotifyButton />
                                    <CardButton />
                                </View>
                            </View>
                            {/*  Search*/}
                            <View
                                style={{
                                    width: '70%',
                                    margin: 8,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <TextInput
                                    onFocus={handleSearchForcus}
                                    placeholder="Tìm Kiếm"
                                    style={{
                                        width: '100%',
                                        padding: 8,
                                        backgroundColor: '#F2F3F2',
                                        borderRadius: 8,
                                    }}
                                    keyboardShouldPersistTaps="handled"
                                    keyboardType="default"
                                />
                                <Icons
                                    style={{
                                        position: 'absolute',
                                        right: 4,
                                        padding: 4,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#ccc',
                                        borderRadius: 6,
                                    }}
                                    icon="Search"
                                    onPress={() => {}}
                                />
                            </View>
                        </View>
                        {/*Banner  */}
                        {/* Banner */}
                        <View
                            style={{
                                width: sizes.width - 16,
                                backgroundColor: colors.white,
                                marginLeft: 8,
                                height: 180,
                                borderRadius: 12,
                            }}
                        >
                            <Banner
                                bannerStyle={styles.bannerStyle}
                                itemStyle={styles.itemStyle}
                            />
                        </View>

                        {/* Quick access category and service */}
                        <View
                            style={{
                                width: sizes.width - 16,
                                backgroundColor: '#fff',
                                marginLeft: 8,
                                marginTop: 8,
                                height: 90,
                                borderRadius: 12,
                            }}
                        >
                            <QuickAccessDirecTory />
                        </View>

                        {/* Today suggest */}
                        <View
                            style={{
                                width: sizes.width - 16,
                                marginLeft: 8,
                                marginTop: 12,
                            }}
                            showsVerticalScrollIndicator={false}
                        >
                            <SuggestProduct
                                listData={listSellingProduct}
                                title={'Bán chạy'}
                            />
                            <SuggestProduct
                                listData={listOutstandingProduct}
                                title={'Sản phẩm nổi bật'}
                            />
                            <SuggestProduct title={'Có thể bạn sẽ thích'} />
                        </View>
                    </SafeAreaView>
                </KeyboardAwareScrollView>
            </ScrollView>
        </HomeContext.Provider>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    bannerStyle: {
        borderRadius: 8,
        height: 180,
    },
    itemStyle: {
        height: 180,
        width: sizes.width - 16,
        borderRadius: 8,
    },
})
