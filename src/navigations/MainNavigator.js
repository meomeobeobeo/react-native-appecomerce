import {
    Animated,
    SafeAreaView,
    SafeAreaViewBase,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/HomeScreen'
import TabNavigator from './TabNavigator'
import Welcome from '../screens/Welcome'
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'

const Stack = createStackNavigator()
const animated = new Animated.Value(0)
animated.addListener(() => {
    return
})
export default function MainNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Welcome"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Root" component={TabNavigator} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={SignUpScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})
