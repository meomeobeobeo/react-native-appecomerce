import { Animated, SafeAreaView, SafeAreaViewBase, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/HomeScreen'
import TabNavigator from './TabNavigator'
import Welcome from '../screens/Welcome'
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'
import UserInformationScreen from '../screens/UserInformationScreen'
import AddresssScreen from '../screens/AddresssScreen'
import PaymentMethodScreen from '../screens/PaymentMethodScreen'
import CreditCardScreen from '../screens/CreditCardScreen'
import SearchScreen from '../screens/SearchScreen'
import ProductDetail from '../screens/ProductDetail'
import PaymentScreen from '../screens/PaymentScreen'
import PaymentNotifyScreen from '../screens/PaymentNotifyScreen'
import CartScreen from '../screens/CartScreen'

const Stack = createStackNavigator()
const animated = new Animated.Value(0)
animated.addListener(() => {
    return
})
export default function MainNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="Welcome"
            >
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Root" component={TabNavigator} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={SignUpScreen} />
                <Stack.Screen name="UserInformationScreen" component={UserInformationScreen} />
                <Stack.Screen name="AddressScreen" component={AddresssScreen} />
                <Stack.Screen name="PaymentMethodScreen" component={PaymentMethodScreen} />
                <Stack.Screen name="CreditCardScreen" component={CreditCardScreen} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} />
                <Stack.Screen name="SearchScreen" component={SearchScreen} />
                <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
                <Stack.Screen name="PaymentNotifyScreen" component={PaymentNotifyScreen} />
                <Stack.Screen name="CartScreen" component={CartScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})
