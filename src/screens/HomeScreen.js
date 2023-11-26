import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function HomeScreen({ navigation }) {

    useFocusEffect(
        React.useCallback(() => {
            async function fetchData() {
                // You can await here
                
                const userData = await AsyncStorage.getItem('userInfor')
                console.log(userData)
                // ...
            }

           fetchData()


            return () => {
                console.log('unfocus root')
            }
        }, [navigation]),
    )


    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text>Home Screen</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
