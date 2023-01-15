import { StyleSheet, Text, View, SafeAreaView, StatusBar, BackHandler, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useCallback } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');


const SuccessPaymentScreen = ({ navigation,route }) => {

const timeElapsed = Date.now();
const today = new Date(timeElapsed);
    const name = route.params.name;

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`successPaymentScreen:${key}`)
    }

    const backAction = () => {
        navigation.push('BottomTabs');
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                {welcomeText()}
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: Sizes.fixPadding, justifyContent: 'center' }}>
                    {paymentInfo()}
                </ScrollView>
                {backToHameButton()}
            </View >
        </SafeAreaView >
    )

    function backToHameButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => navigation.push('BottomTabs')}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    {tr('backToHome')}
                </Text>
            </TouchableOpacity>
        )
    }

    function paymentInfo() {
        return (
            <View style={{ alignItems: 'center',top:10, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Image
                    source={require('../../assets/images/icons/success.png')}
                    style={{ width: width/1.2 , height: width/1.2 , resizeMode: 'contain' }}
                />
                <Text style={{ marginVertical: Sizes.fixPadding/5, ...Fonts.blackColor20SemiBold }}>
                    {tr('confirmation')}
                </Text>
                <Text style={{ textAlign: 'center', ...Fonts.primaryColor14SemiBold }}>
                    {tr('confirmationDetail')}
                </Text>
                {scheduleAndSubscriptionInfo()}
            </View>
        )
    }

    function scheduleAndSubscriptionInfo() {
        return (
            <View style={{
                ...styles.scheduleAndSubscriptionInfoWrapStyle,
                borderLeftWidth: isRtl ? 1.0 : 0.0,
                borderRightWidth: isRtl ? 0.0 : 1.0,
                flexDirection: isRtl ? 'row-reverse' : 'row',
            }}>
                <View style={styles.scheduleAndSubscriptionDividerStyle} />
                <View style={{ flex: 1, margin: Sizes.fixPadding, }}>
                    <Text style={{ ...Fonts.primaryColor18SemiBold }}>
                        Train with {name}
                    </Text>
                    {dateAndTimeInfo()}
                    {subscriptionInfo()}
                </View>
            </View>
        )
    }

    function subscriptionInfo() {
        return (
            <View>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    {tr('subscription')}
                </Text>
                <Text style={{ ...Fonts.primaryColor14SemiBold }}>
                    24session
                </Text>
            </View>
        )
    }
  

    function dateAndTimeInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding + 5.0 }}>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    {tr('dateAndTimeTitle')}
                </Text>
                <Text style={{ ...Fonts.primaryColor14SemiBold }}>
                {today.toDateString()}
                </Text>
            </View>
        )
    }

    function welcomeText() {
        return (
            <Text style={{ textAlign: 'center', padding: Sizes.fixPadding *2, ...Fonts.blackColor16SemiBold }}>
                {tr('welcomeText')}
            </Text>
        )
    }
}

export default SuccessPaymentScreen;

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        margin: Sizes.fixPadding * 2.0
    },
    scheduleAndSubscriptionInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 0.50,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        marginTop: Sizes.fixPadding * 2.0,
    },
    scheduleAndSubscriptionDividerStyle: {
        top: -1.0,
        backgroundColor: Colors.primaryColor,
        width: 10.0,
        height: '102%'
    }
})