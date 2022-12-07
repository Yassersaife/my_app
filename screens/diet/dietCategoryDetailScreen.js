import { Text, View, SafeAreaView, StatusBar, Image, ScrollView, ImageBackground, Dimensions, TouchableOpacity, } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import BottomSheet from 'react-native-simple-bottom-sheet';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');

const dietPlans = [
    {
        id: '1',
        foodImage: require('../../assets/images/food/food16.png'),
        foodName: "Green bean curry",
    },
    {
        id: '2',
        foodImage: require('../../assets/images/food/food7.png'),
        foodName: "Mediterranean salad",
    },
    {
        id: '3',
        foodImage: require('../../assets/images/food/food17.png'),
        foodName: "Coconet yogart",
    },
    {
        id: '4',
        foodImage: require('../../assets/images/food/food18.png'),
        foodName: 'Lorem ipsum dolor',
    },
    {
        id: '5',
        foodImage: require('../../assets/images/food/food8.png'),
        foodName: 'Lorem ipsum dolor',
    },
    {
        id: '6',
        foodImage: require('../../assets/images/food/food19.png'),
        foodName: 'Lorem ipsum dolor',
    },
    {
        id: '7',
        foodImage: require('../../assets/images/food/food10.png'),
        foodName: 'Lorem ipsum dolor',
    },
    {
        id: '8',
        foodImage: require('../../assets/images/food/food20.png'),
        foodName: 'Lorem ipsum dolor',
    },
    {
        id: '9',
        foodImage: require('../../assets/images/food/food21.png'),
        foodName: 'Lorem ipsum dolor',
    },
    {
        id: '10',
        foodImage: require('../../assets/images/food/food18.png'),
        foodName: 'Lorem ipsum dolor',
    },
];

const DietCategoryDetailScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    function tr(key) {
        return t(`dietCategoryDetailScreen:${key}`)
    }

    const isRtl = i18n.dir() == 'rtl';

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {dietImageWithBackArrow()}
                {categoryDetail()}
            </View>
        </SafeAreaView>
    )

    function categoryDetail() {
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
                        {dietCategoryAndPlanInfo()}
                        {dietDescription()}
                        {dietPlanOfDays()}
                    </ScrollView>
                )}
            </BottomSheet>
        )
    }

    function dietPlanOfDays() {
        return (
            <View>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('totalDaysPlanTitle')}
                </Text>
                {
                    dietPlans.map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={0.99}
                            onPress={() => navigation.push('DietDetail')}
                            key={`${item.id}`}
                            style={{ borderRadius:10,borderBottomColor:Colors.primary2,flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center', marginBottom: Sizes.fixPadding * 2.0, }}
                        >
                            <Image
                                source={item.foodImage}
                                style={{ width: width / 4.5, height: width / 4.5, borderRadius: Sizes.fixPadding - 2.0 }}
                            />
                            <View style={{ flex: 1, marginLeft: isRtl ? 0.0 : Sizes.fixPadding + 5.0, marginRight: isRtl ? Sizes.fixPadding + 5.0 : 0.0 }}>
                                <Text style={{ ...Fonts.primaryColor16SemiBold }}>
                                    {tr('dayBig')} {index + 1}
                                </Text>
                                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                    {item.foodName}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }

    function dietDescription() {
        return (
            <Text style={{ marginVertical: Sizes.fixPadding * 2.0, ...Fonts.blackColor14Regular }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non maecenas tincidunt augue ultrices dolor neque, scelerisque quam enim. Sagittis pulvinar fames gravida pellentesque tortor et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non maecenas tincidunt augue ultrices dolor neque.
            </Text>
        )
    }

    function dietCategoryAndPlanInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0 }}>
                <Text style={{ ...Fonts.blackColor18SemiBold }}>
                    Vegan Diet
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                    10 {tr('day')} {tr('plan')}
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

export default DietCategoryDetailScreen;
