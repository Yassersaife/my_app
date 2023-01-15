import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, BackHandler, Dimensions, } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import VideoPlayer from 'expo-video-player';
import { ResizeMode } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');

const recipes = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam, euismod pellentesque sagittis, turpis quam neque diam massa dolor. Quis nascetur arcu, amet felis purus at senectus pulvinar blandit. Sit habitant dignissim orci at mattis ante. onsectetur adipiscing elit. Diam, euismod pellentesque sagittis, turpis onsectetur adipiscing elit.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam, euismod pellentesque sagittis, turpis quam neque diam massa dolor. Diam, euismod pellentesque sagittis, turpis onsectetur adipiscing elit.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam, euismod pellentesque sagittis, turpis quam neque diam massa dolor. Quis nascetur arcu, amet felis purus at senectus pulvinar blandit. Sit habitant dignissim orci at mattis ante. onsectetur adipiscing elit. Diam, euismod pellentesque sagittis, turpis onsectetur adipiscing elit.',
];

const ingredients = [
    "1.5 cup levelled whole",
    "1.5 pinch salt",
    "1.5 pinch levelled banking powder",
    "1 table spoon vanila sirap",
    "1 cup chocolate",
    "1 spoon browun sugar",
    "3 spoon peanut butter",
];

const MealCategoryVideoScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`mealCategoryVideoScreen:${key}`)
    }

    const [inFullscreen2, setInFullsreen2] = useState(false);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [inFavorite, setInFavorite] = useState(false);
    const [showMore, setShowMore] = useState(false);

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
        return async () => {
            await changeScreenToPotrait();
        };
    }, []);

    async function changeScreenToPotrait() {
        await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar hidden={inFullscreen2 ? true : false} translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {videoDisplay()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {mealCategoryInfo()}
                    {proteinFatAndCaloriesInfo()}
                    {ingredientsInfo()}
                    {recipeInfo()}
                </ScrollView>
            </View>
            {snackBar()}
        </SafeAreaView>
    )

    function recipeInfo() {
        const showRecipe = showMore ? recipes : recipes.slice(0, 1);
        return (
            <View style={{ marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    {tr('recipe')}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding }}>
                    {
                        showRecipe.map((item, index) => (
                            <Text
                                key={`${index}`}
                                style={{ ...Fonts.blackColor12Regular, marginBottom: Sizes.fixPadding }}
                            >
                                {item}
                            </Text>
                        ))
                    }
                    <Text
                        onPress={() => setShowMore(!showMore)}
                        style={{
                            ...styles.showLessMoreTextStyle,
                            textAlign: isRtl ? 'left' : 'right',
                        }}
                    >
                        {showMore ? tr('readLess') : tr('readMore')}
                    </Text>
                </View>
            </View>
        )
    }

    function ingredientsInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16SemiBold }}>
                    {tr('ingrediants')}
                </Text>
                {
                    ingredients.map((item, index) => (
                        <View
                            key={`${index}`}
                            style={{ marginBottom: Sizes.fixPadding, flexDirection: isRtl ? 'row-reverse' : 'row' }}
                        >
                            <Text style={{
                                marginRight: isRtl ? 0.0 : Sizes.fixPadding - 2.0,
                                marginLeft: isRtl ? Sizes.fixPadding - 2.0 : 0.0,
                                ...Fonts.primaryColor16Medium
                            }}>
                                *
                            </Text>
                            <Text style={{ ...Fonts.blackColor16Regular }}>
                                {item}
                            </Text>
                        </View>
                    ))
                }
            </View>
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

    function mealCategoryInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ ...Fonts.blackColor18SemiBold }}>
                        Breakfast
                    </Text>
                    <Text style={{ ...Fonts.grayColor14SemiBold }}>
                        Chocolate & Peanut Butter
                    </Text>
                </View>
                <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <MaterialIcons
                        name={inFavorite ? "favorite" : "favorite-outline"}
                        size={24}
                        color={Colors.primaryColor}
                        style={{
                            marginRight: isRtl ? 0.0 : Sizes.fixPadding + 5.0,
                            marginLeft: isRtl ? Sizes.fixPadding + 5.0 : 0.0
                        }}
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
                        resizeMode: ResizeMode.COVER,
                        source: require('../../assets/video/diet.mp4')
                    }}
                    slider={{ visible: true, }}
                    style={{
                        videoBackgroundColor: Colors.lightGrayColor,
                        height: inFullscreen2 ? width : 230.0,
                        width: inFullscreen2 ? height : width,
                    }}
                    icon={{
                        pause: <MaterialIcons name='pause' color={Colors.whiteColor} size={40} style={{ marginBottom: 20.0, }} />,
                        play: <MaterialIcons name='play-arrow' color={Colors.whiteColor} size={40} style={{ marginBottom: 20.0, }} />,
                        replay: <MaterialIcons name="replay" color={Colors.whiteColor} size={40} style={{ marginBottom: 20.0, }} />,
                    }}
                    activityIndicator={{ color: Colors.DARK_ONE, size: 40.0, marginBottom: 20.0 }}
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
            <View style={{
                ...styles.headerWrapStyle,
                left: isRtl ? null : 20.0,
                right: isRtl ? 20.0 : null
            }}>
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

export default MealCategoryVideoScreen;

const styles = StyleSheet.create({
    headerWrapStyle: {
        position: 'absolute',
        top: 20.0,
    },
    videoThumbImageCoverStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 2.0,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    proteinFatAndCaloriesInfoWrapStyle: {
        justifyContent: 'space-between',
        elevation: 1.5,
        borderRadius: Sizes.fixPadding - 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding - 2.0,
        borderColor: Colors.primary2,
        borderWidth: 2.0,
        borderBottomWidth: 0.0,
        backgroundColor:Colors.DARK_FOUR,
    },
    showLessMoreTextStyle: {
        marginBottom: Sizes.fixPadding * 2.0,
        marginTop: -Sizes.fixPadding,
        ...Fonts.primaryColor14Medium
    }
})