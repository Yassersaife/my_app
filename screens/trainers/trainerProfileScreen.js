import { StyleSheet, Alert,Text,ScrollView, View, SafeAreaView, Image, FlatList, TouchableOpacity, StatusBar, Dimensions, ImageBackground } from 'react-native'
import React, { useState,useContext,useEffect } from 'react';
import { Colors, Fonts, Sizes,Size } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import { useTranslation } from 'react-i18next';
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { AuthContext } from '../../constants/AuthContext';
const { height, width } = Dimensions.get('window');
const GoalData = ['Keep fit' ,'Lose weight (lose fat)',"Gain muscle mass (Grow your size)","Gain more flexible",
 "Get Stringer " 
 ];
const reviews = [
    {
        id: '1',
        userImage: require('../../assets/images/user/user2.png'),
    },
    {
        id: '2',
        userImage: require('../../assets/images/user/user3.png'),
    },
    {
        id: '3',
        userImage: require('../../assets/images/user/user4.png'),
    },
    {
        id: '4',
        userImage: require('../../assets/images/user/user5.png'),
    },
];



const TrainerProfileScreen = ({ navigation ,route}) => {

    const item =route.params.item;
    const {userinfo,email,setuserinfo,localhost} = useContext(AuthContext);


 const handlejoin=()=>{

    fetch(`http://${localhost}:8082/player/coach/${userinfo.id}/${item.id}`, {
        method: "GET",
                 
      })
          .then(res => {
             
            return res.text();}
          )
          .then(
            (result) => {
                if(result =="Success")
                navigation.push(('SuccessPayment'),{name:item.fullname});
                    
                else{
                    Alert.alert("Sorry, you Failed Payment. Please try again");   }


              console.log(result);
            },
            (error) => {
              console.log(error);
              
            }
          )

 }

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`trainerProfileScreen:${key}`)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            {collapsibleHeader()}
        </SafeAreaView>
    )

    function collapsibleHeader() {
        const renderContent = () => {
            return (
                <View style={{ flex: 1, }}>
                {trainerDetail()}

                    {feeAndBookButton()}

                </View>
            )
        }

        const renderNavBar = () => {
            return (
                <View style={{ marginVertical: Sizes.fixPadding -15, marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                        <MaterialIcons
                            name={isRtl ? "arrow-forward" : "arrow-back"}
                            size={24}
                            color={Colors.whiteColor}
                            onPress={() => navigation.pop()}
                        />
                        <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.whiteColor18SemiBold }}>
                            {tr('header')}
                        </Text>
                    </View>
                    <MaterialIcons
                        name='share'
                        color={'white'}
                        size={25}
                    />
                </View>
            )
        }
        console.log(item.path);


        const renderToolBar = () => {
            return (
                <ImageBackground
                source={{uri:`http://${localhost}:8082/downloadFile/${item.path}`}}

                  style={{
                  height: height / 2 + Size * 2,
    
                }}
                imageStyle={{
                  borderRadius: Size * 3,
                }}
              >
                
    
                
              </ImageBackground>
            )
        }

        return (
            <CollapsibleToolbar
                renderContent={renderContent}
                renderNavBar={renderNavBar}
                renderToolBar={renderToolBar}
                collapsedNavBarBackgroundColor={Colors.primaryColor}
                translucentStatusBar={false}
            />
        )
    }

    function trainerDetail() {
        return (
            
            <SafeAreaView>
            <View style={styles.trainerDetailWrapStyle}>
                  
                
                {trainerNameAndSpeciality()}
                {expercienceInfo()}
                {otherDetail()}

            </View>
            </SafeAreaView>
        )
    }

    

    function reviewInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding *2}}>
                {reviewTitleAndRatingInfo()}
                {totalReviewsAndUserInfo()}
            </View>
        )
    }

    function totalReviewsAndUserInfo() {
        let left = 80;
        return (
            <View style={{ marginTop: Sizes.fixPadding, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                <View style={{ ...styles.totalReviewsWrapStyle, }}>
                    <Text style={{ ...Fonts.whiteColor10SemiBold }}>
                        50k
                    </Text>
                </View>
                {
                    reviews.slice(0, 4).reverse().map((item, index) => {
                        left = left - 20;
                        return (
                            <Image
                                key={`${item.id}`}
                                source={item.userImage}
                                style={{ ...styles.reviewImageStyle, left: left, position: 'absolute' }}
                            />
                        )
                    })
                }
            </View>
        )
    }

    function reviewTitleAndRatingInfo() {
        return (
            <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    {tr('reviews')}
                </Text>
                <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <MaterialIcons name="star" size={20} color={Colors.yellowColor} />
                    <Text style={{ ...Fonts.blackColor12Bold }}>
4.5                  </Text>
                </View>
            </View>
        )
    }

    function feeAndBookButton() {
        return (
<SafeAreaView
          style={{ flexDirection: "row", justifyContent: "space-between",height:height/15 }}
        >
          <View
            style={{
              padding: Size,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: Size * 3,
            }}
          >
            <Text style={{ color: Colors.blackColor, fontSize: Size * 2.5}}>
              Price
            </Text>
            <View style={{ flexDirection: "row" }}>
            <Text style={{ color: Colors.primaryColor, fontSize: Size * 2.5 }}>
                $
              </Text>
              <Text
                style={{
                  color: Colors.DARK_ONE,
                  fontSize: Size * 2.5,
                  marginLeft: Size / 2,
                }}
              >
                {item.amount}
              </Text>
              <Text style={{ color: Colors.DARK_TWO, fontSize: Size ,top:15}}>
                /{tr('month')}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              marginRight: Size,
              backgroundColor: Colors.primaryColor,
              width: width / 2.5 + Size * 3,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: Size * 2,
            }}
            onPress={() => handlejoin()}

          >
            <Text
              style={{
                ...Fonts.whiteColor14SemiBold
              }}
            >
                        {tr('book')}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>


           
        )
    }

    function otherDetail() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                {detailShort({ title: tr('work'), description: '09:00 AM to 06:00 PM' })}
                {detailShort({ title: tr('speak'), description: 'English & Arabic' })}
                {detailShort({ title: tr('qualification'), description: 'Diploma in personal tranning' })}
            </View>
        )
    }

    function detailShort({ title, description }) {
        return (
            <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                <Text numberOfLines={1} style={{ width: 100.0, maxWidth: 100.0, ...Fonts.grayColor14Medium }}>
                    {title}
                </Text>
                <Text style={{ marginHorizontal: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                    :
                </Text>
                <Text style={{ flex: 1, ...Fonts.blackColor14Medium }}>
                    {description}
                </Text>
            </View>
        )
    }

    function expercienceInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.5, flexDirection: isRtl ? 'row-reverse' : 'row', marginHorizontal: Sizes.fixPadding + 5.0 }}>
                {expercienceInfoShort({ count: item.experience, description: `Work\nexpriance`, bgColor: Colors.primary4 })}
                {expercienceInfoShort({ count: 10, description: `Job\nCompleted`, bgColor: Colors.primary4 })}
                {expercienceInfoShort({ count: 5, description: `Client\nServing`, bgColor: Colors.primary4 })}
            </View>
        )
    }

    function expercienceInfoShort({ count, description, bgColor }) {
        return (
            <View style={{ ...styles.expercienceInfoWrapStyle, backgroundColor: bgColor, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor16SemiBold }}>
                    {count}
                </Text>
                <Text numberOfLines={2} style={{ textAlign: 'center', ...Fonts.blackColor14Regular }}>
                    {description}
                </Text>
            </View>
        )
    }

    function contactOptions() {
        return (
            <View style={{ ...styles.contactOptionsWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                {contactOptionsShort({ icon: 'call', onPress: () => { } })}
                {contactOptionsShort({ icon: 'chat', onPress: () => { } })}
                {contactOptionsShort({ icon: 'videocam', onPress: () => { } })}
            </View>
        )
    }

    function contactOptionsShort({ icon, onPress }) {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={onPress}
                style={styles.contactOptionWrapStyle}
            >
                <MaterialIcons name={icon} size={20} color={Colors.blackColor} />
            </TouchableOpacity>
        )
    }

    function trainerNameAndSpeciality() {
        return (
            <View
                  style={{
                    borderRadius: Size * 3,
                    overflow: "hidden",
                    top:-30,
                  }}
                >
                  <BlurView
                    intensity={80}
                    tint="dark"
                    style={{
                      padding: Size * 2,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: Size * 2,
                          color: Colors.DEFAULT_WHITE,
                          fontWeight: "600",
                          marginBottom: Size,
                        }}
                      >
                        {item.fullname}
                      </Text>
                      <Text
                        style={{
                          ...Fonts.whiteColor16SemiBold,
                          marginBottom: Size,

                        }}
                      >
                            {GoalData[item.goal]}
                     </Text>
                      {reviewInfo()}

                    </View>
                    <View
                      style={{
                        width: "35%",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{
                            padding: Size /2,
                            width: Size * 5,
                            height: Size * 5.5,
                            backgroundColor: Colors.primary4,
                            borderRadius: Size+2,
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight:8,
                          }}
                        >
                          {contactOptionsShort({ icon: 'call', onPress: () => { } })}

                          <Text
                            style={{
                              color: Colors.blackColor,
                              fontSize: Size,
                            }}
                          >
                            Call
                          </Text>
                        </View>
                        <View
                          style={{
                            padding: Size ,
                            width: Size *5,
                            height: Size * 5.5,
                            backgroundColor: Colors.primary4,
                            borderRadius: Size+2,
                            justifyContent: "center",
                            alignItems: "center",

                          }}
                        >
                                          {contactOptionsShort({ icon: 'chat', onPress: () => { } })}

                          <Text
                            style={{
                              color: Colors.blackColor,
                              fontSize: Size,
                            }}
                          >
                              Chat
                          </Text>
                        </View>
                      </View>
                      
                    </View>
                  </BlurView>
                </View>
        )
    }
}

export default TrainerProfileScreen;

const styles = StyleSheet.create({
    contactOptionWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding - 2.0
    },
    expercienceInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding - 5.0,
        flex: 1,
        padding: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding - 5.0,
        flex: 1,
        borderRadius: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding,
    },
    feeAndBookButtonWrapStyle: {
        marginTop: Sizes.fixPadding * 2.5,
        marginHorizontal: Sizes.fixPadding,
        alignItems: 'center'
    },
    contactOptionsWrapStyle: {
        marginTop: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reviewImageStyle: {
        width: 35.0,
        height: 35.0,
        borderRadius: 17.5,
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
    },
    totalReviewsWrapStyle: {
        width: 35.0,
        height: 35.0,
        borderRadius: 17.5,
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
        left: 85,
        position: 'absolute',
        backgroundColor: '#0F9EB2',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sessionThumbImageCoverStyle: {
        flex: 1,
        backgroundColor: Colors.DARK_FOUR,
        borderRadius: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    trainerDetailWrapStyle: {
        marginTop: -Sizes.fixPadding * 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding + 7.0,
        paddingVertical: Sizes.fixPadding * 2.0,
        elevation: 2.0,
    }
})