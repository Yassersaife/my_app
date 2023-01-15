import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState,useContext } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { PricingCard } from 'react-native-elements';
import { AuthContext } from '../../constants/AuthContext';


const GenderSelectionScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`genderSelectionScreen:${key}`)
    }
    const [selectedGender, setSelectedGender] = useState(0);
    const {setgender} = useContext(AuthContext);

const handlegender=()=>{
    setgender(selectedGender);
    navigation.push('LevelSelection') ;
}
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
                    {genderSelection()}
                    {nextButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function nextButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => handlegender()}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                    {tr('next')}
                </Text>
            </TouchableOpacity>
        )
    }

    function genderSelection() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {genderSelectionShort({ icon: require('../../assets/images/icons/male.png'), gender:0 })}
                {genderSelectionShort({ icon: require('../../assets/images/icons/female.png'), gender:1 })}
            </View>
        )
    }

    function genderSelectionShort({ icon, gender }) {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => setSelectedGender(gender)}
                style={{
                    backgroundColor: selectedGender == gender ? Colors.primary2 : Colors.DARK_FIVE,
                    borderColor: selectedGender == gender ? Colors.lightBlackColor : Colors.DEFAULT_WHITE,
                    ...styles.genderWrapStyle,
                }}>
                <Image
                    source={icon}
                    style={{ width: 120, height: 180, color:Colors.primaryColor}}
                />
                <Text style={{ textAlign: 'center', ...Fonts.blackColor18Bold,          
                Color: selectedGender == gender ? Colors.DEFAULT_BLACK : Colors.DEFAULT_BLACK  }}>                                                                                                                                            

                {gender==0?'Male':'Female'}
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
            <MaterialIcons
                name={isRtl ? 'arrow-forward' : "arrow-back"}
                size={24}
                color={Colors.primaryColor}
                onPress={() => navigation.pop()}
                style={{ margin: Sizes.fixPadding * 2.0, alignSelf: isRtl ? 'flex-end' : 'flex-start' }}
            />
        )
    }
}

export default GenderSelectionScreen;

const styles = StyleSheet.create({
    genderWrapStyle: {
        width: 150.0,
        height: 211.0,
        borderRadius: 50.0,
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        borderWidth: 1.0,
        borderBottomWidth: 1.0,
        marginVertical: Sizes.fixPadding + 5.0,
    },
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
})