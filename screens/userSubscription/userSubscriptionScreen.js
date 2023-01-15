import { StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, Image, Dimensions, } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
const { width,height } = Dimensions.get('window');

const UserSubscriptionScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`userSubscriptionScreen:${key}`)
    }

    const [subscriptionTypeIndex, setSubscriptionTypeIndex] = useState(1);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingBottom: Sizes.fixPadding * 2.0 }}
                >
                    {detail()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function detail() {
        return (
            <View style={styles.detailWrapStyle}>
                {logoAndTitle()}
                {subscriptionTypes()}
                {includesInfo()}
                {proceedButton()}
            </View>
        )
    }

    function proceedButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => navigation.push(('SuccessPayment'),{name:" Sporter App"})}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    {tr('proceed')}
                </Text>
            </TouchableOpacity>
        )
    }

    function includesInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    {tr('includes')}
                </Text>
                {includedRules()}
            </View>
        )
    }

    function includedRules() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, }}>
                <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                    <Text style={{
                        ...Fonts.blackColor14Regular, marginRight: isRtl ? 0.0 : Sizes.fixPadding,
                        marginLeft: isRtl ? Sizes.fixPadding : 0.0
                    }}>
                        •
                    </Text>
                    <Text style={{ flex: 1, ...Fonts.blackColor14Regular }}>
                        First <Text style={{ ...Fonts.primaryColor14SemiBold }}>3 days free</Text> then subscription.
                    </Text>
                </View>
                <View style={{ marginVertical: Sizes.fixPadding - 5.0, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                    <Text style={{ ...Fonts.blackColor14Regular, marginRight: isRtl ? 0.0 : Sizes.fixPadding, marginLeft: isRtl ? Sizes.fixPadding : 0.0 }}>
                        •
                    </Text>
                    <Text style={{ flex: 1, ...Fonts.blackColor14Regular }}>
                        Anytime cancel, no auto renewable
                    </Text>
                </View>
                <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                    <Text style={{ ...Fonts.blackColor14Regular, marginRight: isRtl ? 0.0 : Sizes.fixPadding, marginLeft: isRtl ? Sizes.fixPadding : 0.0 }}>
                        •
                    </Text>
                    <Text style={{ flex: 1, ...Fonts.blackColor14Regular }}>
                        Free call and chat
                    </Text>
                </View>
            </View>
        )
    }

    function validityInfo() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    24 Session
                </Text>
                <Text style={{ ...Fonts.grayColor14SemiBold }}>
                    valid for 30 day
                </Text>
            </View>
        )
    }

    function subscriptionTypes() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                {subscriptionTypeShort({ type: tr('monthly'), amount: 100, index: 1 })}
                {subscriptionTypeShort({ type: tr('annual'), amount: 1000, index: 2})}
            </View>
        )
    }

    function subscriptionTypeShort({ type, amount, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => setSubscriptionTypeIndex(index)}
                style={{
                    ...styles.subscriptionTypesWrapStyle,
                    backgroundColor: index == subscriptionTypeIndex ? Colors.primaryColor : Colors.primary4,
                    marginHorizontal: index == 2 ? Sizes.fixPadding + 5.0 : 0.0
                }}
            >
             <MaterialIcons name="fitness-center" size={24} color={index == subscriptionTypeIndex ? Colors.whiteColor: Colors.blackColor}/>
                <Text numberOfLines={1} style={index == subscriptionTypeIndex ? { ...Fonts.whiteColor16Regular } : { ...Fonts.blackColor16Regular }}>
                    {type}
                </Text>
                <Text style={index == subscriptionTypeIndex ? { ...Fonts.whiteColor16SemiBold } : { ...Fonts.blackColor16SemiBold }} >
                    $ {amount}
                </Text>
            </TouchableOpacity >
        )
    }

    function logoAndTitle() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={require('../../assets/images/icon.png')}
                    style={{ width: width / 6.0, height: width / 6.0, resizeMode: 'stretch' }}
                />
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.primaryColor24SemiBold }}>
                   Sporter App
                </Text>
            </View>
        )
    }

    function header() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? "row-reverse" : 'row', alignItems: 'center' }}>
                <MaterialIcons
                    name={isRtl ? "arrow-forward" : "arrow-back"}
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.blackColor18SemiBold }}>
                    {tr('header')}
                </Text>
            </View>
        )
    }
}

export default UserSubscriptionScreen

const styles = StyleSheet.create({
    subscriptionTypesWrapStyle: {
        flex: 1,
        paddingHorizontal: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 2.0,
    },
    requirementIconWrapStyle: {
        width: width / 8.0,
        height: width / 8.0,
        borderRadius: ((width / 8.0) / 2.0),
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginTop: Sizes.fixPadding * 3.0
    },
    detailWrapStyle: {
        borderColor: Colors.primaryColor,
        backgroundColor:Colors.whiteColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 2.0,
        padding: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    }
})