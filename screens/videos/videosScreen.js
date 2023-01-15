import { StyleSheet, Text,ImageBackground, View, SafeAreaView, StatusBar, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons ,Ionicons} from '@expo/vector-icons';
import { Calendar } from "react-native-calendars";
import { useTranslation } from 'react-i18next';
import { SimpleLineIcons } from '@expo/vector-icons';

const { width,height } = Dimensions.get('window');

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',];

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

const VideosScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`videosScreen:${key}`)
    }

    const monthsList = [t('calender:jan'), t('calender:feb'), t('calender:mar'), t('calender:apr'), t('calender:may'), t('calender:jun'), t('calender:jul'), t('calender:aug'), t('calender:sep'), t('calender:oct'), t('calender:nov'), t('calender:dec')];

    const [state, setState] = useState({
        defaultDate: new Date().getDate(),
        defaultMonth: new Date().getMonth(),
        defaultYear: new Date().getFullYear(),
        showFullCalender: false,
        selectedIndex: 1,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { defaultDate, defaultMonth, defaultYear, showFullCalender, selectedIndex } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                {calendarInfo()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {proteinFatAndCaloriesInfo()}
                            {videoinfo()}
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )

    function workoutInfo() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => navigation.push('UserProgram')}
                    style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}
                >
                    <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16SemiBold }}>
                        {item.workoutType}
                    </Text>
                    {
                        item.workouts.map((item) => (
                            <View
                                key={`${item.id}`}
                                style={styles.workoutInfoWrapStyle}
                            >
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        source={item.workoutImage}
                                        style={styles.workoutImageStyle}
                                    />
                                    <MaterialIcons
                                        name="play-arrow"
                                        size={40}
                                        color={Colors.whiteColor}
                                        style={{ position: 'absolute' }}
                                    />
                                </View>
                                <View style={{ ...styles.workoutDetailWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                                    <Text style={{ flex: 1, ...Fonts.blackColor14Regular }}>
                                        {item.workoutName}
                                    </Text>
                                    <Text style={{ ...Fonts.blackColor14Regular }}>
                                        {item.workoutTime}
                                    </Text>
                                </View>
                            </View>
                        ))
                    }
                </TouchableOpacity>
            )
        }
        return (
            <FlatList
                data={workouts}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                scrollEnabled={false}
            />
        )
    }

    function selectedDayAndWorkoutsInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    {defaultDate} {monthsList[defaultMonth]}
                </Text>
                <Text style={{ ...Fonts.grayColor16Regular }}>
                    Today you have  5 workout.
                </Text>
            </View>
        )
    }

    function calendarInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, flex: showFullCalender ? 1 : 0, zIndex: showFullCalender ? 1 : 0, }}>
                <View style={{
                    ...styles.calendarWrapStyle,
                    height: showFullCalender ? 330 : 130.0,
                }}>
                    <Calendar
                        monthFormat={`${defaultDate} MMMM  yyyy`}
                        hideExtraDays={true}
                        disableMonthChange={true}
                        firstDay={defaultDate}
                        renderArrow={direction => direction == 'left'
                            ?
                            <MaterialIcons name="arrow-back-ios" color={Colors.primaryColor} size={20} style={{ marginLeft: -Sizes.fixPadding, bottom: 40.0, }} />
                            :
                            <MaterialIcons name="arrow-forward-ios" color={defaultMonth == new Date().getMonth() ? Colors.blackColor : Colors.primaryColor} size={20} style={{ right: 20.0, bottom: 40.0, }} />
                        }
                        renderHeader={date => {
                            return (
                                <Text numberOfLines={1} style={{ ...styles.calenderSelectedDateStyle, maxWidth: width / 2.0 }}>
                                    {defaultDate} {monthsList[defaultMonth]} {defaultYear}
                                </Text>
                            )
                        }}

                        dayComponent={({ date, state }) => { return dayComponent({ date, state }) }}
                        theme={{
                            calendarBackground: 'transparent',
                            textSectionTitleColor: Colors.blackColor,
                            textMonthFontFamily: 'Montserrat_Regular',
                            textDayHeaderFontFamily: 'Montserrat_Medium',
                            textMonthFontSize: 14,
                            textDayHeaderFontSize: 14,
                        }}
                        hideDayNames={true}
                        onPressArrowLeft={subtractMonth => {
                            subtractMonth()
                            updateState({ defaultMonth: defaultMonth - 1 })
                        }}
                        onPressArrowRight={addMonth => {
                            if (defaultMonth !== new Date().getMonth()) {
                                addMonth()
                                updateState({ defaultMonth: defaultMonth + 1 })
                            }
                        }}
                        enableSwipeMonths={true}
                        style={{ borderRadius: Sizes.fixPadding + 5.0, paddingTop: Sizes.fixPadding * 4.0, }}
                    />
{upDownCalenderIcon()}
                    {calendarDays()}
                </View>
            </View>
        )
    }

    function dayComponent({ date, state }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    updateState({
                        selectedDate: `${monthsList[date.month - 1]} ${date.year}`,
                        defaultDate: date.day,
                        defaultMonth: date.month - 1
                    })
                }}
                style={{
                    ...styles.dayWrapStyle,
                    backgroundColor: date.day == defaultDate ? Colors.primaryColor : Colors.whiteColor
                }}
            >
                <Text style={date.day == defaultDate ? { ...Fonts.whiteColor16Bold } : { ...Fonts.blackColor14Medium }}>
                    {date.day}
                </Text>
            </TouchableOpacity>
        )
    }

    function upDownCalenderIcon() {
        return (
            <MaterialIcons
                name={showFullCalender ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={35}
                color={Colors.DEFAULT_YELLOW}
                style={{ position: 'absolute', right: 10.0, top: 17.0, }}
                onPress={() => updateState({ showFullCalender: !showFullCalender })}
            />
        )
    }

    function calendarDays() {
        return (
            <View style={{ ...styles.dayNameWrapStyle }}>
                {dayNames.map((item, index) => (
                    <Text
                        key={`${index}`}
                        style={{ width: 35.0, ...Fonts.primaryColor14Medium, textAlign: 'center' }}
                    >
                        {item}
                    </Text>
                ))}
            </View>
        )
    }
    function proteinFatAndCaloriesInfo() {
        return (
            <View style={{ ...styles.proteinFatAndCaloriesInfoWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                {proteinFatCaloriesShort({ value: '6', type: 'Exercises'})}
                <View style={{ backgroundColor: Colors.lightPrimaryColor, width: 1.0, }} />
                {proteinFatCaloriesShort({ value: '15', type: 'Time/min' })}
                <View style={{ backgroundColor: Colors.lightPrimaryColor, width: 1.0, }} />
                {proteinFatCaloriesShort({ value: '250', type: 'Calories' })}
            </View>
        )
    }

    function proteinFatCaloriesShort({ value, type }) {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ ...Fonts.primaryColor16Medium }}>
                    {value}
                </Text>
                <Text style={{ ...Fonts.blackColor14Bold }}>
                    {type}
                </Text>
            </View>
        )
    }
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
<Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.primaryColor14SemiBold }}>
                        {item.workoutType}
                    </Text>
        
                       
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

export default VideosScreen;

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