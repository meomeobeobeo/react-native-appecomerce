import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function HomeScreen({navigation}) {
    return (

        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text>Home Screen</Text>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({})