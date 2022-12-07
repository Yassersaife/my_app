import { StyleSheet, Text, View, Image,SafeAreaView, StatusBar, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import BmiForm from '../../components/bmi/BmiForm';
const LevelSelectionScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`levelSelectionScreen:${key}`)
    }

    const [state, setState] = useState({
        age: '26',
        weight: '60',
        height: '6',
    })

    const { age, weight, height } = state;

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
               { getInformationText()}
                    <BmiForm/>
                </ScrollView>
            </View>
            {nextButton()}
        </SafeAreaView>
    )

    function heightInfo() {
        return (
            <View style={{ ...styles.levelInfoWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <Text style={{ ...Fonts.blackColor16Regular }}>
                    {tr('height')}
                </Text>
                <View style={{ ...styles.textFieldWrapStyle, flexDirection: 'row', justifyContent: 'center' }}>
                    <TextInput
                        value={height}
                        onChangeText={(text) => updateState({ height: text })}
                        style={{ ...Fonts.blackColor14Regular, height: 20.0, }}
                        selectionColor={Colors.primaryColor}
                        keyboardType="numeric"
                    />
                    <Text style={{ ...Fonts.blackColor14Regular }}>
                        ft
                    </Text>
                </View>
            </View >
        )
    }

    function weightInfo() {
        return (
            <View style={{ ...styles.levelInfoWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <Text style={{ ...Fonts.blackColor16Regular }}>
                    {tr('weight')}
                </Text>
                <View style={{ ...styles.textFieldWrapStyle, flexDirection: 'row', justifyContent: 'center' }}>
                    <TextInput
                        value={weight}
                        onChangeText={(text) => updateState({ weight: text })}
                        style={{ ...Fonts.blackColor14Regular, height: 20.0, }}
                        selectionColor={Colors.primaryColor}
                        keyboardType="numeric"
                    />
                    <Text style={{ ...Fonts.blackColor14Regular }}>
                        kg
                    </Text>
                </View>
            </View >
        )
    }

    function ageInfo() {
        return (
            <View style={{ ...styles.levelInfoWrapStyle, marginTop: Sizes.fixPadding * 3.5, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <Text style={{ ...Fonts.blackColor16Regular }}>
                    {tr('age')}
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        value={age}
                        onChangeText={(text) => updateState({ age: text })}
                        style={{ ...Fonts.blackColor14Regular, height: 20.0, }}
                        selectionColor={Colors.primaryColor}
                        keyboardType="numeric"
                    />
                </View>
            </View>
        )
    }

    function nextButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => navigation.push('GoalSelection')}
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
            <View style={{ marginTop: Sizes.fixPadding * 2.0, alignItems: 'center', marginHorizontal: Sizes.fixPadding * 2.0, }}>
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
        <View style={{alignSelf: 'center'}}>
        <MaterialIcons
                name={isRtl ? "arrow-forward" : "arrow-back"}
                size={24}
                color={Colors.blackColor}
                onPress={() => navigation.pop()}
                style={{ margin: Sizes.fixPadding * 2.0, alignSelf: isRtl ? 'flex-end' : 'flex-start' }}
            />
        <Image
            source={require('../../assets/images/victore/bmi.png')}
            style={{ width: 200.0, height: 200.0 }}
        />          
            
            </View>
        )
    }
}

export default LevelSelectionScreen;

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
    textFieldWrapStyle: {
        alignItems: 'center',
        width: 60.0,
        borderRadius: Sizes.fixPadding - 5.0,
        borderColor: Colors.grayColor,
        borderWidth: 1.0
    },
    levelInfoWrapStyle: {
        marginBottom: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})