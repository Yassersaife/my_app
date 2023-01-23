import { StyleSheet,TouchableOpacity, Text, View, SafeAreaView, StatusBar, ScrollView, FlatList, ImageBackground, Image, BackHandler, Dimensions } from 'react-native'
import React, { useState, useCallback,useContext, useEffect } from 'react'
import { Colors, Fonts, Size, Sizes } from '../../constants/styles';
import { MaterialIcons, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import VideoPlayer from 'expo-video-player';
import { ResizeMode } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../constants/AuthContext';

const { width, height } = Dimensions.get('window');

const sessionParts = [
    {
        id: '1',
        minute: 8,
        session: 'warm up',
    },
    {
        id: '2',
        minute: 7,
        session: 'workout introduction'
    },
    {
        id: '3',
        minute: 20,
        session: 'workout 1',
    },
    {
        id: '4',
        minute: 8,
        session: 'workout 2'
    },
    {
        id: '5',
        minute: 7,
        session: 'Cool down'
    },
];

const upcomingVideos = [
    {
        id: '1',
        videoThumbImage: require('../../assets/images/exercises/exercise1.jpg'),
        videoTitle: "Basic of yoga",
    },
    {
        id: '2',
        videoThumbImage: require('../../assets/images/exercises/exercise2.jpg'),
        videoTitle: "Drill essentials",
    },
];
const GoalData = ['Keep fit' ,'Lose weight (lose fat)',"Gain muscle mass (Grow your size)","Gain more flexible",
 "Get Stringer " 
 ];
const benifits = ['Strengts', 'Stamina', 'Endurance', 'Mobility'];

const UserProgramScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`userProgramScreen:${key}`)
    }
    const {userinfo,email,setuserinfo,localhost} = useContext(AuthContext);


    const [inFullscreen2, setInFullsreen2] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [inFavorite, setInFavorite] = useState(false);

    const totalSessionMinute = sessionParts.reduce((s, { minute }) => s + minute, 0);

    const backAction = async () => {
        if (inFullscreen2) {
            await changeScreenToPotrait()
            setInFullsreen2(false)
        }
        else {
            navigation.pop()
        }
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    useEffect(() => {
        handletr();

        return async () => {
            await changeScreenToPotrait();
        };
    }, []);

    async function changeScreenToPotrait() {
        await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT
        );
    }
    const [trainer, settrainer] = useState({});
    const handletr=()=>{
        
          fetch(`http://${localhost}:8082/coaches/id/${userinfo.coachid}`, {
        method: "GET",
                 
      })
      .then(res => {
          return res.json();
        }
      )
      .then(
        (result) => {
            
          settrainer(result);
          console.log(result);
        


        },
        (error) => {
          console.log(error);

                }
      )
    
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar hidden={inFullscreen2 ? true : false} translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {videoDisplay()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {trainerInfo()}
                    {caloriesEquipmentAndDurationInfo()}
                    {sessionDetail()}
                    {upcomingVideosInfo()}
                </ScrollView>
            </View>
            {snackBar()}
        </SafeAreaView>
    )

    function upcomingVideosInfo() {
        const renderItem = ({ item }) => (
            <ImageBackground
                source={item.videoThumbImage}
                style={{
                    width: width / 1.7,
                    height: width / 2.8,
                    marginRight: Sizes.fixPadding * 2.0,
                }}
                borderRadius={Sizes.fixPadding - 2.0}
                resizeMode="stretch"
            >
                <View style={styles.videoThumbImageCoverStyle}>
                    <Text style={{ textAlign: 'center', ...Fonts.whiteColor16Bold }}>
                        {item.videoTitle}
                    </Text>
                </View>
            </ImageBackground>
        )
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('upcomingVideo')}
                </Text>
                <FlatList
                    data={upcomingVideos}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0, paddingTop: Sizes.fixPadding }}
                />
            </View>
        )
    }

    function sessionDetail() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16Bold ,marginVertical:Sizes.fixPadding*2}}>
                    {tr('sessionDetails')}
                </Text>
                {sessionDetailWithSession()}
            </View>
        )
    }
    function sessionDetailWithSession() {
        return (
            <View style={{marginVertical:Sizes.fixPadding}}>
                
                {
                    sessionParts.map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={0.99}
                            key={`${item.id}`}
                            style={{ borderRadius:15,borderBottomWidth:1,borderBottomColor:Colors.primary2,flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center', marginBottom: Sizes.fixPadding * 2.0, }}
                        >
                            <Image
                                source={require('../../assets/images/session/workout3.png')}
                                style={{ width: width / 7, height: width / 7, borderRadius: Sizes.fixPadding - 2.0 }}
                            />
                            <View style={{ flex: 1, marginLeft: isRtl ? 0.0 : Sizes.fixPadding + 5.0, marginRight: isRtl ? Sizes.fixPadding + 5.0 : 0.0 }}>
                                <Text style={{ ...Fonts.blackColor16Bold }}>
                                {item.session}

                                </Text>
                                <Text style={{ ...Fonts.primaryColor16Medium }}>
                                {item.minute.toString().length == 1 ? `0${item.minute}` : item.minute} min

                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
    function sessionDetailWithSession2() {
        return (
            <View>
                {sessionParts.map((item) => (
                    <View
                        key={`${item.id}`}
                        style={{ marginBottom: Sizes.fixPadding - 5.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}
                    >
                        <View style={{ width: 20.0, height: 4.0, backgroundColor: item.indicatorColor }} />
                        <Text style={{ marginRight: Sizes.fixPadding + 10.0, marginLeft: Sizes.fixPadding, ...Fonts.grayColor14Regular }}>
                            {item.minute.toString().length == 1 ? `0${item.minute}` : item.minute} min
                        </Text>
                        <Text style={{ ...Fonts.blackColor14Medium }}>
                            {item.session}
                        </Text>
                    </View>
                ))}
            </View>
        )
    }

    function beginWithTotalMinuteInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                <Text style={{ ...Fonts.grayColor14SemiBold }}>
                    {tr('begin')}
                </Text>
                <View style={{ marginHorizontal: Sizes.fixPadding - 5.0, flexDirection: isRtl ? 'row-reverse' : 'row', flex: 1, }}>
                    {sessionParts.map((item) => (
                        <View
                            key={`${item.id}`}
                            style={{
                                backgroundColor: item.indicatorColor,
                                flex: item.minute / totalSessionMinute,
                                height: 4.0,
                                marginHorizontal: Sizes.fixPadding - 9.0
                            }} />
                    ))}
                </View>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    {totalSessionMinute} {tr('min')}
                </Text>
            </View>
        )
    }

    function benifitsInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('benefits')}
                </Text>
                {
                    benifits.map((item, index) => (
                        <View
                            key={`${index}`}
                            style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                            <Text style={{ ...Fonts.blackColor14Medium }}>
                                •
                            </Text>
                            <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.blackColor14Medium }}>
                                {item}
                            </Text>
                        </View>
                    ))
                }
            </View>
        )
    }

    function caloriesEquipmentAndDurationInfo() {
        return (
            <View style={{ ...styles.CaloriesInfoWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'space-between' }}>
                {caloriesInfo()}
                <View style={{ width: 1.0, backgroundColor: Colors.grayColor, height: '100%', marginHorizontal: Sizes.fixPadding * 2.0, }} />
                {equipmentInfo()}
                <View style={{ width: 1.0, backgroundColor: Colors.grayColor, height: '100%', marginHorizontal: Sizes.fixPadding * 2.0, }} />
                {durationInfo()}
            </View>
        )
    }

    function caloriesInfo() {
        return (
            <View style={{ flex: 1, alignItems: 'center', }}>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                    {tr('calories')}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding - 5.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/icons/calorier.png')}
                        style={{ width: 15.0, height: 15.0, resizeMode: 'contain' }}
                    />
                    <Text numberOfLines={1}
                        style={{
                            marginLeft: isRtl ? 0.0 : Sizes.fixPadding - 5.0,
                            marginRight: isRtl ? Sizes.fixPadding - 5.0 : 0.0,
                            ...Fonts.primaryColor14Medium
                        }}
                    >
                        400
                    </Text>
                </View>
            </View>
        )
    }

    function durationInfo() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
                    {tr('netDuration')}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding - 5.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="clock-time-four" size={18} color={Colors.primaryColor} />
                    <Text numberOfLines={1}
                        style={{
                            marginLeft: isRtl ? 0.0 : Sizes.fixPadding - 5.0,
                            marginRight: isRtl ? Sizes.fixPadding - 5.0 : 0.0,
                            ...Fonts.primaryColor14Medium
                        }}
                    >
                        50 min.
                    </Text>
                </View>
            </View>
        )
    }

    function equipmentInfo() {
        return (
            <View style={{ flex: 1, alignItems: 'center', }}>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                    {tr('equpiment')}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding - 5.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <MaterialIcons name="fitness-center" size={18} color={Colors.primaryColor} />
                    <Text numberOfLines={1}
                        style={{
                            marginLeft: isRtl ? 0.0 : Sizes.fixPadding - 5.0,
                            marginRight: isRtl ? Sizes.fixPadding - 5.0 : 0.0,
                            ...Fonts.primaryColor14Medium
                        }}
                    >
                        None
                    </Text>
                </View>
            </View>
        )
    }

    function snackBar() {
        return (
            <Snackbar
                style={{ backgroundColor: Colors.lightBlackColor, elevation: 0.0 }}
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
            >
                {inFavorite ? tr('addInFav') : tr('removeFromFav')}
            </Snackbar>
        )
    }

    function trainerInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'space-between' }}>
                <View>
                
                    <Text style={{ top:-5,...Fonts.primaryColor18SemiBold ,shadowColor: Colors.DARK_ONE,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,}}>
                        Full body tranning
                    </Text>
                    <View style={{ width :width/1.8 ,flex: 1, marginTop: Sizes.fixPadding+5, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center', }}>
                    <Image
                        source={require('../../assets/images/trainers/trainer1.png')}
                        style={{ width: 60.0, height: 60.0, borderRadius: 35.0, }}
                    />
                    <View style={{ flex: 2, marginLeft: isRtl ? 0.0 : Sizes.fixPadding, marginRight: isRtl ? Sizes.fixPadding : 0.0 }}>
                    <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding-3, ...Fonts.blackColor16SemiBold }}>
                     {trainer.fullname}                    </Text>
                    <Text numberOfLines={2} style={{  ...Fonts.primaryColor14SemiBold }}>
                      {GoalData[trainer.goal]}
                               </Text>
                    </View>
                    </View>
                </View>
                <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <MaterialIcons
                        name={inFavorite ? "favorite" : "favorite-outline"}
                        size={24}
                        color={Colors.redColor}
                        style={{ marginRight: isRtl ? 0.0 : Sizes.fixPadding + 5.0, marginLeft: isRtl ? Sizes.fixPadding + 5.0 : 0.0 }}
                        onPress={() => {
                            setShowSnackBar(true)
                            setInFavorite(!inFavorite)
                        }}
                    />
                </View>
            </View>
        )
    }

    function videoDisplay() {
        return (
            <View>
                <VideoPlayer
                    videoProps={{
                        shouldPlay: true,
                        resizeMode: ResizeMode.STRETCH,
                        source: require('../../assets/video/workout.mp4')
                    }}
                    slider={{ visible: true, }}
                    style={{
                        videoBackgroundColor: Colors.lightGrayColor,
                        height: inFullscreen2 ? width : 230.0,
                        width: inFullscreen2 ? height : width,
                    }}
                    icon={{
                        pause: <MaterialIcons name='pause' color={Colors.lightPrimaryColor} size={40} style={{ marginBottom: 20.0, }} />,
                        play: <MaterialIcons name='play-arrow' color={Colors.lightPrimaryColor} size={40} style={{ marginBottom: 20.0, }} />,
                        replay: <MaterialIcons name="replay" color={Colors.lightPrimaryColor} size={40} style={{ marginBottom: 20.0, }} />,
                    }}
                    activityIndicator={{ color: Colors.whiteColor, size: 40.0, marginBottom: 20.0 }}
                    fullscreen={{
                        inFullscreen: inFullscreen2,
                        enterFullscreen: async () => {
                            setInFullsreen2(!inFullscreen2)
                            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
                        },
                        exitFullscreen: async () => {
                            setInFullsreen2(!inFullscreen2)
                            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
                        },
                    }}
                />
                {header()}
            </View>
        )
    }

    function header() {
        return (
            <View style={{ ...styles.headerWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <MaterialIcons
                    name={isRtl ? "arrow-forward" : "arrow-back"}
                    size={24}
                    color={Colors.whiteColor}
                    onPress={async () => {
                        if (inFullscreen2) {
                            await changeScreenToPotrait()
                            setInFullsreen2(false)
                        }
                        else {
                            navigation.pop()
                        }
                    }}
                />
            </View>
        )
    }
}

export default UserProgramScreen;

const styles = StyleSheet.create({
    headerWrapStyle: {
        position: 'absolute',
        left: 20.0,
        right: 20.0,
        top: 20.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    CaloriesInfoWrapStyle: {
        justifyContent: 'space-between',
        elevation: 1.5,
        borderRadius: Sizes.fixPadding - 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding +2.0,
        marginVertical:10,
        borderColor: Colors.primary2,
        borderWidth: 2.0,
        borderBottomWidth: 1.0,
        backgroundColor:Colors.SECONDARY_WHITE,
    },
    videoThumbImageCoverStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 2.0,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)'
    }
})