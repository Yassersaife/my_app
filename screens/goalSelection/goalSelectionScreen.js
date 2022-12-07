import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';
import { useTranslation } from 'react-i18next';

const goalsList = [
    "Learn the basics",
    "Get fiiter (Build lean muscle)",
    "Lose weight (lose fat)",
    "Gain weight (Grow your size)",
    "Gain more flexible",
];

const GoalSelectionScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`goalSelectionScreen:${key}`)
    }

    const [selectedGoalIndex, setSelectedGoalIndex] = useState(2);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    {getInformationText()}
                    {goals()}
                </ScrollView>
            </View>
            {nextButton()}
            {loadingDialog()}
        </SafeAreaView>
    )

    function loadingDialog() {
        return (
            <Overlay
                isVisible={isLoading}
                overlayStyle={styles.dialogStyle}
            >
                <ActivityIndicator size={35} color={Colors.primaryColor} style={{ alignSelf: 'center' }} />
                <Text style={{ marginTop: Sizes.fixPadding, textAlign: 'center', ...Fonts.blackColor16Bold }}>
                    {tr('wait')}
                </Text>
            </Overlay>
        )
    }

    function goals() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {
                    goalsList.map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={0.99}
                            onPress={() => setSelectedGoalIndex(index)}
                            key={`${index}`}
                            style={{
                                paddingVertical: selectedGoalIndex == index ? Sizes.fixPadding - 5.0 : Sizes.fixPadding - 8.0,
                                borderRadius: selectedGoalIndex == index ? Sizes.fixPadding - 2.0 : 0.0,
                                borderWidth: selectedGoalIndex == index ? 2.0 : 0.0,
                                ...styles.goalWrapStyle,
                            }}>
                            <Text style={selectedGoalIndex == index ? { ...Fonts.blackColor16Regular } : { ...Fonts.grayColor16Regular }}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }

    function nextButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => {
                    setIsLoading(true)
                    setTimeout(() => {
                        setIsLoading(false)
                        navigation.push('BottomTabs')
                    }, 2000);
                }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    {tr('next')}
                </Text>
            </TouchableOpacity>
        )
    }

    function getInformationText() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, alignItems: 'center', marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 7.0, textAlign: 'center', ...Fonts.blackColor22SemiBold }}>
                    {tr('getInfoHeader')}
                </Text>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.grayColor14Regular }}>
                    {tr('getInfoDescription')}
                </Text>
            </View>
        )
    }

    function header() {
        return (
            <MaterialIcons
                name={isRtl ? "arrow-forward" : "arrow-back"}
                size={24}
                color={Colors.blackColor}
                onPress={() => navigation.pop()}
                style={{ margin: Sizes.fixPadding * 2.0, alignSelf: isRtl ? 'flex-end' : 'flex-start' }}
            />
        )
    }
}

export default GoalSelectionScreen;

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 3.5,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    goalWrapStyle: {
        borderColor: Colors.primaryColor,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding
    },
    dialogStyle: {
        width: '80%',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 3.5,
        paddingTop: Sizes.fixPadding * 3.0,
        elevation: 3.0,
    },
})