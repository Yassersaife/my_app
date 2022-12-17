import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const SelectPaymentMethodScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`selectPaymentMethodScreen:${key}`)
    }

    const [state, setState] = useState({
        selectedPaymentIndex: 2,
        cardHolderName: 'Jemin patel',
        cardNumber: '1234 5678 9810 1123',
        expireDate: '02/05/2022',
        cvv: '3**',
    });

    const { selectedPaymentIndex, cardHolderName, cardNumber, expireDate, cvv } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: Sizes.fixPadding - 8.0 }}>
                    {methods()}
                    {cardHolderNameInfo()}
                    {cardNumberInfo()}
                    {dateAndCvvInfo()}
                </ScrollView>
            </View>
            {payNowButton()}
        </SafeAreaView>
    )

    function payNowButton() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor }}>
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => navigation.push('SuccessPayment')}
                    style={styles.buttonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor16Bold }}>
                        {tr('payNow')} ₹999
                    </Text>
                </TouchableOpacity>
            </View>

        )
    }

    function dateAndCvvInfo() {
        return (
            <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center', margin: Sizes.fixPadding * 2.0, }}>
                {expireDateInfo()}
                {cvvInfo()}
            </View>
        )
    }

    function cvvInfo() {
        return (
            <View style={{ flex: 1, marginLeft: isRtl ? 0.0 : Sizes.fixPadding - 3.0, marginRight: isRtl ? Sizes.fixPadding - 3.0 : 0.0 }}>
                <Text numberOfLines={1} style={{ ...Fonts.grayColor14Regular }}>
                    {tr('cvvTitle')}
                </Text>
                <TextInput
                    value={cvv}
                    onChangeText={text => updateState({ cvv: text })}
                    style={styles.textFieldStyle}
                    activeUnderlineColor={Colors.primaryColor}
                    underlineColor={Colors.grayColor}
                    keyboardType="numeric"
                />
            </View>
        )
    }

    function expireDateInfo() {
        return (
            <View style={{
                flex: 1,
                marginRight: isRtl ? 0.0 : Sizes.fixPadding - 3.0,
                marginLeft: isRtl ? Sizes.fixPadding - 3.0 : 0.0
            }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    {tr('dateFormate')}
                </Text>
                <TextInput
                    value={expireDate}
                    onChangeText={text => updateState({ expireDate: text })}
                    style={styles.textFieldStyle}
                    activeUnderlineColor={Colors.primaryColor}
                    underlineColor={Colors.grayColor}
                    keyboardType="numeric"
                />
            </View>
        )
    }

    function cardNumberInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    {tr('cardNumberTitle')}
                </Text>
                <TextInput
                    value={cardNumber}
                    onChangeText={text => updateState({ cardNumber: text })}
                    style={styles.textFieldStyle}
                    activeUnderlineColor={Colors.primaryColor}
                    underlineColor={Colors.grayColor}
                    keyboardType="numeric"
                />
            </View>
        )
    }

    function cardHolderNameInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    {tr('cardHolderNameTitle')}
                </Text>
                <TextInput
                    value={cardHolderName}
                    onChangeText={text => updateState({ cardHolderName: text })}
                    style={styles.textFieldStyle}
                    activeUnderlineColor={Colors.primaryColor}
                    underlineColor={Colors.grayColor}
                />
            </View>
        )
    }

    function methods() {
        return (
            <View style={styles.paymentMethodsWrapStyle}>
                <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                    {paymentMethodShort({ icon: require('../../assets/images/icons/card.png'), index: 1, })}
                    {paymentMethodShort({ icon: require('../../assets/images/icons/visa.png'), index: 2 })}
                    {paymentMethodShort({ icon: require('../../assets/images/icons/paytm.png'), index: 3 })}
                    {paymentMethodShort({ icon: require('../../assets/images/icons/paypal.png'), index: 4 })}
                </View>
            </View>
        )
    }

    function paymentMethodShort({ icon, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => { updateState({ selectedPaymentIndex: index }) }}
                style={{ flex: 1, alignItems: 'center' }}
            >
                <Image
                    source={icon}
                    style={{ height: 40.0, resizeMode: 'contain' }}
                />
                <View style={styles.paymentMethodDividerStyle} />
                <View style={{ ...styles.checkBoxStyle, borderColor: index == selectedPaymentIndex ? Colors.primaryColor : Colors.grayColor, }}>
                    {
                        index == selectedPaymentIndex
                            ?
                            <View style={styles.selectedCheckBoxStyle} />
                            :
                            null
                    }
                </View>
            </TouchableOpacity >
        )
    }

    function header() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
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

export default SelectPaymentMethodScreen

const styles = StyleSheet.create({
    checkBoxStyle: {
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    paymentMethodDividerStyle: {
        backgroundColor: Colors.lightGrayColor,
        height: 1.0,
        width: '100%',
        marginVertical: Sizes.fixPadding
    },
    selectedCheckBoxStyle: {
        width: 10.0,
        height: 10.0,
        borderRadius: 5.0,
        backgroundColor: Colors.primaryColor
    },
    paymentMethodsWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding - 5.0
    },
    textFieldStyle: {
        paddingHorizontal: 0,
        paddingBottom: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        ...Fonts.blackColor16Regular,
        height: 30.0,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        margin: Sizes.fixPadding * 2.0
    },
})