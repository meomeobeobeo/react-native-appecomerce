import {
    ImageBackground,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Keyboard,
    FlatList,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { memo, useEffect, useLayoutEffect, useState } from 'react'
import { colors } from '../constants/theme'
import icons from '../constants/icons'
import ButtonCustom from './ButtonCustom'
import Icons from './Icons'
import * as api from '../api/index'
//action_type is 'add_product_to_cart' or 'purchase'

export function ModalChooseVariation({
    visible,
    closeModal,
    navigation,
    variation_list,
    action_type,
    functionAction,
    product_item_id,
    price,
}) {
    const [qty, setQty] = useState(1)
    const [product_configuration_list, setProduct_configuration_list] =
        useState([])

    const addOrRemoveProductConfigurationListFromArray = (
        product_configuration_id,
        variation_name,
        variation_id,
    ) => {
        // Check if variation_id is in the object { variation_id: '', variation_name: '', product_configuration_id: '' }
        if (product_configuration_list.length === 0) {
            // Add to list
            let newList = [
                ...product_configuration_list,
                {
                    product_configuration_id,
                    variation_name,
                    variation_id,
                },
            ]
            setProduct_configuration_list(newList)
        } else {
            if (
                product_configuration_list.find(
                    (value) => value.variation_id === variation_id,
                )
            ) {
                // Delete old
                let newList = product_configuration_list.filter(
                    (value) => value.variation_id !== variation_id,
                )
                newList.push({
                    product_configuration_id,
                    variation_name,
                    variation_id,
                })
                setProduct_configuration_list(newList)
            } else {
                let newList = [
                    ...product_configuration_list,
                    {
                        product_configuration_id,
                        variation_name,
                        variation_id,
                    },
                ]
                setProduct_configuration_list(newList)
            }
        }
    }

    // console.log(variation_list)
    const renderItem = ({ item, index, variation_name, variation_id }) => {
        let activeChoosen = product_configuration_list.find(
            (value) =>
                value.product_configuration_id ===
                item.product_configuration_id,
        )
        return (
            <TouchableOpacity
                onPress={() => {
                    addOrRemoveProductConfigurationListFromArray(
                        item.product_configuration_id,
                        variation_name,
                        variation_id,
                    )
                }}
                key={item.product_configuration_id}
                style={styles.gridItemContainer}
            >
                <View
                    style={[
                        styles.gridItem,
                        activeChoosen ? styles.active : {},
                    ]}
                >
                    <Text>{item.value}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    // console.log(variation_list)
    const listVariationName = variation_list?.map((value, index) => {
        return value?.variation_name
    })

    const purchaseProductItem = async () => {
        try {
            const userData = JSON.parse(await AsyncStorage.getItem('userInfor'))

            const user_id = userData.id
            const payment_method_id = '0030511258852154'
            const shipping_address_id = '0030511326754648'
            const shipping_method_id = '0030511287746640'
            const order_total = '1'
            const order_status = 'PENDING'
            const product_configuration_id_list =
                product_configuration_list.map((value) => {
                    return value?.product_configuration_id
                })
            //call api
            let result = await api.purchaseShoppingCartItem({
                formData: {
                    user_id: user_id,
                    order_date: new Date().toISOString(),
                    payment_method_id: payment_method_id,
                    shipping_address_id: shipping_address_id,
                    shipping_method_id: shipping_method_id,
                    order_total: order_total,
                    order_status: order_status,
                    product_item_id: product_item_id,
                    qty: qty.toString(),
                    price: price,
                    product_configuration_id_list:
                        product_configuration_id_list,
                },
            })
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(listVariationName)
    useLayoutEffect(() => {
        if (qty < 0) {
            setQty(0)
        }
    }, [qty])

    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <TouchableWithoutFeedback
                style={{ flex: 1 }}
                onPress={() => {
                    setQty(1)
                    setProduct_configuration_list([])
                    closeModal()
                    Keyboard.dismiss() // Close the keyboard if it's open
                }}
            >
                <View style={[styles.modalBackDrop]}>
                    <ScrollView
                        contentContainerStyle={{
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,0.0)',
                        }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View
                            style={[
                                {
                                    flex: 1,
                                    justifyContent: 'flex-end',
                                    alignItems: 'flex-end',
                                    backgroundColor: 'rgba(0,0,0,0.0)',
                                },
                            ]}
                        >
                            <TouchableWithoutFeedback
                                onPress={() => Keyboard.dismiss()}
                            >
                                <View
                                    style={[
                                        {
                                            backgroundColor:
                                                'rgba(255, 255, 255, 1)',
                                            padding: 16,
                                            width: '100%',
                                            height: '80%',
                                            borderTopRightRadius: 24,
                                            borderTopLeftRadius: 24,
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                        },
                                        styles.shadowProp,
                                    ]}
                                >
                                    {/* header */}
                                    <View
                                        style={{
                                            width: '40%',
                                            alignItems: 'center',
                                            height: 8,
                                            backgroundColor: colors.gray,
                                            borderRadius: 4,
                                        }}
                                    ></View>
                                    {/* Your other modal content goes here */}

                                    <View
                                        style={{
                                            width: '100%',
                                            padding: 8,
                                            flexDirection: 'row',
                                            gap: 24,
                                            marginTop: 12,
                                            alignItems: 'center',
                                            justifyContent: 'space-around',
                                            borderBottomColor:
                                                colors.moreLightGray,
                                            borderBottomWidth: 1,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 600,
                                            }}
                                        >
                                            Số lượng
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                gap: 18,
                                                alignItems: 'center',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    backgroundColor:
                                                        colors.moreLightGray,
                                                    padding: 8,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: 8,
                                                }}
                                            >
                                                <Icons
                                                    onPress={() => {
                                                        setQty(
                                                            (prev) => prev - 1,
                                                        )
                                                    }}
                                                    icon={'Minus'}
                                                    size={24}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    color: colors.red,
                                                    fontSize: 18,
                                                }}
                                            >
                                                {qty}
                                            </Text>
                                            <View
                                                style={{
                                                    backgroundColor:
                                                        colors.moreLightGray,
                                                    padding: 8,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: 8,
                                                }}
                                            >
                                                <Icons
                                                    onPress={() => {
                                                        setQty(
                                                            (prev) => prev + 1,
                                                        )
                                                    }}
                                                    icon={'Plus'}
                                                    size={24}
                                                />
                                            </View>
                                        </View>
                                    </View>

                                    {variation_list.map((variation, index) => {
                                        return (
                                            <View
                                                key={variation.variation_id}
                                                style={{ width: '100%' }}
                                            >
                                                <View
                                                    style={{
                                                        width: '100%',
                                                        padding: 8,
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 16,
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {
                                                            variation?.variation_name
                                                        }
                                                    </Text>
                                                    <FlatList
                                                        columnWrapperStyle={{
                                                            flex: 1,
                                                            justifyContent:
                                                                'space-between',
                                                        }}
                                                        scrollEnabled={false}
                                                        data={
                                                            variation?.configurations
                                                        }
                                                        renderItem={({
                                                            item,
                                                            index,
                                                        }) => {
                                                            return renderItem({
                                                                item,
                                                                index,
                                                                variation_name:
                                                                    variation?.variation_name,
                                                                variation_id:
                                                                    variation?.variation_id,
                                                            })
                                                        }}
                                                        keyExtractor={(item) =>
                                                            item.product_configuration_id
                                                        }
                                                        numColumns={2} // Change this value based on your desired number of columns
                                                    />
                                                </View>
                                            </View>
                                        )
                                    })}
                                    <ButtonCustom
                                        onPress={() => {
                                            purchaseProductItem()
                                        }}
                                        style={{
                                            position: 'absolute',
                                            bottom: 12,
                                            backgroundColor: colors.lightPurple,
                                            width: '80%',
                                            borderRadius: 16,
                                            borderWidth: 1,
                                            borderColor: colors.white,
                                        }}
                                        buttonTextStyle={{
                                            color: colors.white,
                                        }}
                                        buttonText="Thanh toán"
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default memo(ModalChooseVariation)
const styles = StyleSheet.create({
    gridItemContainer: {
        width: '50%', // Set the desired width for each item container (50% for two items in a row)
        // aspectRatio: 1, // Maintain a square aspect ratio (width:height = 1:1)
        padding: 8, // Adjust padding as needed
    },
    gridItem: {
        flex: 1,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: colors.moreLightGray, // Set the background color or other styles as needed
        borderWidth: 1,
        borderColor: colors.moreLightGray,
    },
    active: {
        borderWidth: 1,
        borderColor: colors.lightPurple,
        backgroundColor: colors.white,
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white,
    },
    slider: {
        backgroundColor: colors.white,
        flex: 5,
        marginBottom: 40,
    },
    modalBackDrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.0)',
    },
    shadowProp: {
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 2, // for android
    },
})
