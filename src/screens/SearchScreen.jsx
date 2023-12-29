import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, sizes } from '../constants/theme'
import Icons from '../components/Icons'
import CategoryAction from '../components/home/CategoryAction'
import { useTranslation } from 'react-i18next'
import { useFocusEffect } from '@react-navigation/native'
import { Keyboard } from 'react-native'

const SuggestSearch = ({ active, onClose, onOpen }) => {
    const containerRef = useRef()

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                console.log('true search ')
                onOpen()
            }}
        >
            <View
                ref={containerRef}
                style={[
                    {
                        flex: 1,
                        position: 'absolute',
                        width: '96%',
                        height: sizes.height / 4,
                        backgroundColor: colors.moreLightGray,
                        zIndex: 10,
                        top: 56,
                        display: 'none',
                        borderRadius: 12,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    },
                    active ? styles.showComponent : styles.hiddenComponent,
                ]}
            >
                <TouchableOpacity
                    onPress={() => {
                        console.log('search ')
                    }}
                    style={{
                        width: '96%',
                        padding: 8,
                        borderBottomWidth: 0.5,
                        borderBottomColor: colors.blue,
                        marginHorizontal: 8,
                    }}
                >
                    <Text style={{}}>Thể thao</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: '96%',
                        padding: 8,
                        borderBottomWidth: 0.5,
                        borderBottomColor: colors.blue,
                        marginHorizontal: 8,
                    }}
                >
                    <Text style={{}}>Sữa rửa mặt</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: '96%',
                        padding: 8,
                        borderBottomWidth: 0.5,
                        borderBottomColor: colors.blue,
                        marginHorizontal: 8,
                    }}
                >
                    <Text style={{}}>Bàn học</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default function SearchScreen({ navigation }) {
    const { t } = useTranslation()
    const [isShowSuggestSearch, setIsShowSuggestSearch] = useState(false)
    const searchTextRef = useRef()
    const suggestSearchRef = useRef()

    const showSuggestSearch = () => {
        setIsShowSuggestSearch(true)
    }
    const closeSuggestSearch = () => {
        setIsShowSuggestSearch(false)
    }

    useFocusEffect(
        React.useCallback(() => {
            searchTextRef.current.focus()
            setIsShowSuggestSearch(true)
            return () => {
                console.log('unfocus search screen')
            }
        }, [navigation]),
    )

    return (
        <TouchableWithoutFeedback
            onPress={(event) => {
                setIsShowSuggestSearch(false)
                console.log('click out side')
                Keyboard.dismiss() // Dismiss the keyboard if it's open
            }}
        >
            <ScrollView style={{ flex: 1, margin: 0, backgroundColor: colors.white }}>
                <SafeAreaView
                    onTouchStart={(event) => {}}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.white,
                    }}
                >
                    {/* Head */}
                    <View
                        style={{
                            width: '100%',
                            height: 64,
                            backgroundColor: colors.lightPurple,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <View
                            style={{
                                height: 40,
                                width: '94%',
                                backgroundColor: colors.moreLightGray,
                                borderRadius: 14,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <TextInput
                                onSubmitEditing={() => {
                                    console.log('submit')
                                    setIsShowSuggestSearch(false)
                                }}
                                onFocus={() => {
                                    showSuggestSearch()
                                }}
                                ref={searchTextRef}
                                placeholder="Tìm kiếm"
                                style={{
                                    width: '80%',
                                    height: 40,
                                    lineHeight: 32,
                                    marginLeft: 8,
                                }}
                            />
                            <View
                                style={{
                                    backgroundColor: colors.black,
                                    marginRight: 8,
                                    padding: 4,
                                    borderRadius: 8,
                                }}
                            >
                                <Icons
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: colors.black,
                                        borderRadius: 6,
                                    }}
                                    size={24}
                                    icon="SearchWhite"
                                    onPress={() => {}}
                                />
                            </View>
                        </View>
                    </View>
                    {/* the most search  */}
                    <View
                        style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '500',
                                marginLeft: 8,
                                width: '100%',
                            }}
                        >
                            Tìm kiếm phổ biến
                        </Text>
                        <View
                            style={{
                                marginLeft: 8,

                                paddingVertical: 12,

                                borderColor: colors.moreLightGray,
                                borderTopWidth: 1,
                                borderBottomWidth: 1,

                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                gap: 8,
                                width: '100%',
                                height: 'auto',
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                            }}
                        >
                            <TouchableOpacity>
                                <Text
                                    style={{
                                        paddingVertical: 4,
                                        paddingHorizontal: 12,
                                        backgroundColor: colors.moreLightGray,
                                        borderRadius: 6,
                                    }}
                                >
                                    bông tẩy trang giảm giá
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text
                                    style={{
                                        paddingVertical: 4,
                                        paddingHorizontal: 12,
                                        backgroundColor: colors.moreLightGray,
                                        borderRadius: 6,
                                    }}
                                >
                                    áo khoác kaki nam
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text
                                    style={{
                                        paddingVertical: 4,
                                        paddingHorizontal: 12,
                                        backgroundColor: colors.moreLightGray,
                                        borderRadius: 6,
                                    }}
                                >
                                    áo dài cách tân
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text
                                    style={{
                                        paddingVertical: 4,
                                        paddingHorizontal: 12,
                                        backgroundColor: colors.moreLightGray,
                                        borderRadius: 6,
                                    }}
                                >
                                    bim bim oishi
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text
                                    style={{
                                        paddingVertical: 4,
                                        paddingHorizontal: 12,
                                        backgroundColor: colors.moreLightGray,
                                        borderRadius: 6,
                                    }}
                                >
                                    cánh gà
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text
                                    style={{
                                        paddingVertical: 4,
                                        paddingHorizontal: 12,
                                        backgroundColor: colors.moreLightGray,
                                        borderRadius: 6,
                                    }}
                                >
                                    thịt
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* category  */}
                    <View
                        style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                width: '100%',
                                fontSize: 20,
                                fontWeight: '500',
                                marginLeft: 8,
                            }}
                        >
                            Danh mục sản phẩm
                        </Text>
                        <View
                            style={{
                                maxWidth: '96%',
                                justifyContent: 'space-between',

                                paddingVertical: 12,

                                borderColor: colors.moreLightGray,
                                borderTopWidth: 1,
                                borderBottomWidth: 1,

                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',

                                width: '100%',
                                height: 'auto',
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                            }}
                        >
                            <CategoryAction
                                style={{
                                    width: 72,
                                }}
                                nameCategory={t('sport')}
                                iconName={'SoccerBall'}
                            />
                            <CategoryAction
                                style={{
                                    width: 72,
                                }}
                                nameCategory={t('fashion')}
                                iconName={'Fashion'}
                            />
                            <CategoryAction
                                style={{
                                    width: 72,
                                }}
                                nameCategory={t('study')}
                                iconName={'Book'}
                            />
                            <CategoryAction
                                style={{
                                    width: 72,
                                }}
                                nameCategory={t('beautify')}
                                iconName={'Beauty'}
                            />
                            <CategoryAction
                                style={{
                                    width: 72,
                                }}
                                nameCategory={t('technology')}
                                iconName={'Technology'}
                            />
                            <CategoryAction
                                style={{
                                    width: 72,
                                }}
                                nameCategory={t('houseware')}
                                iconName={'HouseWare'}
                            />
                            <CategoryAction
                                style={{
                                    width: 72,
                                }}
                                nameCategory={t('health')}
                                iconName={'HealthCare'}
                            />
                            <CategoryAction
                                style={{
                                    width: 72,
                                }}
                                nameCategory={t('food')}
                                iconName={'Food'}
                            />
                            <CategoryAction
                                style={{
                                    width: 72,
                                }}
                                nameCategory={t('shoes')}
                                iconName={'Shoes'}
                            />
                            <CategoryAction
                                style={{
                                    width: 72,
                                }}
                                nameCategory={t('toy')}
                                iconName={'ToyStore'}
                            />
                        </View>
                    </View>

                    <SuggestSearch onOpen={showSuggestSearch} onClose={closeSuggestSearch} active={isShowSuggestSearch} />
                </SafeAreaView>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    showComponent: {
        display: 'flex',
    },
    hiddenComponent: {
        display: 'none',
    },
})
