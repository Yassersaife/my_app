import { StyleSheet,  View, SafeAreaView, StatusBar, ScrollView, Image, TouchableOpacity, Dimensions, } from 'react-native'
import React, { useState,useContext,useEffect } from 'react';
import { Fonts, Colors, Sizes } from '../../constants/styles';
import { MaterialCommunityIcons, MaterialIcons,FontAwesome } from '@expo/vector-icons';

import { Overlay } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
  } from 'react-native-paper';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../constants/AuthContext';

const { width } = Dimensions.get('window');
const GoalData = ['Keep fit' ,'Lose weight (lose fat)',"Gain muscle mass (Grow your size)","Gain more flexible",
 "Get Stringer "  ];
const ProfileTrainerScreen = ({ navigation }) => {

    const {userinfo,email,setuserinfo,localhost} = useContext(AuthContext);

    useEffect(()=>{
        setuserinfo([]);
        fetch(`http://${localhost}:8082/coaches/${email}`, {
            method: "GET",
                     
          })
          .then(res => {
              return res.json();}
          )
          .then(
            (result) => {
              console.log(result);
              setuserinfo(result);
              console.log(userinfo);

            },
            (error) => {
              console.log(error);
                    }
          )
        
    },[])


    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`profileScreen:${key}`)
    }

    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1,backgroundColor:Colors.lightPrimaryColor }}>
                {header()}
                <View style={styles.sheetStyle}>
                    {profilePic()}
                    {editProfileButton()}
                    {profileOptions()}
                </View>
            </View>
            {logoutDialog()}
        </SafeAreaView>
    )

    function logoutDialog() {
        return (
            <Overlay
                isVisible={showLogoutDialog}
                onBackdropPress={() => setShowLogoutDialog(false)}
                overlayStyle={{ width: width - 40.0, borderRadius: Sizes.fixPadding - 2.0, padding: 0.0 }}
            >
                <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                    <Text style={{ textAlign: 'center', ...Fonts.blackColor18Medium }}>
                        {tr('logoutInfo')}
                    </Text>
                    <View style={styles.cancelAndLogoutButtonWrapStyle}>
                        <TouchableOpacity
                            activeOpacity={0.99}
                            onPress={() => setShowLogoutDialog(false)}
                            style={{ ...styles.cancelButtonStyle, ...styles.cancelAndLogoutButtonStyle, }}
                        >
                            <Text numberOfLines={1} style={{ marginHorizontal: Sizes.fixPadding - 5.0, ...Fonts.grayColor18SemiBold }}>
                                {tr('cancel')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.99}
                            onPress={() => {
                                setShowLogoutDialog(false)
                                navigation.push('Signin')
                            }}
                            style={{ ...styles.logoutButtonStyle, ...styles.cancelAndLogoutButtonStyle, }}
                        >
                            <Text numberOfLines={1} style={{ marginHorizontal: Sizes.fixPadding - 5.0, ...Fonts.whiteColor18SemiBold }}>
                                {tr('logout')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Overlay>
        )
    }

    function profileOptions() {
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: Sizes.fixPadding * 2.0 }}>
              {profileOptionShort({ icon: require('../../assets/images/settingIcons/subscription.png'), option: tr('subscriptionPlan'), onPress: () => { navigation.push('UserSubscription') } })}
              {profileOptionShort({ icon: require('../../assets/images/settingIcons/about.png'), option: tr('about'), onPress: () => { navigation.push('About') } })}
              {profileOptionShort({ icon: require('../../assets/images/settingIcons/help.png'), option: tr('help'), onPress: () => { navigation.push('Help') } })}
          </View>
      </ScrollView>
        )
    }

    function profileOptionShort({ option, onPress, icon }) {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.5, }}>
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={onPress}
                    style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center', justifyContent: 'space-between' }}
                >
                    <View style={{ flex: 1, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                        <Image
                            source={icon}
                            style={{ width: 16.0, height: 16.0, resizeMode: 'contain' }}
                        />
                        <Text numberOfLines={1} style={{
                            marginLeft: isRtl ? 0.0 : Sizes.fixPadding,
                            marginRight: isRtl ? Sizes.fixPadding : 0.0,
                            flex: 1, ...Fonts.blackColor16SemiBold
                        }}>
                            {option}
                        </Text>
                    </View>
                </TouchableOpacity>
                {
                    icon == require('../../assets/images/settingIcons/help.png')
                        ?
                        <View style={{ marginVertical: Sizes.fixPadding * 2.5 }} />
                        :
                        <View
                            style={{ marginVertical: Sizes.fixPadding * 2.5, backgroundColor: Colors.primaryColor, height: 1.0, }}
                        />
                }
            </View>
        )
    }

    function editProfileButton() {
        return (
            <View style={styles.userInfoSection}>
                <View style={styles.row}>
          <Icon name="phone" color={Colors.primary2} size={20}/>
          <Text style={{color:Colors.DEFAULT_BLACK, marginLeft: 20}}>{userinfo.phone}</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="work" color={Colors.primary2} size={20}/>
          <Text style={{color:Colors.DEFAULT_BLACK, marginLeft: 20}}>{userinfo.experience}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color={Colors.primary2} size={20}/>
          <Text style={{color:Colors.DEFAULT_BLACK, marginLeft: 20}}>{userinfo.email}</Text>
        </View>
      </View>
        )
    }

    function profilePic() {
        return (
            
            <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
                source={{uri:`http://${localhost}:8082/downloadFile/${userinfo.path}`}}

            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{userinfo.fullname}</Title>
            <Caption style={styles.caption}>{GoalData[userinfo.goal]}</Caption>
          </View>
        </View>
      </View>

           
        )
    }

    function header() {
        return (
            <View style={{ padding: Sizes.fixPadding * 2.0, }}>
            
                <Text style={{ textAlign: 'center', ...Fonts.whiteColor18SemiBold }}>
                    {tr('header')}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => navigation.push('EditProfileTrainer')}
                    style={styles.editIconWrapStyle}
                >
                
                    <FontAwesome name="edit" size={25} color={Colors.blackColor} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => setShowLogoutDialog(true)}
                    style={styles.logoutIconWrapStyle}
                >
                    <MaterialCommunityIcons name="logout" size={25} color={Colors.redColor} />
                </TouchableOpacity>
            </View>
        )
    }
}

