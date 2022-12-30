import { StyleSheet, Text, View,Image, SafeAreaView, TextInput, StatusBar, TouchableOpacity, Dimensions, ScrollView, } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const HelpScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`helpScreen:${key}`)
    }

    const [state, setState] = useState({
        name: '',
        email: '',
        message: '',
        showSubmitDialog: false,
    })

    const { name, email, message, showSubmitDialog } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {helpDescription()}
                    {userInfo()}
                </ScrollView>
            </View>
            {sendButton()}
            {submitDialog()}
        </SafeAreaView>
    )

    function submitDialog() {
        return (
            <Overlay
                isVisible={showSubmitDialog}
                overlayStyle={{ width: width - 40.0, borderRadius: Sizes.fixPadding - 2.0, padding: 0.0 }}
            >
                <View style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    <View style={styles.doneIconWrapStyle}>
                        <MaterialIcons name="done" size={width / 5.5} color={Colors.whiteColor} />
                    </View>
                    <Text style={{ textAlign: 'center', ...Fonts.blackColor22SemiBold }}>
                        {tr('submitted')}
                    </Text>
                    <Text style={styles.requestSubmittedTextStyle}>
                        {tr('submissionSuccess')}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.99}
                        onPress={() => {
                            updateState({ showSubmitDialog: false })
                            navigation.pop()
                        }}
                        style={{ ...styles.buttonStyle, marginHorizontal: Sizes.fixPadding }}
                    >
                        <Text style={{ ...Fonts.whiteColor16Bold }}>
                            {tr('ok')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
        )
    }

    function sendButton() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor }}>
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => updateState({ showSubmitDialog: true })}
                    style={styles.buttonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor16Bold }}>
                        {tr('send')}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function userInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 5.0 }}>
                {nameInfo()}
                {emailInfo()}
                {messageInfo()}
            </View>
        )
    }

    function messageInfo() {
        return (
            <TextInput
                placeholder={tr('enterMessage')}
                placeholderTextColor={Colors.DARK_FIVE}
                value={message}
                onChangeText={(text) => updateState({ message: text })}
                style={styles.textFieldStyle}
                selectionColor={Colors.blackColor}
                multiline
                numberOfLines={8}
            />
        )
    }

    function emailInfo() {
        return (
            <TextInput
                placeholder={tr('enterEmail')}
                placeholderTextColor={Colors.DARK_FIVE}
                value={email}
                onChangeText={(text) => updateState({ email: text })}
                style={styles.textFieldStyle}
                selectionColor={Colors.blackColor}
                keyboardType="email-address"
            />
        )
    }

    function nameInfo() {
        return (
            <TextInput
                placeholder={tr('enterName')}
                placeholderTextColor={Colors.DARK_FIVE}
                value={name}
                onChangeText={(text) => updateState({ name: text })}
                style={styles.textFieldStyle}
                selectionColor={Colors.blackColor}
            />
        )
    }

    function helpDescription() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, alignItems: 'center' }}>
            <Image
                    source={require('../../assets/images/settingIcons/chat.png')}
                    style={{ width: 420.0, height: 300.0 ,right:40}}
                />  
                <Text style={{ ...Fonts.blackColor22SemiBold }}>
                    {tr('contact')}
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding - 7.0, textAlign: 'center', ...Fonts.grayColor14Medium }}>
                    {tr('helpDescription')}
                </Text>
            </View>
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

export default HelpScreen;

const styles = StyleSheet.create({
    textFieldStyle1: {
        ...Fonts.blackColor14Medium,
        elevation: 1.3,
        borderRadius: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        margin: Sizes.fixPadding * 2.0
    },
    textFieldStyle: {
        borderColor: Colors.grayColor,
        borderBottomWidth:1,
        ...Fonts.blackColor14Medium,
        elevation: 1.3,
        borderRadius: Sizes.fixPadding + 2.0,
        borderColor:Colors.primaryColor,
        paddingHorizontal: Sizes.fixPadding*2,
        marginVertical:Sizes.fixPadding*2,
        paddingVertical:Sizes.fixPadding,
    },
   
    bottomSheetStyle: {
        width: '100%',
        position: 'absolute',
        bottom: 0.0,
        borderTopLeftRadius: Sizes.fixPadding - 2.0,
        borderTopRightRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    doneIconWrapStyle: {
        width: width / 3.5, height: width / 3.5,
        borderRadius: (width / 3.5) / 2.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -Sizes.fixPadding * 5.0,
        alignSelf: 'center',
        marginBottom: Sizes.fixPadding * 2.0
    },
    requestSubmittedTextStyle: {
        marginBottom: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.0,
        textAlign: 'center',
        ...Fonts.grayColor16SemiBold
    }
})