import { ImageBackground, StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, TextInput, KeyboardAvoidingView, KeyboardAvoidingViewComponent, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, sizes } from '../constants/theme'
import ButtonCustom from '../components/ButtonCustom'
import icons from '../constants/icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icons from '../components/Icons'
import { useFocusEffect } from '@react-navigation/native'
import { useTranslation } from "react-i18next";
import {i18next} from '../in18/in18';


const widthBox = (sizes.width) * (4 / 9)
const heightBox = (sizes.width) * (4 / 9)
export default function LoginScreen({navigation}) {

    const animatedValue = new Animated.Value(0);
    const [isVisiblePassWord, setIsVisiblePassword] = useState(false)
    const {t} = useTranslation();
    
    useEffect(()=>{
        navigation.addListener('focus',async ()=>{
            console.log('login')
        })
    },[])
    useFocusEffect(
        React.useCallback(() => {
          console.log('focus login')
          console.log(navigation)

          return ()=>{console.log('unfocus login')}
        }, [navigation])
      );


    const visiblePassWord = () => {
        setIsVisiblePassword(!isVisiblePassWord)
    }


    return (

        <ScrollView contentContainerStyle={{ flex: 1, backgroundColor : colors.white }} keyboardShouldPersistTaps="handled" >

            <KeyboardAwareScrollView style={{ flex: 1 , marginBottom: 20 }} >
                <View style={styles.slider}>
                    <View style={{ backgroundColor: colors.lightPurple, position: 'absolute', width: widthBox, height: heightBox, right: 0, borderBottomLeftRadius: widthBox }}></View>
                    <View style = {{width : '100%' , justifyContent: 'center' , alignItems : 'center'}}>
                        <View style={{ width: widthBox, height: heightBox, marginTop: widthBox, justifyContent: 'center' }}>
                            <ImageBackground
                                source={icons.Logo}
                                resizeMode="cover"
                                style={styles.image} />
                        </View>
                    </View>
                    <View style={styles.inputArea}>

                        <TextInput
                            style={styles.input}
                            onChangeText={() => { }}
                            autoCompleteType="email"
                            placeholder= {t('email-placeholder')}
                            keyboardType="email-address"
                        />

                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput

                                style={styles.input}
                                onChangeText={() => { }}
                                secureTextEntry={isVisiblePassWord}
                                placeholder= {t('password-placeholder')}
                                keyboardType="default"
                            />
                            {isVisiblePassWord ?
                                <Icons onPress={visiblePassWord} style={{ position: 'absolute', right: (sizes.width) / 10 + 12 }} size={18} icon={'VisibleLogo'} />
                                : <Icons onPress={visiblePassWord} style={{ position: 'absolute', right: (sizes.width) / 10 + 12 }} size={18} icon={'HideLogo'} />}
                        </View>



                        <View style = {styles.suggest}><Text style = {{flex:1 , textAlign : 'left'}}>{t('suggest-register')} <Text style = {{color : colors.red}} onPress={()=>{navigation.navigate('Register')}} >{t('register')}</Text> </Text></View>
                    </View>

                </View>
                <View style={styles.control}  >

                    <ButtonCustom
                        onPress={() => { }}
                        style={{ backgroundColor: colors.lightPurple, width: '80%', borderRadius: 12, borderWidth: 0 }}
                        buttonTextStyle={{ color: colors.white }}
                        buttonText='Sign in'

                    />
                    <Text style={{ fontSize: 18, fontWeight: '600', marginVertical: 8 }} >OR</Text>
                    <ButtonCustom
                        onPress={() => { }}
                        style={{ backgroundColor: colors.white, width: '80%', borderRadius: 12, borderWidth: 2, borderColor: colors.lightPurple }}
                        buttonTextStyle={{ color: colors.gray }}
                        buttonText= {t('continute-with-facebook')}
                        iconName={'FaceBookLogo'}
                    />
                    <ButtonCustom
                        onPress={() => { }}
                        style={{ backgroundColor: colors.white, width: '80%', borderRadius: 12, borderWidth: 2, borderColor: colors.lightPurple }}
                        buttonTextStyle={{ color: colors.gray }}
                        buttonText= {t('continute-with-google')}
                        iconName={'GoogleLogo'}
                    />
                    <ButtonCustom
                        onPress={() => { }}
                        style={{ backgroundColor: colors.white, width: '80%', borderRadius: 12, borderWidth: 2, borderColor: colors.lightPurple }}
                        buttonTextStyle={{ color: colors.gray }}
                        buttonText = {t('continute-with-apple')}
                        iconName={'AppleLogo'}
                    />
                </View>
            </KeyboardAwareScrollView>

        </ScrollView>

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
        flex: 5,
        marginBottom: 40,



    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        width: '80%',
        backgroundColor: '#f6f6f6',
        borderRadius: 8,
        borderWidth: 0,

    },
    inputArea: {

        flex: 4,
        alignItems: 'center',
        gap: 12,


    },
    suggest : {
        marginTop:12,
        display:'flex',
        flexDirection:'row',
        width : '80%',
        marginLeft:12
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    control: {
        backgroundColor: colors.white,
        flex: 5,
        alignItems: 'center',
        gap: 8,


    }
})