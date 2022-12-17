import { StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, Image, Dimensions, } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const SubscriptionDetailScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`subscriptionDetailScreen:${key}`)
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
                {validityInfo()}
                {includesInfo()}
                {requirements()}
                {proceedButton()}
            </View>
        )
    }

    function proceedButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => navigation.push('ChooseTime')}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    {tr('proceed')}
                </Text>
            </TouchableOpacity>
        )
    }

    function requirements() {
        return (
            <View>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    {tr('requirement')}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                    {equipmentInfo()}
                    {spaceInfo()}
                </View>
            </View>
        )
    }

    function spaceInfo() {
        return (
            <View style={{
                ...styles.requirementWrapStyle,
                flexDirection: isRtl ? 'row-reverse' : 'row',
                marginLeft: isRtl ? Sizes.fixPadding : 0.0,
                marginRight: isRtl ? 0.0 : Sizes.fixPadding
            }}>
                <View style={{ ...styles.requirementIconWrapStyle, }}>
                    <Image
                        source={require('../../assets/images/icons/space.png')}
                        style={{ width: 24.0, height: 24.0, resizeMode: 'contain' }}
                    />
                </View>
                <View style={{
                    flex: 1,
                    marginRight: isRtl ? 0.0 : Sizes.fixPadding + 2.0,
                    marginLeft: isRtl ? Sizes.fixPadding + 2.0 : 0.0
                }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
                        {tr('space')}
                    </Text>
                    <Text numberOfLines={3} style={{ ...Fonts.blackColor14Regular }}>
                        3’ * 6’ Open space
                    </Text>
                </View>
            </View>
        )
    }

    function equipmentInfo() {
        return (
            <View style={{
                ...styles.requirementWrapStyle,
                flexDirection: isRtl ? 'row-reverse' : 'row',
                marginRight: isRtl ? 0.0 : Sizes.fixPadding,
                marginLeft: isRtl ? Sizes.fixPadding : 0.0,
            }}>
                <View style={{ ...styles.requirementIconWrapStyle, }}>
                    <MaterialIcons name="fitness-center" size={24} color={Colors.grayColor} />
                </View>
                <View style={{
                    flex: 1,
                    marginLeft: isRtl ? 0.0 : Sizes.fixPadding + 2.0,
                    marginRight: isRtl ? Sizes.fixPadding + 2.0 : 0.0
                }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
                        {tr('equipment')}
                    </Text>
                    <Text numberOfLines={3} style={{ ...Fonts.blackColor14Regular }}>
                        Mat,chair,skiiping rope
                    </Text>
                </View>
            </View>
        )
    }

    function includesInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, }}>
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
                    <Text style={{ ...Fonts.blackColor14Regular, marginRight: Sizes.fixPadding }}>
                        •
                    </Text>
                    <Text style={{ flex: 1, ...Fonts.blackColor14Regular }}>
                        First <Text style={{ ...Fonts.primaryColor14SemiBold }}>3 days free</Text> then subscription.
                    </Text>
                </View>
                <View style={{ marginVertical: Sizes.fixPadding - 5.0, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                    <Text style={{ ...Fonts.blackColor14Regular, marginRight: Sizes.fixPadding }}>
                        •
                    </Text>
                    <Text style={{ flex: 1, ...Fonts.blackColor14Regular }}>
                        Anytime cancel, no auto renewable
                    </Text>
                </View>
                <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                    <Text style={{ ...Fonts.blackColor14Regular, marginRight: Sizes.fixPadding }}>
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
                {subscriptionTypeShort({ type: tr('monthly'), amount: 999, index: 1 })}
                {subscriptionTypeShort({ type: tr('quarterly'), amount: 5999, index: 2 })}
                {subscriptionTypeShort({ type: tr('annual'), amount: 11999, index: 3 })}
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
                    backgroundColor: index == subscriptionTypeIndex ? Colors.primaryColor : Colors.lightGrayColor,
                    marginHorizontal: index == 2 ? Sizes.fixPadding + 5.0 : 0.0
                }}
            >
                <Text numberOfLines={1} style={index == subscriptionTypeIndex ? { ...Fonts.whiteColor16Regular } : { ...Fonts.blackColor16Regular }}>
                    {type}
                </Text>
                <Text style={index == subscriptionTypeIndex ? { ...Fonts.whiteColor16SemiBold } : { ...Fonts.blackColor16SemiBold }} >
                    ₹ {amount}
                </Text>
            </TouchableOpacity >
        )
    }

    function logoAndTitle() {
        return (
            <View style={{ alignItems: 'center' }}>
                <ImageA
                    source={require('../../assets/images/icons/APP.png')}
                    style={{ width: width , height: width , resizeMode: 'stretch' }}
                />
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.primaryColor24SemiBold }}>
                    Gym Life 
                </Text>
            </View>
        )
    }

    function header() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                <MaterialIcons
                    name={isRtl ? 'arrow-forward' : "arrow-back"}
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

export default SubscriptionDetailScreen

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
    requirementWrapStyle: {
        flex: 1,
        alignItems: 'center',
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
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 2.0,
        padding: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    }
})