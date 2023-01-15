import { SafeAreaView, Text, View, StatusBar, Image, Dimensions } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../constants/styles'

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {

    setTimeout(() => {
        navigation.push('Onboarding')
    }, 2000);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FEFF' }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {appIcon()}
                {appName()}
            </View>
        </SafeAreaView>
    )

    function appName() {
        return (
            <Text style={{ ...Fonts.primaryColor48SemiBold }}>
                Sporter App
            </Text>
        )
    }

    function appIcon() {
        return (
            <Image
                source={require('../assets/images/icons/App.png')}
                style={{ width: 200 , height: 200 , resizeMode: 'contain' }}
            />
        )
    }
}

export default SplashScreen;
