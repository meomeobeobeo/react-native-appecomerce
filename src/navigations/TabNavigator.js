import { Image, StyleSheet, Text, View, Animated, KeyboardAvoidingView } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import SearchScreen from '../screens/SearchScreen'
import FavoriteScreen from '../screens/FavoriteScreen'
import icons from '../constants/icons'
import Icons from '../components/Icons'
import { colors, sizes } from '../constants/theme'
import ControlScreen from '../screens/ControlScreen'
import LiveStreamScreen from '../screens/LiveStreamScreen'
import CategoryScreen from '../screens/CategoryScreen'

const Tab = createBottomTabNavigator()

const tabs = [
    {
        name: 'Home',
        icon: 'Home',
        screen: HomeScreen,
    },
    {
        name: 'Searh',
        icon: 'Search',
        screen: SearchScreen,
    },
    {
        name: 'Category',
        icon: 'Category',
        screen: CategoryScreen,
    },

    {
        name: 'LiveStream',
        icon: 'LiveStream',
        screen: LiveStreamScreen,
    },
    // {
    //     name: 'Favorite',
    //     icon: 'Favorite',
    //     screen: FavoriteScreen,
    // },
    {
        name: 'User',
        icon: 'User',
        screen: ControlScreen,
    },
]

export default function TabNavigator() {
    const animated = new Animated.Value(0)
    animated.addListener(() => {
        return
    })

    const offsetAnimation = React.useRef(animated).current
    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
            // keyboardVerticalOffset={sizes.height + 47}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: colors.white }}
            enabled
        >
            <Tab.Navigator
                sceneContainerStyle={{
                    backgroundColor: colors.white,
                }}
                safeAreaInsets={{ bottom: 0 }}
                initialRouteName="Search"
                screenOptions={{ headerShown: false, tabBarShowLabel: false }}
            >
                {tabs.map((tab, index) => {
                    return (
                        <Tab.Screen
                            key={tab.name}
                            name={tab.name}
                            component={tab.screen}
                            options={{
                                tabBarIcon: ({ focused }) => {
                                    return (
                                        <Icons
                                            style={{
                                                tintColor: focused ? colors.primary : colors.gray,
                                                backgroundColor: focused ? '#48ceff' : '#fff',
                                                borderRadius: 8,
                                            }}
                                            size={28}
                                            icon={tab.icon}
                                        />
                                    )
                                },
                            }}
                            listeners={{
                                focus: () => {
                                    Animated.spring(offsetAnimation, {
                                        toValue: index * (sizes.width / tabs.length),
                                        useNativeDriver: true,
                                    }).start()
                                },
                            }}
                        />
                    )
                })}
            </Tab.Navigator>
            <Animated.View
                style={[
                    styles.indicator,
                    {
                        transform: [
                            {
                                translateX: offsetAnimation,
                            },
                        ],
                    },
                ]}
            />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    indicator: {
        position: 'absolute',
        width: 10,
        height: 2,
        backgroundColor: colors.primary,
        zIndex: 100,
        bottom: 10,
        left: sizes.width / tabs.length / 2 - 5,
    },
    tabBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
})
