import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, Dimensions, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { Fonts, Colors, Sizes } from '../../constants/styles';
import * as Progress from 'react-native-progress';
import { BarChart,LineChart,  ProgressChart,
} from "react-native-chart-kit";
import { useTranslation } from 'react-i18next';
import { MaterialIcons, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BmiForm from '../../components/bmi/BmiForm';

import AnimatedProgressWheel from 'react-native-progress-wheel';

const { width } = Dimensions.get('window');
const data = {
    labels: ["Protein", "Fat", "Carb"], // optional
    data: [0.63, 0.30, 0.27]
  };
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
            icon: require('../../assets/images/icons/calorier.png'),
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
        backgroundGradientTo: Colors.whiteColor,
        backgroundGradientToOpacity: 0.5,
        fillShadowGradientFrom: Colors.lightPrimaryColor,
        fillShadowGradientFromOpacity: 0.35,
        fillShadowGradientTo: Colors.lightPrimaryColor,
        fillShadowGradientToOpacity: .35,

        color: (opacity = 1) => `rgba(63, 0, 208, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(200, 183, 183, ${opacity})`,

        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        decimalPlaces: 0,
        //propsForLabels: { ...Fonts.primaryColor14Regular },

        useShadowColorFromDataset: false // optional


      };
    const chartConfig1 = {
        backgroundGradientFrom: Colors.whiteColor,
        backgroundGradientTo: Colors.whiteColor,
        fillShadowGradientFrom: Colors.primaryColor,
        fillShadowGradientFromOpacity: 1,
        fillShadowGradientTo: Colors.primaryColor,
        fillShadowGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(63, 0, 208, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        barPercentage: 0.35,
        decimalPlaces: 0,
       // propsForLabels: { ...Fonts.grayColor14SemiBold },
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
                                dietInfo()
                                :
                                item == 2
                                    ?
                                    waterInfo()
                                :
                                    IBM()
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
    function IBM() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                
                    <BmiForm/>
                </ScrollView>
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
                        color={Colors.lightPrimaryColor}
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
                                <MaterialIcons name="remove" size={18} color={Colors.whiteColor} />
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
                {chartpro()}
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
            <View style={{ marginVertical:Sizes.fixPadding * 3.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    {tr('caloriesBurnTitle')}
                </Text>
                <View style={styles.chartInfoWrapStyle}>
                    <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'space-between' }}>
                        {dietChartDataCategoryShort({ category: tr('week'), index: 1, })}
                        {dietChartDataCategoryShort({ category: tr('month'), index: 2, })}
                    </View>
                    <LineChart
                        data={data}
                        width={width - 50}
                        height={200}
                        fromZero
                        withInnerLines={false}
                        chartConfig={chartConfig}
                        showBarTops={false}
                        color={Colors.lightPrimaryColor}
                    />
                    <Text numberOfLines={1} style={styles.chartYAxisLabelStyle}>
                        {tr('kcal')}
                    </Text>
                    <Text style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.grayColor14Medium }}>
                        {tr('daily')}
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
    
    function chartpro() {
        
            return (
                
                <ProgressChart
                    data={data}
                    width={width}
                    height={220}
                    strokeWidth={16}
                    radius={32}
                    chartConfig={chartConfig1}
                    hideLegend={false}
                  />

                  
            )
       
    }

    function nutritionInfo() {
        const renderItem = ({ item }) => {
            return (
<View style={{ ...styles.todayInfoWrapStyle,borderBottomWidth:1,
        borderColor:Colors.primaryColor ,borderRadius:10,backgroundColor:Colors.whiteColor, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <Image
                        source={item.icon}
                        style={{ width: 45.0, height: 45.0, resizeMode: "contain",borderWidth:0.2,
        borderColor:Colors.primaryColor ,borderRadius:10}}
                    />
                    <View style={{ marginHorizontal: Sizes.fixPadding + 5.0, flex: 1 }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                        {item.title}
     </Text>
                        <View style={{ ...styles.sessionStartTimeWrapStyle, alignSelf: isRtl ? 'flex-end' : 'flex-start', }}>
                            <Text style={{ ...Fonts.primaryColor14Regular }}>
                            {item.description}

                            </Text>
                        </View>
</View>
</View>

               
            )
        }
        return (
            <FlatList
                data={nutritionInfoList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding }}
            />
        )
    }

   

    function workoutDetail() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {caloriesEquipmentAndDurationInfo()}
                {caloriesChartInfo()}
            </ScrollView>
        )
    }

    function caloriesChartInfo() {
        const data = {
            labels: ["S", "M", "T", "W", "T", "F", "S"],
            datasets: [
                {
                    data: [420, 600, 800, 1200, 1000, 100,1000]
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
                        {caloriesChartDataCategoryShort({ category: tr('week'), index: 1, })}
                        {caloriesChartDataCategoryShort({ category: tr('month'), index: 2, })}
                    </View>
                    <LineChart
                        data={data}
                        width={width - 50}
                        height={200}
                        fromZero
                        withInnerLines={false}
                        chartConfig={chartConfig}
                        showBarTops={false}
                        color={Colors.lightPrimaryColor}
                    />
                    <Text style={styles.chartYAxisLabelStyle}>
                        {tr('kcal')}
                    </Text>
                    <Text style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.grayColor14Medium }}>
                    {tr('week')  }                  </Text>
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



    

    function tabs() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding, marginTop: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                {tabShort({ tabTitle: tr('workout'), index: 0, })}
                {tabShort({ tabTitle: tr('diet'), index: 1, })}
                {tabShort({ tabTitle: tr('water'), index: 2, })}
                {tabShort({ tabTitle: 'Check IBM' ,index: 3, })}

            </View>
        )
    }

    function tabShort({ tabTitle, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => { scrollToIndex({ index: index }) }}
                style={{ flex: 1, alignItems: 'center',borderBottomWidth:1,borderBottomColor:Colors.primaryColor }}
            >
                <Text numberOfLines={1} style={{ marginBottom: Sizes.fixPadding, ...selectedTabIndex == index ? { ...Fonts.whiteColor18SemiBold ,backgroundColor:Colors.primaryColor} : { ...Fonts.primaryColor16Medium} }}>
                      {tabTitle}   
                </Text>
            </TouchableOpacity>
        )
    }

    function progressInfo() {
        return (
            <View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <AnimatedProgressWheel
    progress={65}
    animateFromValue={0}
    duration={5000}
    color={Colors.lightPrimaryColor}
    fullColor={Colors.primary4}
    backgroundColor={Colors.DEFAULT_WHITE}
/>
                    
                    <Image
                        source={
                           
                                require('../../assets/images/icons/act1.png')
                        }
                        style={{ width: 60.0, height: 60.0, resizeMode: 'contain', position: 'absolute' }}
                    />
                </View>
                <Text style={{ textAlign: 'center', marginTop: Sizes.fixPadding, ...Fonts.primaryColor18SemiBold,color:Colors.lightPrimaryColor }}>
                    65% Of daily goal
                </Text>
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
                <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
Burn calorier                </Text>
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
                        900
                    </Text>
                </View>
            </View>
        )
    }
    function durationInfo() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
                   Net duration
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
                <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
 Workout </Text>
                <View style={{ marginTop: Sizes.fixPadding - 5.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <MaterialIcons name="fitness-center" size={18} color={Colors.primaryColor} />
                    <Text numberOfLines={1}
                        style={{
                            marginLeft: isRtl ? 0.0 : Sizes.fixPadding - 5.0,
                            marginRight: isRtl ? Sizes.fixPadding - 5.0 : 0.0,
                            ...Fonts.primaryColor14Medium
                        }}
                    >
                        15
                    </Text>
                </View>
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
        left: -40.0,
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
        backgroundColor: Colors.SECONDARY_WHITE,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding +5.0,
        justifyContent: 'center',
        borderColor: Colors.lightGrayColor,
        borderBottomWidth: 1.0,
        paddingVertical: Sizes.fixPadding ,
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
    todayInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 7.0
    },
    waterChartYLabelStyle: {
        position: 'absolute',
        alignSelf: 'flex-start',
        left: -95.0,
        width: '60%',
        transform: [{ rotate: '-90deg' }],
    }
})