export default ProfileTrainerScreen

const styles = StyleSheet.create({
  editIconWrapStyle:{
    width: 32.0,
    height: 32.0,
    borderRadius: 17.0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 22.0,
    top: 20.0,
  },
    logoutIconWrapStyle: {
      width: 35.0,
      height: 35.0,
      borderRadius: 20.0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.primary2,
      position: 'absolute',
      right: 20.0,
      top: 20.0,
    },
    profilePicStyle: {
        width: width / 4.0,
        height: width / 4.0,
        borderRadius: (width / 4.0) / 2.0,
        marginTop: -40.0,
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
        alignSelf: 'center',
    },
    editProfileButtonStyle: {
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 3.0,
        paddingHorizontal: Sizes.fixPadding * 4.0,
        marginVertical: Sizes.fixPadding,
        alignSelf: 'center',
    },
    sheetStyle: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding * 3.0,
        borderTopRightRadius: Sizes.fixPadding * 3.0,
        marginTop: Sizes.fixPadding * 2.0,
    },
    cancelAndLogoutButtonStyle: {
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding + 2.0,
        flex: 1,
        borderWidth: 1.0,
        borderBottomWidth: 0.0,
    },
    cancelButtonStyle: {
        backgroundColor: Colors.whiteColor,
        marginRight: Sizes.fixPadding,
        borderColor: Colors.lightGrayColor,
    },
    logoutButtonStyle: {
        backgroundColor: Colors.primaryColor,
        marginLeft: Sizes.fixPadding,
        borderColor: Colors.primaryColor,
    },
    cancelAndLogoutButtonWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center'
    },




    container: {
        flex: 1,
      },
      userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
      },
      row: {
        flexDirection: 'row',
        marginBottom: 10,
      },
      infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
      },
      infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      menuWrapper: {
        marginTop: 10,
        borderTopColor:Colors.primaryColor,
        borderTopLeftRadius:2      },
      menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
      },
      menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
      },
})