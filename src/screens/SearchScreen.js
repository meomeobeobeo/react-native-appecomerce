import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../constants/theme'

export default function SearchScreen({ navigation }) {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor : colors.white
            }}
        >
            <Text>Search screen</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
