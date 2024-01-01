import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import ButtonCustom from '../components/ButtonCustom'
import { createHash, generatePairKey, signData, verifySignature } from '../helper/pki'

export default function CategoryScreen() {

    const handleClick = async ()=>{
        console.log('click')
        const keypair = await generatePairKey()

        const privateKey = keypair.privateKey
        const publicKey = keypair.publicKey

        // const signature= signData('hihihehe', privateKey)
        // const verifyData = verifySignature('hihihehe',signature,publicKey)
         // console.log('signData::::::' + signData)
        // console.log(verifyData)
        console.log(keypair)
        const hash = await createHash('hello')
        console.log(hash)

       
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>CategoryScreen</Text>
            <SkeletonPlaceholder borderRadius={4}>
                <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                    <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
                    <SkeletonPlaceholder.Item marginLeft={20}>
                        <SkeletonPlaceholder.Item width={120} height={20} />
                        <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
                    </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
            <ButtonCustom onPress={handleClick} buttonText='CLick me' />
        </View>
    )
}

const styles = StyleSheet.create({})
