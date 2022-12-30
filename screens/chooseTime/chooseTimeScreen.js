import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles'
import { MaterialIcons } from '@expo/vector-icons';
import { Calendar } from "react-native-calendars";
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S',];

const morningTimes = [
    '9:00', '10:00', '11:00'
];

const eveningTimes = [
    '04.00', '05.00', '06.00', '07.00', '09.00', '10.00'
];

const ChooseTimeScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    function tr(key) {
        return t(`chooseTimeScreen:${key}`)
    }

    const isRtl = i18n.dir() == 'rtl';

    const monthsList = [t('calender:jan'), t('calender:feb'), t('calender:mar'), t('calender:apr'), t('calender:may'), t('calender:jun'), t('calender:jul'), t('calender:aug'), t('calender:sep'), t('calender:oct'), t('calender:nov'), t('calender:dec')];

    const [state, setState] = useState({
        defaultDate: new Date().getDate(),
        defaultMonth: new Date().getMonth(),
        defaultYear: new Date().getFullYear(),
        selectedDate: `${monthsList[new Date().getMonth()]} ${new Date().getFullYear()}`,
        showFullCalender: false,
        selectedIndex: 1,
        selectedMorningTime: '',
        selectedEveningTime: '',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { selectedEveningTime, selectedMorningTime, defaultDate, defaultMonth, defaultYear, showFullCalender, selectedIndex } = state;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}>
                    {dateInfo()}
                    {timeInfo()}
                </ScrollView>
                {confirmButton()}
            </View>
        </SafeAreaView>
    )

    function confirmButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => navigation.push('SelectPaymentMethod')}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    {tr('confirm')}
                </Text>
            </TouchableOpacity>
        )
    }

    function timeInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.5 }}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16Bold }}>
                    {tr('selectTime')}
                </Text>
                {morningTimesInfo()}
                {eveningInfo()}
            </View>
        )
    }

    function eveningInfo() {
        return (
            <View>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16Medium }}>
                    {tr('evening')}
                </Text>
                <View style={{ ...styles.timeInfoWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                    {
                        eveningTimes.map((item, index) => (
                            <TouchableOpacity
                                key={`${index}`}
                                activeOpacity={0.99}
                                onPress={() => updateState({ selectedEveningTime: item })}
                                style={{
                                    ...styles.timeWrapStyle,
                                    borderColor: selectedEveningTime == item ? Colors.primaryColor : Colors.grayColor,
                                    backgroundColor: selectedEveningTime == item ? Colors.primaryColor : Colors.whiteColor
                                }}
                            >
                                <Text style={selectedEveningTime == item ? { ...Fonts.whiteColor16Medium } : { ...Fonts.blackColor16Medium }}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }

    function morningTimesInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16Medium }}>
                    {tr('morning')}
                </Text>
                <View style={{ ...styles.timeInfoWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                    {
                        morningTimes.map((item, index) => (
                            <TouchableOpacity
                                key={`${index}`}
                                activeOpacity={0.99}
                                onPress={() => updateState({ selectedMorningTime: item })}
                                style={{
                                    ...styles.timeWrapStyle,
                                    borderColor: selectedMorningTime == item ? Colors.primaryColor : Colors.grayColor,
                                    backgroundColor: selectedMorningTime == item ? Colors.primaryColor : Colors.whiteColor
                                }}
                            >
                                <Text style={selectedMorningTime == item ? { ...Fonts.whiteColor16Medium } : { ...Fonts.blackColor16Medium }}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }

    function dateInfo() {
        return (
            <View>
                <Text style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16Bold }}>
                    {tr('selectDate')}
                </Text>
                {calendarInfo()}
            </View>
        )
    }

    function calendarInfo() {
        return (
            <View style={{
                ...styles.calendarWrapStyle,
                height: showFullCalender ? 380 : 150.0,
            }}>
                <Calendar
                    monthFormat={`${defaultDate} MMMM  yyyy`}
                    hideExtraDays={true}
                    disableMonthChange={true}
                    firstDay={0}
                    renderArrow={direction => direction == 'left'
                        ?
                        <MaterialIcons name="arrow-back-ios" color={Colors.blackColor} size={20} style={{ marginLeft: -Sizes.fixPadding, bottom: 40.0, }} />
                        :
                        <MaterialIcons name="arrow-forward-ios" color={defaultMonth == new Date().getMonth() ? Colors.grayColor : Colors.blackColor} size={20} style={{ right: 20.0, bottom: 40.0, }} />
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
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16,
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
                <Text style={date.day == defaultDate ? { ...Fonts.whiteColor18SemiBold } : { ...Fonts.grayColor18SemiBold }}>
                    {date.day}
                </Text>
            </TouchableOpacity>
        )
    }

    function upDownCalenderIcon() {
        return (
            <MaterialIcons
                name={showFullCalender ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={24}
                color="black"
                style={{ position: 'absolute', right: 15.0, top: 15.0, }}
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
                        style={{ width: 25.0, ...Fonts.blackColor18Bold, textAlign: 'center' }}
                    >
                        {item}
                    </Text>
                ))}
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

export default ChooseTimeScreen

const styles = StyleSheet.create({
    calenderSelectedDateStyle: {
        flex: 1,
        ...Fonts.blackColor18Bold,
        bottom: 30.0,
        left: -100.0,
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
        top: 50.0,
    },
    calendarWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding + 5.0,
        overflow: 'hidden'
    },
    timeWrapStyle: {
        marginHorizontal: Sizes.fixPadding,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
    },
    timeInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding,
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        margin: Sizes.fixPadding * 2.0,
    },
})