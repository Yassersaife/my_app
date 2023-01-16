import { SafeAreaView, ScrollView, TouchableOpaascity,StyleSheet, Text, TouchableOpacity, View, StatusBar, ImageBackground, Image, Dimensions, FlatList, } from 'react-native'
import React, { useState,useContext,useEffect } from 'react'
import { Colors, Fonts, Sizes,Size } from '../../constants/styles';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AuthContext } from '../../constants/AuthContext';





const { width,height } = Dimensions.get('window');
const WorkCategories =[
    {
        id: '1',
        Image: require('../../assets/images/trainer/work.png'),
        Name: "Clients",
        ONPress:"client",
       
    },
    {
        id: '2',
        Image: require('../../assets/images/trainer/work2.jpg'),
        Name: "Workout",
        ONPress:"videosTrainer",

       
    },
    {
        id: '3',
        Image: require('../../assets/images/trainer/gym3.jpg'),
        Name: "Find GYMs",
        ONPress:"Clubs",

    },
    {
        id: '4',
        Image: require('../../assets/images/trainer/work1.png'),
        Name: "Profile",
        ONPress:"ProfileTrainer",

    },
]
const GoalData = ['Keep fit' ,'Lose weight (lose fat)',"Gain muscle mass (Grow your size)","Gain more flexible",
 "Get Stringer "  ];
const HomeTraninerScreen = ({ navigation, route, screenProps }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';
    const {userinfo,email,setuserinfo,setgoalname} = useContext(AuthContext);


    function tr(key) {
        return t(`homeScreen:${key}`)
    }
    useEffect(()=>{
        setuserinfo([]);
        fetch(`http://192.168.1.12:8082/coaches/${email}`, {
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
              setgoalname(GoalData[userinfo.goal]);

            },
            (error) => {
              console.log(error);
                    }
          )
        
    },[])




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
                >
                    {banner()}
                    {workCategoriesData()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )


    function workCategoriesData() {
        const renderItem = ({ item }) => (
          
              
                    <TouchableOpacity
                     onPress={() => {
                        navigation.navigate(item.ONPress);
                    }}
                        style={{
                            flex: 1,
        elevation: 2.0,
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
              height: 209,
              width: 231,
              backgroundColor: Colors.DEFAULT_WHITE,
              borderRadius: 20,
              marginRight: 20,
              shadowColor: Colors.DARK_ONE,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
    
              elevation: 3,
                       }}>
                       
                       <ImageBackground
                    source={item.Image}
                    style={{ height: height / 6.0 }}
                    borderTopLeftRadius={Sizes.fixPadding - 2.0}
                    borderTopRightRadius={Sizes.fixPadding - 2.0}
                >
                    <SimpleLineIcons size={23}
                       name="energy"
                        color={Colors.yellowColor}

                        style={{ alignSelf: 'flex-end', margin: Sizes.fixPadding - 5.0, }}
                         />
                    </ImageBackground>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 15,
                justifyContent: 'space-between',
                paddingVertical: 10,
              }}>
              <View >
                <Text numberOfLines={1} style={{fontSize: 14, ...Fonts.primaryColor16SemiBold,}}>
                  {item.Name}
                </Text>
                
                
              </View>
              <View
                    style={{
                      marginVertical: Size / 5,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    
                    <TouchableOpacity
                      style={{
                        backgroundColor: Colors.primary2,
                        padding: 5 ,
                        borderRadius: Size,
                        left:10,
                        top:10,
                      }}
                    >
                      <AntDesignIcons name="right" 
                                style={{fontSize: 15, color: Colors.whiteColor}}/>
                                
                    </TouchableOpacity>
                  </View>
            </View>
    
                    </TouchableOpacity>
        )
        return (
            <FlatList
                data={WorkCategories}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding,paddingVertical:Sizes.fixPadding*4 }}
                showsVerticalScrollIndicator={false}
            />
        )
    }

    function banner() {
        return (
            <View style={{ ...styles.bannerWrapStyle, flexDirection: 'row', }}>
            <View style={{ position: 'absolute', right:25.0, bottom: 0.0 ,borderRadius:30}}>
                    <Image
                        source={require('../../assets/images/exercises/trainer.png')}
                        style={{
                            height: width / 2.3,
                            width: width / 2.2,
                            backgroundColor:Colors.primaryColor,
                        }}
                    />
                </View>
                <View style={{ zIndex: 1.0, flex: 0.8, }}>
                    <Text style={{ ...Fonts.blackColor16Bold }}>
                        {'Start Your\n Training Session'}
                    </Text>
                    
                    <TouchableOpacity
                        activeOpacity={0.99}
                        onPress={() => navigation.push('TrainerProfile')}
                        style={{ ...styles.joinNowButtonStyle, alignSelf: isRtl ? 'flex-end' : 'flex-start', }}
                    >
                        <Text style={{ ...Fonts.whiteColor16SemiBold }}>
                            {tr('joinNow')}
                        </Text>
                    </TouchableOpacity>
                   
                </View>
                
            </View>
        )
    }

    function header() {
        return (
            <View style={{ ...styles.headerWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <View style={{ flex: 1, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <Image
                source={{uri:`http://192.168.1.12:8082/downloadFile/${userinfo.path}`}}
                        style={{ width: 45.0, height: 45.0, borderRadius: 22.5 }}
                    />
                    <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding + 5.0 }}>
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                            Hello Coach {userinfo.fullname}
                        </Text>
                        <Text style={{ ...Fonts.blackColor14Regular }}>
                            {tr('userWelcome')}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.99}
                    style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}
                >
                    <View style={{ marginLeft: isRtl ? 0.0 : Sizes.fixPadding, marginRight: isRtl ? Sizes.fixPadding : 0.0 }}>
                        <MaterialCommunityIcons name="chat" size={24} color={Colors.blackColor} />
                        <View style={styles.newNotificationBellStyle} />
                    </View>
                   
                </TouchableOpacity>
            </View>
        )
    }
}

export default HomeTraninerScreen;

const styles = StyleSheet.create({headerWrapStyle: {
    marginVertical: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    alignItems: 'center',
    justifyContent: 'space-between'
},
newNotificationBellStyle: {
    position: 'absolute',
    width: 8.0,
    height: 8.0,
    borderRadius: 4.0,
    backgroundColor: Colors.redColor,
    right: 2.5, top: 5.0,
    borderColor: Colors.whiteColor,
    borderWidth: 1.0
},
joinNowButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding + 2.0,
    marginTop: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding - 5.0,
},
bannerWrapStyle: {
    paddingHorizontal:Sizes.fixPadding * 3,
    backgroundColor: Colors.whiteColor,
    paddingVertical: Sizes.fixPadding + 6.0,
    marginTop: Sizes.fixPadding + 30.0,
    borderColor:Colors.primaryColor,
    borderRadius:30,
    borderWidth:1,

}


})