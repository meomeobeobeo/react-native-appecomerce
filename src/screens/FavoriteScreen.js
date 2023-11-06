import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function FavoriteScreen() {
  return (
    <SafeAreaView style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Text>Favorite Screen</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})