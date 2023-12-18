import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
export default function CategoryScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>CategoryScreen</Text>
            <SkeletonPlaceholder borderRadius={4}>
                <SkeletonPlaceholder.Item
                    flexDirection="row"
                    alignItems="center"
                >
                    <SkeletonPlaceholder.Item
                        width={60}
                        height={60}
                        borderRadius={50}
                    />
                    <SkeletonPlaceholder.Item marginLeft={20}>
                        <SkeletonPlaceholder.Item width={120} height={20} />
                        <SkeletonPlaceholder.Item
                            marginTop={6}
                            width={80}
                            height={20}
                        />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
           
        </View>
    )
}

const styles = StyleSheet.create({})
