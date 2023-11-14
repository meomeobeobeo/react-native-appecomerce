import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/theme'
import icons from '../constants/icons'
import Button from '../components/ButtonCustom'
import ButtonCustom from '../components/ButtonCustom'
export default function Welcome({navigation}) {
    return (
        <SafeAreaView style={styles.body} >
            <View style={styles.slider}>
                <View style={{ width: '100%', flex: 2 }}>
                    <ImageBackground
                        source={icons.Logo}
                        resizeMode="cover"
                        style={styles.image} />
                </View>
                <View style = {{width : '100%' , flex : 1 , justifyContent: 'center' , alignItems : 'center'}}>
                    <Text style = {{fontSize : 28}}>
                        Welcome to MeoEco
                    </Text>
                    <Text style = {{fontSize : 20}}>
                        Hope you happy and happy
                    </Text>
                </View>

            </View>
            <View style={styles.control}  >
               
                <ButtonCustom onPress={()=>{navigation.navigate('Login')}} buttonText='Log in'/>
                <ButtonCustom
                    onPress={()=>{
                        navigation.removeListener()
                        navigation.navigate('Register')
                    
                    }} 
                    style={{backgroundColor: 'rgba(17, 17, 17, 0.0)' , width : '80%', borderRadius : 12 , borderWidth : 1}} 
                    buttonTextStyle={{color :  colors.black}}
                    buttonText='Sign up'
                    />
                <ButtonCustom 
                    onPress={()=>{navigation.navigate('Root')}}
                    style={{backgroundColor: 'rgba(17, 17, 17, 0.0)' , width : '80%', borderRadius : 12 , borderWidth : 0}} 
                    buttonTextStyle={{color :  '#40403d'}}
                    buttonText='Skip for now'
                    />

                
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white
    },
    slider: {
        backgroundColor: colors.white,
        flex: 7,

    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    control: {
        backgroundColor: colors.white,
        flex: 3,
        alignItems : 'center',
        gap : 8
        
    }


})