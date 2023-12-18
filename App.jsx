import { StatusBar } from 'expo-status-bar'
import {
    Dimensions,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import MainNavigator from './src/navigations/MainNavigator'
import Welcome from './src/screens/Welcome'
import LoginScreen from './src/screens/LoginScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { useTranslation } from 'react-i18next'

import store from './src/redux/store'
import LoadingScreen from './src/screens/LoadingScreen'
import OpenScreen from './src/screens/OpenScreen'
import { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'


export default function App() {
    const { t } = useTranslation()
    useEffect(() => {
        if (Platform.OS === 'android') SplashScreen.hide()
    }, [])

    return (
        <Provider store={store}>
            <MainNavigator />
            {/* <LoadingScreen /> */}
        </Provider>
        // <View style={{flex:1}}>
        //   <LoginScreen/>
        // </View>
        // <SignUpScreen/>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
