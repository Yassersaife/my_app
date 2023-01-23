import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useContext,useState } from 'react'
import { Colors, Fonts, Sizes,images } from '../../constants/styles';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import SvgIcon from '../../assets/images/victore/Pilates-amico.png';
import { color } from 'react-native-reanimated';
import { colors } from 'react-native-elements';
import { AuthContext } from '../../constants/AuthContext';
import RNPickerSelect from "react-native-picker-select";



const SignupScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`signupScreen:${key}`)
    }
    const {Sigup1,setlogin} = useContext(AuthContext);

    const [state, setState] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        city:'',
        showPassword: false,
    })

    const { fullName, email, phoneNumber,city, password, showPassword } = state;
    const [message,setMessage] =useState('');

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const handleSigup =()=>{
        handleMessage(null);

        if(fullName==''||email==''||phoneNumber==''||city==''||password=='')
        handleMessage('fill in the fields');

        else{

        Sigup1(fullName, email, phoneNumber,city, password);
        handleMessage(null);
        setlogin(0);
        
        navigation.push('GenderSelection')}
    }

    const handleMessage =(message)=>{
        setMessage(message);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {backArrow()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {header()}
                    {fullNameTextField()}
                    {emailIdTextField()}
                    {phoneNumberTextField()}
                    {addressinfo()}
                    {passwordTextField()}
                    {Messageinfo()}
                    {signupButton()}
                    {connectWithInfo()}
                </ScrollView>
            </View>
            {alreadyAccountInfo()}
        </SafeAreaView>
    )

    function alreadyAccountInfo() {
        return (
            <Text style={styles.alreadyAccountTextStyle}>
                {tr('alreadyAccount')} { }
                <Text onPress={() => navigation.push('Signin')} style={{ ...Fonts.blackColor16Bold }}>
                    {tr('signin')}
                </Text>
            </Text>
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
    function addressinfo() {
        return (
            <View style={styles.textFieldWrapStyle}>
                 <RNPickerSelect
                       placeholder={{ label: "Select your Address", city: null }}
value={city}
                 onValueChange={(value) =>  updateState({ city: value })}
                 items={[
                     { label: "Jerusalem", value: "Jerusalem" },
                     { label: "Gaza", value: "Gaza" },
                     { label: "Jericho ", value: "Jericho" },
                     { label: "Jabālyā", value: "Jabālyā" },
                     { label: "Nablus", value: "Nablus" },
                     { label: "Rafaḩ", value: "Rafaḩ" },
                     { label: "Ţūlkarm	", value: "Ţūlkarm	" },
                     { label: "Bethlehem", value: "Bethlehem" },
                     { label: "Ramallah", value: "Ramallah" },

                 ]}
             />
            </View>
        )
    }
    

    function signupButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() =>{handleSigup()}}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    {tr('signup')}
                </Text>
            </TouchableOpacity>
        )
    }

    function passwordTextField() {
        return (
            <View style={{
                ...styles.textFieldWrapStyle,
                ...styles.passwordFieldStyle,
                flexDirection: isRtl ? 'row-reverse' : 'row',
            }}>
                <TextInput
                    value={password}
                    onChangeText={(text) => updateState({ password: text })}
                    placeholder={tr('password')}
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

    function phoneNumberTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={phoneNumber}
                    onChangeText={(text) => updateState({ phoneNumber: text })}
                    placeholder={tr('phone')}
                    style={{ ...Fonts.blackColor14Regular }}
                    selectionColor={Colors.primaryColor}
                    keyboardType="phone-pad"
                    placeholderTextColor={'#8D8D8D'}
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

    function fullNameTextField() {
        return (
            <View style={styles.textFieldWrapStyle}>
                <TextInput
                    value={fullName}
                    onChangeText={(text) => updateState({ fullName: text })}
                    placeholder={tr('name')}
                    style={{ ...Fonts.blackColor14Regular }}
                    selectionColor={Colors.primaryColor}
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

    function backArrow() {
        return (
            <MaterialIcons
                name={isRtl ? 'arrow-forward' : "arrow-back"}
                size={24}
                color={Colors.primaryColor}
                style={{ margin: Sizes.fixPadding * 3.0, alignSelf: isRtl ? 'flex-end' : 'flex-start' }}
                onPress={() => navigation.pop()}
            />
        )
    }
}

export default SignupScreen;

const styles = StyleSheet.create({
    loginIcon: {
        alignSelf: 'center',
        marginTop:-60,
      },
    headerWrapStyle: {
        marginBottom: Sizes.fixPadding * 2.0,
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
        marginBottom: 0.0,
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
    
    alreadyAccountTextStyle: {
        textAlign: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
        ...Fonts.grayColor16Regular
    },
    orText: {
        fontSize: 15,
        lineHeight: 15 * 1.4,
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.POPPINS_BOLD,
        marginLeft: 5,
        alignSelf: 'center',
      },
      facebookButton: {
        backgroundColor: Colors.FABEBOOK_BLUE,
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 8,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      googleButton: {
        backgroundColor: Colors.GOOGLE_BLUE,
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
      },
      signinButtonLogo: {
        height: 40,
        width: 40,
      },
      signinButtonLogoContainer: {
        width: 20.0,
        height: 10.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding - 5.0,
        elevation: 3.0,
      },
      socialButtonsContainer: {
        width: 40.0,
        height: 20.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:Colors.DEFAULT_WHITE
      },
      socialSigninButtonText: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 16,
        lineHeight: 13 * 1.4,
        fontFamily:Fonts.POPPINS_MEDIUM,
        padding: 2,
        right: 15,

      },
})