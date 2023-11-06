import { StatusBar } from 'expo-status-bar';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MainNavigator from './src/navigations/MainNavigator';
import Welcome from './src/screens/Welcome';
import LoginScreen from './src/screens/LoginScreen';

const windownWidth = Dimensions.get('window').width;
const windownHeight = Dimensions.get('window').height;


export default function App() {


  return (

    
     
        // <MainNavigator />
        <LoginScreen/>
        
      
    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
