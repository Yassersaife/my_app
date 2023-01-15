import { StyleSheet, Text,ImageBackground, View, SafeAreaView, StatusBar, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons ,Ionicons} from '@expo/vector-icons';
import { Calendar } from "react-native-calendars";
import { useTranslation } from 'react-i18next';
import { SimpleLineIcons } from '@expo/vector-icons';

const { width,height } = Dimensions.get('window');


const workouts = [
    {
        id: '1',
        workoutType: 'Warm Up',
        workouts: [
            {
                id: '1',
                workoutImage: require('../../assets/images/exercises/exercise15.png'),
                workoutName: 'High Knee',
                workoutTime: '0:30',
            },
            {
                id: '2',
                workoutImage: require('../../assets/images/exercises/exercise11.png'),
                workoutName: 'Jog in place',
                workoutTime: '0:30',
            },
            {
                id: '3',
                workoutImage: require('../../assets/images/exercises/exercise14.png'),
                workoutName: 'Hip lifts ',
                workoutTime: '0:30',
            },
        ],
    },
    {
        id: '2',
        workoutType: 'Muscle',
        workouts: [
            {
                id: '1',
                workoutImage: require('../../assets/images/exercises/exercise6.png'),
                workoutName: 'Push up',
                workoutTime: '0:30',
            },
            {
                id: '2',
                workoutImage: require('../../assets/images/exercises/exercise3.jpg'),
                workoutName: 'Plank up',
                workoutTime: '0:30',
            },
        ],
    },
];

const VideosTrainerScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`videosScreen:${key}`)
    }

   
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {videoinfo()}
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )

       

   
    function videoinfo(){
    const renderItem = ({ item }) => (
        <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => navigation.push('UserProgram')}
                    style={{ marginHorizontal: Sizes.fixPadding * 2.0, borderRadius: 20,
              shadowColor: Colors.DARK_ONE,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
    
              elevation: 3,}}
                >

                       
                    {
                        item.workouts.map((item) => (
                            <View
                                key={`${item.id}`}
                                style={styles.workoutInfoWrapStyle}
                            >
                       <ImageBackground
                                        source={item.workoutImage}
                    style={{ height: height / 6.0 }}
                    borderTopLeftRadius={Sizes.fixPadding - 2.0}
                    borderTopRightRadius={Sizes.fixPadding - 2.0}
                >
                   <SimpleLineIcons size={23}
                       name="energy"
                        color={Colors.yellowColor}

                        style={{ alignSelf: 'flex-end', margin: Sizes.fixPadding - 5.0, }}
                         />
                        <MaterialIcons
                                        name="play-arrow"
                                        size={50}
                                        color={Colors.whiteColor}
                                        style={{ position: 'absolute',left:width/2.6,top:50 }}
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
                <Text numberOfLines={1} style={{fontSize: 14, ...Fonts.blackColor16Bold,}}>
                {item.workoutName}
                
                </Text>
                
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                <Ionicons name="time-outline" size={16} color={Colors.primaryColor} /> {item.workoutTime}min 
                    </Text>
              </View>

            </View>
            </View>
                   )) }
                    </TouchableOpacity>
        )
            
        return (
            <FlatList
                data={workouts}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                numColumns={1}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding +5,left:10}}
                showsVerticalScrollIndicator={false}
            />
        )
    }
    
    function header() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                <Ionicons
                    name="arrow-back"
                    color={Colors.primaryColor}
                    size={20}
                    onPress={() => navigation.pop()}
             
                  />
                <Text style={{ marginHorizontal: Sizes.fixPadding*13, ...Fonts.primaryColor18SemiBold }}>
                    Workout
                </Text>
            </View>
        )
    }
}

export default VideosTrainerScreen;

const styles = StyleSheet.create({
    calenderSelectedDateStyle: {
        flex: 1,
        ...Fonts.primaryColor16SemiBold,
        bottom: 30.0,
        left: -70.0,
        position: 'absolute'
    },
    dayWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 35.0,
        height: 35.0,
    },
    dayNameWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        left: 15.0,
        right: 15.0,
        top: 60.0,
    },
    proteinFatAndCaloriesInfoWrapStyle: {
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
    calendarWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderColor:Colors.primaryColor,
        borderbRadius: Sizes.fixPadding + 5.0,
        overflow: 'hidden',
        borderBottomWidth:2,
    },
    workoutImageStyle: {
        width: '100%',
        height: 126.0,
        borderTopLeftRadius: Sizes.fixPadding - 2.0,
        borderTopRightRadius: Sizes.fixPadding - 2.0,
        resizeMode: 'stretch'
    },
    workoutDetailWrapStyle: {
        padding: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    workoutInfoWrapStyle: {
        marginBottom: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 2.0,
        elevation: 2.0,
    }
})