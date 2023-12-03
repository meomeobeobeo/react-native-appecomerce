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
import UserInformationScreen from '../screens/UserInformationScreen'
import AddresssScreen from '../screens/AddresssScreen'
import PaymentMethodScreen from '../screens/PaymentMethodScreen'
import CreditCardScreen from '../screens/CreditCardScreen'

const Stack = createStackNavigator()
const animated = new Animated.Value(0)
animated.addListener(() => {
    return
})
export default function MainNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="CreditCardScreen"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Root" component={TabNavigator} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={SignUpScreen} />
                <Stack.Screen name="UserInformationScreen" component={UserInformationScreen} />
                <Stack.Screen name="AddressScreen" component={AddresssScreen} />
                <Stack.Screen name="PaymentMethodScreen" component={PaymentMethodScreen} />
                <Stack.Screen name="CreditCardScreen" component={CreditCardScreen} />





            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})
