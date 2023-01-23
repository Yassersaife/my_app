import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, BackHandler, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useContext,useState, useCallback } from 'react'
import { Colors, Fonts, Sizes,images,size } from '../../constants/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Stack, ActivityIndicator } from "@react-native-material/core";
import { Overlay } from 'react-native-elements';

import * as Network from 'expo-network';


import SvgIcon from '../../assets/images/victore/Trainer-amico.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { AuthContext } from '../../constants/AuthContext';
const SigninScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';
 
    function tr(key) {
        return t(`signinScreen:${key}`)
    }
    const {setemail,localhost} = useContext(AuthContext);

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
              
              
             
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0)
        }, 2000)
    }

    const [backClickCount, setBackClickCount] = useState(0);
const [message,setMessage] =useState('');
const [messageType,setMessageType] =useState('');
const [isloagding,setisLoading]=useState(false);

   const [state, setState] = useState({
        email: '',
        password: '',
        showPassword: false,
    })

    const { email, password, showPassword } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    const [isLoading, setIsLoading] = useState(false);


    const handleLogin = () =>{
        handleMessage(null);
        setIsLoading(true)

           fetch(`http://${localhost}:8082/login/`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password:password})
          })
          .then(res => {
             
              return res.json();}
          )
          .then(
            (result) => {
                if(result.msg =="Failed"){
                setIsLoading(false);

                    handleMessage("Sorry, your password was incorrect. Please try again"); }
                else if(result.msg=="Success 'Player' "){
                setemail(email);
                    setTimeout(() => {

                        navigation.push('BottomTabs')
                        setIsLoading(false)

                    }, 800);
    
              ;}
                else{
                setemail(email);
                    setTimeout(() => {
                        navigation.push('BottomTabs2')
                        setisLoading(false);

                    }, 800);
    
              }

              setIsLoading(false)

              console.log(result);
            },
            (error) => {
              console.log(error);
              setisLoading(false);
              handleMessage("An error occurdded.Check your network and try again");

            }
          )
        };



    const handleMessage =(message,type='FAILED')=>{
        setMessage(message);
        setMessageType(type);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {emailIdTextField()}
                    {passwordTextField()}
                    {forgotPasswordText()}
                    {Messageinfo()}
                    {signinButton()}
                    {connectWithInfo()}
                </ScrollView>
            </View>
            {dontAccountInfo()}
            {exitInfo()}
            {loadingDialog()}
        </SafeAreaView>
    )

    function exitInfo() {
        return (
            backClickCount == 1
                ?
                <View style={[styles.animatedView]}>
                    <Text style={{ ...Fonts.whiteColor14Medium }}>
                        {tr('exitText')}
                    </Text>
                </View>
                :
                null
        )
    }
    function loadingDialog() {
        return (
            <Overlay
                isVisible={isLoading}
                overlayStyle={{ width: '80%',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 3.5,
        paddingTop: Sizes.fixPadding * 3.0,
        elevation: 3.0,}}
            >
                <ActivityIndicator size={40} color={Colors.primaryColor} style={{ alignSelf: 'center' }} />
                <Text style={{ marginTop: Sizes.fixPadding, textAlign: 'center', ...Fonts.blackColor16Bold }}>
                    Please wait...
                </Text>
            </Overlay>
        )
    }

    function dontAccountInfo() {
        return (
            <Text style={styles.dontAccountTextStyle}>
                {tr('dontAccount')} { }
                <Text onPress={() => navigation.push('Selection')} style={{ ...Fonts.blackColor16Bold}}>
                    {tr('signup')}
                </Text>
            </Text>
        )
    }

    function connectWithInfo() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={{ ...Fonts.blackColor14Medium }}>
                    {tr('connect')}
                </Text>
                <View style={{ margin: Sizes.fixPadding * 1.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    {socialMediaOptionShort({ bgColor: Colors.primary4, icon: images.FACEBOOK })}
                    {socialMediaOptionShort({ bgColor: Colors.primary4, icon: images.GOOGLE })}

                </View>
            </View>
        )
    }

    function socialMediaOptionShort({ bgColor, icon }) {
        return (
            <View style={{
                ...styles.socialMediaIconWrapStyle,
                backgroundColor: bgColor,
            }}>
                <Image
                    source={icon}
                    style={{ width: 40, height: 40, resizeMode: 'contain' }}
                />
            </View>
        )
    }
    function Messageinfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                style={{
                margin:Sizes.fixPadding}}
            >
                <Text style={{ ...Fonts.grayColor14SemiBold,alignItems:'center' }}>
                    {message}
                </Text>
            </TouchableOpacity>
        )
    }

    function signinButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => {handleLogin()}}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    {tr('signin')}
                </Text>
            </TouchableOpacity>
        )
    }

    function forgotPasswordText() {
        return (
            <Text
                onPress={() => navigation.push('ForgotPassword')}
                style={{
                    textAlign: isRtl ? 'left' : 'right',
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    ...Fonts.blackColor16Bold
                }}
            >
                {tr('forgetPwd')}
            </Text>
        )
    }

    function passwordTextField() {
        return (
            <View style={{
                ...styles.textFieldWrapStyle,
                ...styles.passwordFieldStyle,
                flexDirection: isRtl ? 'row-reverse' : 'row'
            }}>
                <TextInput
                    value={password}
                    onChangeText={(text) => updateState({ password: text })}
                    placeholder={tr('password')}
                    style={{ ...Fonts.blackColor14Regular, flex: 1, marginLeft: isRtl ? Sizes.fixPadding : 0.0, }}
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

    function emailIdTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                
                    value={email}
                    onChangeText={(text) => updateState({ email: text })}
                    placeholder={tr('email')}
                    style={{ ...Fonts.blackColor14Regular }}
                    selectionColor={Colors.primaryColor}
                    keyboardType="email-address"
                    placeholderTextColor={'#8D8D8D'}
                />
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.loginIcon}>
                <Image
                    source={SvgIcon}
                    style={{ width: 300.0, height: 300.0 }}
                />            
                <Text style={styles.headerWrapStyle}>
                {tr('header')}
                </Text>
                </View>
              
        )
    }
}

export default SigninScreen;

const styles = StyleSheet.create({
    loginIcon: {
        alignSelf: 'center',
      },
    headerWrapStyle: {
        marginBottom: Sizes.fixPadding * 3.0,
        marginTop: Sizes.fixPadding * 6.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        textAlign: 'center',
        ...Fonts.blackColor24SemiBold
    },
    textFieldWrapStyle: {
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 2.0,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 3.5,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    passwordFieldStyle: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Sizes.fixPadding - 5.0,
    },
    socialMediaIconWrapStyle: {
        width: 60.0,
        height: 45.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding - 5.0,
        elevation: 3.0,
    },
    dontAccountTextStyle: {
        textAlign: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
        ...Fonts.grayColor16Regular
    },
    animatedView: {
        backgroundColor: Colors.lightBlackColor,
        position: "absolute",
        bottom: 40,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
})