import { StyleSheet, Text,ActivityIndicator,Alert,Image ,View, SafeAreaView, StatusBar, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState,useContext } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../constants/AuthContext';
import { Overlay } from 'react-native-elements';

const NewPasswordScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`newPasswordScreen:${key}`)
    }
    const [isLoading, setIsLoading] = useState(false);

    const [state, setState] = useState({
        password: '',
        showPassword: false,
        confirmPassword: '',
        showConfirmPassword: false,
    })

    const { password, showPassword, confirmPassword, showConfirmPassword } = state;
    const {email,localhost} = useContext(AuthContext);
    const [msg, setmsg] = useState('');

    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    const handlepass=()=>{
        if(password==confirmPassword){
        console.log(email);
        console.log(password);

        fetch(`http://${localhost}:8082/reset-password/player`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email,password:password})
          })
          .then(res => {
            console.log(res.status);
            console.log(res.headers);
            return res.text();
          })
          .then(
            (result) => {
                console.log(result);

                if(result=='Success'){
                    Alert.alert(result)
                    setIsLoading(true)
                    setTimeout(() => {
                        navigation.push('Signin');
                        setIsLoading(false)
                    }, 2000);
    
              }
              else{
                  Alert.alert(result)
                  }
                
              setIsLoading(false);
            },
            (error) => {
              console.log(error);
              setIsLoading(false);
            }
          )}
          else{
            Alert.alert("conform your password")

          }
    }
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
                {loadingDialog()}

            </View>
        </SafeAreaView>
    )
    function loadingDialog() {
        return (
            <Overlay
                isVisible={isLoading}
                overlayStyle={styles.dialogStyle}
            >
                <ActivityIndicator size={35} color={Colors.primaryColor} style={{ alignSelf: 'center' }} />
                <Text style={{ marginTop: Sizes.fixPadding, textAlign: 'center', ...Fonts.blackColor16Bold }}>
                    Success
                </Text>
            </Overlay>
        )
    }

    function submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => handlepass()}
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