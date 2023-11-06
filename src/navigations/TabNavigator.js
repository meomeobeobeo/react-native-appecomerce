import { Image, StyleSheet, Text, View, Animated } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import SearchScreen from '../screens/SearchScreen'
import FavoriteScreen from '../screens/FavoriteScreen'
import icons from '../constants/icons'
import Icons from '../components/Icons'
import { colors, sizes } from '../constants/theme'
import UserScreen from '../screens/UserScreen'
import LoginScreen from '../screens/LoginScreen'

const Tab = createBottomTabNavigator()

const tabs = [
    {
        name: "Home",
        icon: "Home",
        screen: HomeScreen
    },
    {
        name: "Search",
        icon: "Search",
        screen: SearchScreen
    },
    {
        name: "Favorite",
        icon: "Favorite",
        screen: FavoriteScreen
    },
    {
        name: "User",
        icon: "User",
        screen: LoginScreen
    }
    
]

export default function TabNavigator() {
    const offsetAnimation = React.useRef(new Animated.Value(0)).current;
    return (
        <>
            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={{ headerShown: false, tabBarShowLabel: false }}
            >

                {
                    tabs.map((tab , index) => {
                        return (
                            <Tab.Screen
                                key={tab.name}
                                name={tab.name}
                                component={tab.screen}
                                options={{
                                    tabBarIcon: ({ focused }) => {
                                        return (
                                            <Icons style={{ tintColor: focused ? colors.primary : colors.gray , backgroundColor : focused ? '#48ceff' : '#fff', borderRadius : 8}} size={36} icon={tab.icon} />
                                        )
                                    }
                                }}
                                listeners={{
                                    focus: () => {
                                        Animated.spring(offsetAnimation, {
                                            toValue: index * (sizes.width / tabs.length),
                                            useNativeDriver: true,
                                        }).start();
                                    },
                                }}
                            />
                        )
                    })
                }



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
        </>
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
})