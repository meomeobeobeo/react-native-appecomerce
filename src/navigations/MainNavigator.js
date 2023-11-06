import { SafeAreaView, SafeAreaViewBase, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/HomeScreen'
import TabNavigator from './TabNavigator'
import Welcome from '../screens/Welcome'

const Stack = createStackNavigator()

export default function MainNavigator() {
    return (
       
            <NavigationContainer >
                <Stack.Navigator screenOptions={{ headerShown: false  }}  >

                    <Stack.Screen name='Welcome' component={Welcome} />
                    {/* <Stack.Screen name='Root' component={TabNavigator} /> */}

                </Stack.Navigator>
            </NavigationContainer>
        
    )
}

const styles = StyleSheet.create({})