import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, ImageBackground, Dimensions, TouchableOpacity, } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import BottomSheet from 'react-native-simple-bottom-sheet';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');

const mealCategories = [
    {
        id: '1',
        foodImage: require('../../assets/images/food/food2.jpg'),
        mealCategory: "Breakfast",
        foodName: "Poteto pancakes",
        eatTime: '8.00 AM',
    },
    {
        id: '2',
        foodImage: require('../../assets/images/food/food4.jpg'),
        mealCategory: "Lunch",
        foodName: "Vegan Gravy",
        eatTime: '12.00 PM',
    },
    {
        id: '3',
        foodImage: require('../../assets/images/food/food5.png'),
        mealCategory: "Snacks",
        foodName: "Rosted vegan pasta",
        eatTime: '5.00 PM',
    },
    {
        id: '4',
        foodImage: require('../../assets/images/food/food6.png'),
        mealCategory: "Dinner",
        foodName: "Vegan tacos",
        eatTime: '8.00 PM',
    },
    {
        id: '5',
        foodImage: require('../../assets/images/food/food7.png'),
        mealCategory: "Dinner side",
        foodName: "Salad",
        eatTime: '8.00 PM',
    },
];

const DietDetailScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    function tr(key) {
        return t(`dietDetailScreen:${key}`)
    }

    const isRtl = i18n.dir() == 'rtl';

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {dietImageWithBackArrow()}
                {dietDetail()}
            </View>
        </SafeAreaView>
    )

    function dietDetail() {
        return (
            <BottomSheet
                isOpen={false}
                sliderMinHeight={height - (height / 2.5)}
                sliderMaxHeight={height - 90.0}
                wrapperStyle={{ paddingHorizontal: 0.0, elevation: 0.0 }}
                lineStyle={{ width: 0.0, height: 0.0, }}
                lineContainerStyle={{ width: 0.0, height: 0.0, }}
            >
                {(onScrollEndDrag) => (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        onScrollEndDrag={onScrollEndDrag}
                        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}
                    >
                        {dayInfo()}
                        {proteinFatAndCaloriesInfo()}
                        {mealCategoriesInfo()}
                    </ScrollView>
                )}
            </BottomSheet>
        )
    }

    function mealCategoriesInfo() {
        return (
            mealCategories.map((item) => (
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => navigation.push('MealCategoryVideo')}
                    key={`${item.id}`}
                    style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}
                >
                    <ImageBackground
                        source={item.foodImage}
                        style={{ width: width / 3.0, height: width / 3.0, marginBottom: Sizes.fixPadding * 2.0, }}
                        borderRadius={Sizes.fixPadding - 2.0}
                    >
                        <View style={styles.mealCategoryImageCoverStyle}>
                            <MaterialIcons name="play-arrow" size={35} color={Colors.whiteColor} />
                        </View>
                    </ImageBackground>
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                            {item.mealCategory}
                        </Text>
                        <Text style={{ marginVertical: Sizes.fixPadding - 5.0, ...Fonts.blackColor16Regular }}>
                            {item.foodName}
                        </Text>
                        <Text style={{ ...Fonts.grayColor16Regular }}>
                            {item.eatTime}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))
        )
    }

    function proteinFatAndCaloriesInfo() {
        return (
            <View style={{ ...styles.proteinFatAndCaloriesInfoWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                {proteinFatCaloriesShort({ value: '500', type: tr('protein') })}
                <View style={{ backgroundColor: Colors.lightPrimaryColor, width: 1.0, }} />
                {proteinFatCaloriesShort({ value: '250', type: tr('fat') })}
                <View style={{ backgroundColor: Colors.lightPrimaryColor, width: 1.0, }} />
                {proteinFatCaloriesShort({ value: '1500', type: tr('calories') })}
            </View>
        )
    }

    function proteinFatCaloriesShort({ value, type }) {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ ...Fonts.primaryColor16Medium }}>
                    {value}
                </Text>
                <Text style={{ ...Fonts.whiteColor14SemiBold }}>
                    {type}
                </Text>
            </View>
        )
    }

    function dayInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor18SemiBold }}>
                    {tr('day')} 1
                </Text>
                <Text style={{ ...Fonts.grayColor14Medium }}>
                    Week 1 assessment week
                </Text>
            </View>
        )
    }

    function dietImageWithBackArrow() {
        return (
            <ImageBackground
                source={require('../../assets/images/food/food8.png')}
                style={{ width: '100%', height: height / 2.5, }}
            >
                <MaterialIcons
                    name={isRtl ? "arrow-forward" : "arrow-back"}
                    size={24}
                    color={Colors.whiteColor}
                    style={{ margin: Sizes.fixPadding * 2.0, alignSelf: isRtl ? 'flex-end' : 'flex-start' }}
                    onPress={() => navigation.pop()}
                />
            </ImageBackground>
        )
    }
}

export default DietDetailScreen;

const styles = StyleSheet.create({
    proteinFatAndCaloriesInfoWrapStyle: {
        justifyContent: 'space-between',
        backgroundColor: Colors.whiteColor,
        elevation: 1.5,
        borderRadius: Sizes.fixPadding - 2.0,
        paddingVertical: Sizes.fixPadding - 2.0,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        borderBottomWidth: 0.0,
        marginVertical: Sizes.fixPadding * 2.0,
    },
    mealCategoryImageCoverStyle: {
        flex: 1,
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: 'rgba(0,0,0,0.35)',
        alignItems: 'center',
        justifyContent: 'center'
    }
})