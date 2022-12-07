import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, Dimensions, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { Fonts, Colors, Sizes } from '../../constants/styles';
import * as Progress from 'react-native-progress';
import { BarChart,LineChart } from "react-native-chart-kit";
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import AnimatedProgressWheel from 'react-native-progress-wheel';

const { width } = Dimensions.get('window');

const InsightScreen = () => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`insightScreen:${key}`)
    }

    const sleepingInfoList = [
        {
            id: '1',
            icon: require('../../assets/images/icons/clock.png'),
            title: tr('sleepDuration'),
            description: `7 hr 30 min`,
        },
        {
            id: '2',
            icon: require('../../assets/images/icons/sleep.png'),
            title: tr('deep'),
            description: `50 min`,
        },
        {
            id: '3',
            icon: require('../../assets/images/icons/clock.png'),
            title: tr('awake'),
            description: `7 hr 30 min`,
        },
        {
            id: '4',
            icon: require('../../assets/images/icons/bulb.png'),
            title: tr('deep'),
            description: `50 min`,
        },
    ];

    const nutritionInfoList = [
        {
            id: '1',
            icon: require('../../assets/images/icons/caloriesOutline.png'),
            title: tr('calories'),
            description: '560',
        },
        {
            id: '2',
            icon: require('../../assets/images/icons/protein.png'),
            title: tr('protein'),
            description: '150',
        },
        {
            id: '3',
            icon: require('../../assets/images/icons/fat.png'),
            title: tr('fat'),
            description: '180',
        },
        {
            id: '3',
            icon: require('../../assets/images/icons/carb.png'),
            title: tr('carb'),
            description: '560',
        },
    ];
    const chartConfig = {
        backgroundGradientFrom: Colors.whiteColor,
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: Colors.primary4,
        backgroundGradientToOpacity: 0.5,
        fillShadowGradientFrom: Colors.primaryColor,
        fillShadowGradientFromOpacity: 0.5,
        fillShadowGradientTo: Colors.primaryColor,
        fillShadowGradientToOpacity: .35,

        color: (opacity = 1) => `rgba(0, 20, 58, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(183, 183, 183, ${opacity})`,

        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        decimalPlaces: 0,
        propsForLabels: { ...Fonts.grayColor14SemiBold },

        useShadowColorFromDataset: false // optional


      };
    const chartConfig1 = {
        backgroundGradientFrom: Colors.whiteColor,
        backgroundGradientTo: Colors.whiteColor,
        fillShadowGradientFrom: Colors.primaryColor,
        fillShadowGradientFromOpacity: 1,
        fillShadowGradientTo: Colors.primaryColor,
        fillShadowGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(0, 86, 98, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(183, 183, 183, ${opacity})`,
        barPercentage: 0.35,
        decimalPlaces: 0,
        propsForLabels: { ...Fonts.grayColor14SemiBold },
    };

    const [state, setState] = useState({
        selectedTabIndex: 0,
        selectedCaloriesChartIndex: 1,
        selectedSleepChartIndex: 2,
        selecteddietChartIndex: 1,
        selectedWaterChartIndex: 2,
        userDrunk: 2000,
    })

    const { selectedTabIndex, selectedCaloriesChartIndex, selectedSleepChartIndex, selecteddietChartIndex, selectedWaterChartIndex, userDrunk } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const listRef = useRef();

    const scrollToIndex = ({ index }) => {
        listRef.current.scrollToIndex({ index: index });
        updateState({ selectedTabIndex: index })
    }

    const targetDrunk = 3000;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {progressInfo()}
                {tabs()}
                {tabDetail()}
            </View>
        </SafeAreaView>
    )

    function tabDetail() {

        function onScrollEnd(e) {
            let contentOffset = e.nativeEvent.contentOffset;
            let viewSize = e.nativeEvent.layoutMeasurement;
            let pageNum = Math.floor(contentOffset.x / viewSize.width);
            updateState({ selectedTabIndex: pageNum });
        }

        const renderItem = ({ item }) => {
            return (
                <View style={{ width: width, flex: 1, }}>
                    {
                        item == 0
                            ?
                            workoutDetail()
                            :
                            item == 1
                                ?
                                sleepInfo()
                                :
                                item == 2
                                    ?
                                    dietInfo()
                                    :
                                    waterInfo()
                    }
                </View>
            )
        }
        return (
            <FlatList
                data={[0, 1, 2, 3]}
                ref={listRef}
                initialScrollIndex={selectedTabIndex}
                keyExtractor={(item) => `${item}`}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={32}
                pagingEnabled
                onMomentumScrollEnd={onScrollEnd}
                scrollEnabled={false}
            />
        )
    }

    function waterInfo() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {drunkAndTargetInfo()}
                {waterChartInfo()}
            </ScrollView>
        )
    }

    function waterChartInfo() {
        const data = {
            labels: ["S", "M", "T", "W", "T", "F", "S"],
            datasets: [
                {
                    data: [500, 700, 900, 1200, 1100, 850]
                }
            ]
        };
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    {tr('waterConsume')}
                </Text>
                <View style={{ ...styles.chartInfoWrapStyle, paddingBottom: Sizes.fixPadding, }}>
                    <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'space-between' }}>
                        {waterChartDataCategoryShort({ category: tr('daily'), index: 1, })}
                        {waterChartDataCategoryShort({ category: tr('week'), index: 2, })}
                        {waterChartDataCategoryShort({ category: tr('month'), index: 3, })}
                    </View>
                    <LineChart
                        data={data}
                        width={width - 50}
                        height={200}
                        fromZero
                        withInnerLines={false}
                        chartConfig={chartConfig}
                        showBarTops={false}
                        color={Colors.primaryColor}
                    />
                    <Text numberOfLines={1} style={{ ...styles.waterChartYLabelStyle, ...Fonts.grayColor14Medium }}>
                        {tr('waterConsumpation')}
                    </Text>
                </View>
            </View>
        )
    }

    function waterChartDataCategoryShort({ category, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => {
                    updateState({ selectedWaterChartIndex: index })
                }}
                style={{
                    backgroundColor: index == selectedWaterChartIndex ? Colors.primaryColor : Colors.whiteColor,
                    ...styles.chartDataCategoryWrapStyle,
                }}
            >
                <Text style={index == selectedWaterChartIndex ? { ...Fonts.whiteColor14SemiBold } : { ...Fonts.grayColor14SemiBold }}>
                    {category}
                </Text>
            </TouchableOpacity>
        )
    }

    function drunkAndTargetInfo() {
        return (
            <View style={{ ...styles.woakupAndSleepDrunkAndTargetInfoWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <View style={styles.infoHookStyle} />
                <View style={{ ...styles.woakupAndSleepDrunkAndTargetDetailWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <View style={{ flex: 0.7, alignItems: 'center' }}>
                        <View>
                            <View style={{ marginBottom: Sizes.fixPadding * 2.0, }}>
                                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                                    {tr('drunk')}
                                </Text>
                                <Text style={{ ...Fonts.grayColor14Medium }}>
                                    {userDrunk}ml
                                </Text>
                            </View>
                            <View>
                                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                    {tr('target')}
                                </Text>
                                <Text style={{ ...Fonts.grayColor14Medium }}>
                                    {targetDrunk}ml
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: 2.0, backgroundColor: Colors.lightGrayColor }} />
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center', marginBottom: Sizes.fixPadding * 2.0, }}>
                            <TouchableOpacity
                                activeOpacity={0.99}
                                onPress={() => userDrunk !== 0 ? updateState({ userDrunk: userDrunk - 100 }) : null}
                                style={{ ...styles.addAndRemoveButtonWrapStyle, backgroundColor: Colors.lightGrayColor, }}
                            >
                                <MaterialIcons name="remove" size={18} color={Colors.grayColor} />
                            </TouchableOpacity>
                            <Image
                                source={require('../../assets/images/icons/glass.png')}
                                style={styles.glassImageStyle}
                            />
                            <TouchableOpacity
                                activeOpacity={0.99}
                                onPress={() => { userDrunk < targetDrunk ? updateState({ userDrunk: userDrunk + 100 }) : null }}
                                style={{ ...styles.addAndRemoveButtonWrapStyle, backgroundColor: Colors.primaryColor, }}
                            >
                                <MaterialIcons name="add" size={18} color={Colors.whiteColor} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.addDrinkButtonStyle}>
                            <Text style={{ textAlign: 'center', ...Fonts.whiteColor16SemiBold }}>
                                {tr('addDrink')}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    function dietInfo() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {dietCaloriesInfo()}
                {nutritionInfo()}
                {dietChartInfo()}
            </ScrollView>
        )
    }

    function dietChartInfo() {
        const data = {
            labels: ["10", "20", "30", "40", "50", "60"],
            datasets: [
                {
                    data: [420, 600, 800, 1200, 1000, 700]
                }
            ]
        };
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    {tr('caloriesBurnTitle')}
                </Text>
                <View style={styles.chartInfoWrapStyle}>
                    <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'space-between' }}>
                        {dietChartDataCategoryShort({ category: tr('daily'), index: 1, })}
                        {dietChartDataCategoryShort({ category: tr('week'), index: 2, })}
                        {dietChartDataCategoryShort({ category: tr('month'), index: 3, })}
                    </View>
                    <BarChart
                        data={data}
                        width={width - 50}
                        height={200}
                        fromZero
                        withInnerLines={false}
                        chartConfig={chartConfig}
                        showBarTops={false}
                    />
                    <Text numberOfLines={1} style={styles.chartYAxisLabelStyle}>
                        {tr('kcal')}
                    </Text>
                    <Text style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.grayColor14Medium }}>
                        {tr('minute')}
                    </Text>
                </View>
            </View>
        )
    }

    function dietChartDataCategoryShort({ category, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => { updateState({ selecteddietChartIndex: index }) }}
                style={{
                    backgroundColor: index == selecteddietChartIndex ? Colors.primaryColor : Colors.whiteColor,
                    ...styles.chartDataCategoryWrapStyle,
                }}
            >
                <Text style={index == selecteddietChartIndex ? { ...Fonts.whiteColor14SemiBold } : { ...Fonts.grayColor14SemiBold }}>
                    {category}
                </Text>
            </TouchableOpacity>
        )
    }

    function nutritionInfo() {
        const renderItem = ({ item }) => {
            return (
                <View style={styles.nutritionAndSleepingInfoBoxStyle}>
                    <Image
                        source={item.icon}
                        style={{ width: 60.0, height: 60.0, resizeMode: 'contain', }}
                    />
                    <Text style={{ marginTop: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.blackColor16Medium }}>
                        {item.title}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.primaryColor18SemiBold }}>
                        {item.description}
                    </Text>
                </View>
            )
        }
        return (
            <FlatList
                data={nutritionInfoList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding }}
            />
        )
    }

    function dietCaloriesInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, marginBottom: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('calories')}
                </Text>
                <View style={{ marginHorizontal: Sizes.fixPadding, marginTop: Sizes.fixPadding, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                    {caloriesShort({ digitsCalculation: 700, category: tr('burn'), bgColor: '#FAE3E1' })}
                    {caloriesShort({ digitsCalculation: 1300, category: tr('target'), bgColor: '#E4E5E7' })}
                    {caloriesShort({ digitsCalculation: 1300 - 700, category: tr('left'), bgColor: '#F5DADE' })}
                </View>
            </View>
        )
    }

    function sleepInfo() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {woakupAndSleepInfo()}
                {sleepingDetail()}
                {sleepStatisticsInfo()}
            </ScrollView>
        )
    }

    function sleepStatisticsInfo() {
        const data = {
            labels: ["S", "M", "T", "W", "T", "F", "S"],
            datasets: [
                {
                    data: [10, 14, 17, 25, 22, 15, 18]
                }
            ]
        };
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    {tr('sleepSatatistics')}
                </Text>
                <View style={{ ...styles.chartInfoWrapStyle, overflow: 'hidden', paddingBottom: Sizes.fixPadding + 5.0 }}>
                    <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'space-between' }}>
                        {sleepChartDataCategoryShort({ category: tr('daily'), index: 1, })}
                        {sleepChartDataCategoryShort({ category: tr('week'), index: 2, })}
                        {sleepChartDataCategoryShort({ category: tr('month'), index: 3, })}
                    </View>
                    <BarChart
                        data={data}
                        width={width - 50}
                        height={200}
                        fromZero
                        withInnerLines={false}
                        chartConfig={chartConfig}
                        showBarTops={false}
                        style={{ marginLeft: -Sizes.fixPadding * 2.5, }}
                        yAxisSuffix='hr'
                        verticalLabelRotation={30}

                    />
                </View>
            </View>
        )
    }

    function sleepChartDataCategoryShort({ category, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => { updateState({ selectedSleepChartIndex: index }) }}
                style={{
                    backgroundColor: index == selectedSleepChartIndex ? Colors.primaryColor : Colors.whiteColor,
                    ...styles.chartDataCategoryWrapStyle,
                }}
            >
                <Text style={index == selectedSleepChartIndex ? { ...Fonts.whiteColor14SemiBold } : { ...Fonts.grayColor14SemiBold }}>
                    {category}
                </Text>
            </TouchableOpacity>
        )
    }

    function sleepingDetail() {
        const renderItem = ({ item }) => {
            return (
                <View style={styles.nutritionAndSleepingInfoBoxStyle}>
                    <Image
                        source={item.icon}
                        style={{ width: 60.0, height: 60.0, resizeMode: 'contain', }}
                    />
                    <Text style={{ marginTop: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.blackColor16Medium }}>
                        {item.title}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.primaryColor18SemiBold }}>
                        {item.description}
                    </Text>
                </View>
            )
        }
        return (
            <FlatList
                data={sleepingInfoList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding }}
            />
        )
    }

    function woakupAndSleepInfo() {
        return (
            <View style={styles.woakupAndSleepDrunkAndTargetInfoWrapStyle}>
                <View style={styles.infoHookStyle} />
                <View style={{ ...styles.woakupAndSleepDrunkAndTargetDetailWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View>
                            <View style={{ marginBottom: Sizes.fixPadding * 2.0, }}>
                                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                                    {tr('woakUp')}
                                </Text>
                                <Text style={{ ...Fonts.grayColor14Medium }}>
                                    7.30 am
                                </Text>
                            </View>
                            <View>
                                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                    {tr('wentToSleep')}
                                </Text>
                                <Text style={{ ...Fonts.grayColor14Medium }}>
                                    11.30 pm
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: 2.0, backgroundColor: Colors.lightGrayColor }} />
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ alignItems: 'center', marginBottom: Sizes.fixPadding * 2.0, }}>
                            <Text style={{ ...Fonts.blackColor16SemiBold }}>
                                37%
                            </Text>
                            <Text style={{ ...Fonts.blackColor14Medium }}>
                                {tr('reduced')}
                            </Text>
                        </View>
                        <Text style={{ textAlign: 'center', marginHorizontal: Sizes.fixPadding, ...Fonts.grayColor14Medium }}>
                            {tr('sleepTimeCompare')}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function workoutDetail() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {caloriesInfo()}
                {totalWorkoutAndDurationInfo()}
                {caloriesChartInfo()}
            </ScrollView>
        )
    }

    function caloriesChartInfo() {
        const data = {
            labels: ["10", "20", "30", "40", "50", "60"],
            datasets: [
                {
                    data: [420, 600, 800, 1200, 1000, 700]
                }
            ]
        };
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    {tr('caloriesBurnTitle')}
                </Text>
                <View style={styles.chartInfoWrapStyle}>
                    <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'space-between' }}>
                        {caloriesChartDataCategoryShort({ category: tr('daily'), index: 1, })}
                        {caloriesChartDataCategoryShort({ category: tr('week'), index: 2, })}
                        {caloriesChartDataCategoryShort({ category: tr('month'), index: 3, })}
                    </View>
                    <BarChart
                        data={data}
                        width={width - 50}
                        height={200}
                        fromZero
                        withInnerLines={false}
                        chartConfig={chartConfig}
                        showBarTops={false}
                    />
                    <Text style={styles.chartYAxisLabelStyle}>
                        {tr('kcal')}
                    </Text>
                    <Text style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.grayColor14Medium }}>
                        {tr('minute')}
                    </Text>
                </View>
            </View>
        )
    }

    function caloriesChartDataCategoryShort({ category, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => { updateState({ selectedCaloriesChartIndex: index }) }}
                style={{
                    backgroundColor: index == selectedCaloriesChartIndex ? Colors.primaryColor : Colors.whiteColor,
                    ...styles.chartDataCategoryWrapStyle,
                }}
            >
                <Text style={index == selectedCaloriesChartIndex ? { ...Fonts.whiteColor14SemiBold } : { ...Fonts.grayColor14SemiBold }}>
                    {category}
                </Text>
            </TouchableOpacity>
        )
    }

    function totalWorkoutAndDurationInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                {workoutAndDurationShort({
                    icon: require('../../assets/images/icons/women.png'),
                    title: tr('totalWorkout'),
                    description: '15',
                })}
                {workoutAndDurationShort({
                    icon: require('../../assets/images/icons/clock.png'),
                    title: tr('netDuration'),
                    description: `50 min`,
                })}
            </View>
        )
    }

    function workoutAndDurationShort({ icon, title, description }) {
        return (
            <View style={styles.workoutAndDurationInfoWrapStyle}>
                <Image
                    source={icon}
                    style={{ width: 60.0, height: 60.0, resizeMode: 'contain' }}
                />
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, marginTop: Sizes.fixPadding + 10.0, ...Fonts.blackColor16Medium }}>
                    {title}
                </Text>
                <Text style={{ ...Fonts.primaryColor18SemiBold }}>
                    {description}
                </Text>
            </View>
        )
    }

    function caloriesInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, marginBottom: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('calories')}
                </Text>
                <View style={{ marginHorizontal: Sizes.fixPadding, marginTop: Sizes.fixPadding, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                    {caloriesShort({ digitsCalculation: 900, category: tr('burn'), bgColor: '#FAE3E1' })}
                    {caloriesShort({ digitsCalculation: 1300, category: tr('target'), bgColor: '#E4E5E7' })}
                    {caloriesShort({ digitsCalculation: 1300 - 900, category: tr('left'), bgColor: '#F5DADE' })}
                </View>
            </View>
        )
    }

    function caloriesShort({ digitsCalculation, category, bgColor }) {
        return (
            <View style={{ backgroundColor: bgColor, ...styles.caloriesInfoWrapStyle, }}>
                <Text style={bgColor == '#F5DADE' ? { ...Fonts.primaryColor18SemiBold } : { ...Fonts.grayColor18SemiBold }}>
                    {digitsCalculation}
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.blackColor14SemiBold }}>
                    {category}
                </Text>
            </View>
        )
    }

    function tabs() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding, marginTop: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                {tabShort({ tabTitle: tr('workout'), index: 0, })}
                {tabShort({ tabTitle: tr('sleep'), index: 1, })}
                {tabShort({ tabTitle: tr('diet'), index: 2, })}
                {tabShort({ tabTitle: tr('water'), index: 3, })}
            </View>
        )
    }

    function tabShort({ tabTitle, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => { scrollToIndex({ index: index }) }}
                style={{ flex: 1, alignItems: 'center' }}
            >
                <Text numberOfLines={1} style={{ marginBottom: Sizes.fixPadding, ...selectedTabIndex == index ? { ...Fonts.primaryColor16SemiBold } : { ...Fonts.blackColor16Medium } }}>
                    {tabTitle}
                </Text>
                <View style={{ width: '100%', backgroundColor: selectedTabIndex == index ? Colors.primaryColor : Colors.DEFAULT_BLACK, height: 2.0 }} />
            </TouchableOpacity>
        )
    }

    function progressInfo() {
        return (
            <View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <AnimatedProgressWheel
    progress={65}
    animateFromValue={50}
    duration={5000}
    color={Colors.lightPrimaryColor}
    fullColor={Colors.primary4}
    backgroundColor={Colors.DEFAULT_WHITE}
/>
                    
                    <Image
                        source={
                            selectedTabIndex == 0 ?
                                require('../../assets/images/icons/dumbell.png')
                                :
                                selectedTabIndex == 1
                                    ?
                                    require('../../assets/images/icons/moon.png')
                                    :
                                    selectedTabIndex == 2
                                        ?
                                        require('../../assets/images/icons/diet.png')
                                        :
                                        require('../../assets/images/icons/water.png')
                        }
                        style={{ width: 60.0, height: 60.0, resizeMode: 'contain', position: 'absolute' }}
                    />
                </View>
                <Text style={{ textAlign: 'center', marginTop: Sizes.fixPadding, ...Fonts.primaryColor24SemiBold }}>
                    65%
                </Text>
            </View>

        )
    }

    function header() {
        return (
            <Text style={{ textAlign: 'center', margin: Sizes.fixPadding * 2.0, ...Fonts.blackColor18SemiBold }}>
                {tr('header')}
            </Text>
        )
    }
}

export default InsightScreen

const styles = StyleSheet.create({
    caloriesInfoWrapStyle: {
        borderRadius: Sizes.fixPadding - 2.0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding,
        elevation: 1.5,
    },
    workoutAndDurationInfoWrapStyle: {
        paddingVertical: Sizes.fixPadding * 2.0,
        flex: 1,
        backgroundColor: Colors.whiteColor,
        elevation: 1.5,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        borderBottomWidth: 0.0,
    },
    chartYAxisLabelStyle: {
        position: 'absolute',
        alignSelf: 'flex-start',
        width: '30%',
        left: -30.0,
        transform: [{ rotate: '-90deg' }],
        marginBottom: Sizes.fixPadding * 2.0,
        textAlign: 'center',
        ...Fonts.grayColor14Medium
    },
    chartInfoWrapStyle: {
        elevation: 1.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        borderBottomWidth: 0.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    chartDataCategoryWrapStyle: {
        flex: 1,
        borderRadius: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding - 3.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    woakupAndSleepDrunkAndTargetInfoWrapStyle: {
        justifyContent: 'space-between',
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        borderBottomWidth: 0.0,
        borderLeftWidth: 0.0,
    },
    infoHookStyle: {
        borderBottomLeftRadius: Sizes.fixPadding - 2.0,
        borderTopLeftRadius: Sizes.fixPadding - 2.0,
        width: 8.0,
        backgroundColor: Colors.primaryColor
    },
    woakupAndSleepDrunkAndTargetDetailWrapStyle: {
        marginVertical: Sizes.fixPadding * 2.0,
        justifyContent: 'space-between',
        flex: 1,
    },
    nutritionAndSleepingInfoBoxStyle: {
        flex: 1,
        marginHorizontal: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Sizes.fixPadding * 2.0,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        borderBottomWidth: 0.0,
        paddingVertical: Sizes.fixPadding * 2.0,
    },
    addAndRemoveButtonWrapStyle: {
        width: 21.0,
        height: 21.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addDrinkButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 3.0,
        width: '70%',
    },
    glassImageStyle: {
        marginHorizontal: Sizes.fixPadding + 5.0,
        width: 45.0,
        height: 45.0,
        resizeMode: 'contain'
    },
    waterChartYLabelStyle: {
        position: 'absolute',
        alignSelf: 'flex-start',
        left: -80.0,
        width: '60%',
        transform: [{ rotate: '-90deg' }],
    }
})