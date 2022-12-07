import { StyleSheet, Text,Image ,View, SafeAreaView, StatusBar, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const NewPasswordScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`newPasswordScreen:${key}`)
    }

    const [state, setState] = useState({
        password: '',
        showPassword: false,
        confirmPassword: '',
        showConfirmPassword: false,
    })

    const { password, showPassword, confirmPassword, showConfirmPassword } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {backArrow()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {header()}
                    {passwordTextField()}
                    {confirmPasswordTextField()}
                    {submitButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => navigation.push('Signin')}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    {tr('submit')}
                </Text>
            </TouchableOpacity>
        )
    }

    function confirmPasswordTextField() {
        return (
            <View style={{ ...styles.textFieldWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                <TextInput
                    value={confirmPassword}
                    onChangeText={(text) => updateState({ confirmPassword: text })}
                    placeholder={tr('confirmPwd')}
                    style={{ ...Fonts.blackColor14Regular, flex: 1, marginLeft: isRtl ? Sizes.fixPadding : 0.0 }}
                    selectionColor={Colors.primaryColor}
                    placeholderTextColor={'#8D8D8D'}
                    secureTextEntry={!showConfirmPassword}
                />
                <MaterialCommunityIcons
                    name={showConfirmPassword ? "eye" : "eye-off"}
                    size={18}
                    color={Colors.grayColor}
                    onPress={() => updateState({ showConfirmPassword: !showConfirmPassword })}
                />
            </View>
        )
    }

    function passwordTextField() {
        return (
            <View style={{ ...styles.textFieldWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                <TextInput
                    value={password}
                    onChangeText={(text) => updateState({ password: text })}
                    placeholder={tr('newPwd')}
                    style={{ ...Fonts.blackColor14Regular, flex: 1, marginLeft: isRtl ? Sizes.fixPadding : 0.0 }}
                    selectionColor={Colors.primaryColor}
                    placeholderTextColor={'#8D8D8D'}
                    secureTextEntry={!showPassword}
                />
                <MaterialCommunityIcons
                    name={showPassword ? "eye" : "eye-off"}
                    size={18}
                    color={Colors.grayColor}
                    onPress={() => updateState({ showPassword: !showPassword })}
                />
            </View>
        )
    }

    function header() {
        return (
            <View style={{alignSelf: 'center'}}>
                <Image
                    source={require('../../assets/images/victore/reset.png')}
                    style={{ width: 300.0, height: 300.0 }}
                />    
            <Text style={{ textAlign: 'center', ...Fonts.blackColor24SemiBold, marginBottom: Sizes.fixPadding * 5.0 }}>
                {tr('header')}
            </Text>
            </View>
        )
    }

    function backArrow() {
        return (
            <MaterialIcons
                name={isRtl ? "arrow-forward" : "arrow-back"}
                size={24}
                color={Colors.blackColor}
                onPress={() => navigation.pop()}
                style={{ margin: Sizes.fixPadding * 2.0, alignSelf: isRtl ? 'flex-end' : 'flex-start' }}
            />
        )
    }
}

export default NewPasswordScreen;

const styles = StyleSheet.create({
    textFieldWrapStyle: {
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 2.0,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 4.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
})