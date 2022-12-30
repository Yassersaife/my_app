import { Text, View, SafeAreaView,Image, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const termsAndConditions = [
    'Activity is designed to protect your information and empower you to choose what you share.'
];

const dataPoliciesList = [
'Exercise and activity data shared with friends may include: active calories or kilojoules, exercise minutes, hours standing or rolling, steps, time zone, and exercise information such as title, type, and duration.',
'The email address associated with your app account will be visible to anyone you invite or accept an invitation from. ',
'If you use this feature, your workout and activity data will be sent to App so that App can securely share that data with whomever you choose.App will retain your Workout  and activity data for a short period of time and will only use this data to enable this sharing feature'
];

const AboutScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`aboutScreen:${key}`)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
            {backArrow()}
                <ScrollView showsVerticalScrollIndicator={false}>
                {header()}

                    {termsAndConditionsInfo()}
                    {dataPolicyInfo()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function dataPolicyInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                
                {
                    dataPoliciesList.map((item, index) => (
                        
                       
                        <Text
                            key={`${index}`}
                            style={{ ...Fonts.blackColor14Regular, marginBottom: Sizes.fixPadding + 5.0 }}
                        >
                           • {item}
                        </Text>
                    ))
                }
            </View>
        )
    }

    function termsAndConditionsInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                
                {
                    termsAndConditions.map((item, index) => (
                        <Text
                            key={`${index}`}
                            style={{ ...Fonts.blackColor14SemiBold, marginBottom: Sizes.fixPadding - 5.0 }}
                        >
                            {item}
                        </Text>
                    ))
                }
            </View>
        )
    }

    function header() {
        return (
            <View style={{alignSelf: 'center'}}>
                <Image
                    source={require('../../assets/images/settingIcons/policy.png')}
                    style={{ width: 300.0, height: 300.0 }}
                />            
                <Text style={{ textAlign: 'center',padding:40, ...Fonts.primaryColor24SemiBold}}>
                {tr('dataPolicy')}
                </Text>
                </View>

        )
    }
    function backArrow() {
        return (
            <MaterialIcons
                name={isRtl ? "arrow-forward" : "arrow-back"}
                size={24}
                color={Colors.primaryColor}
                onPress={() => navigation.pop()}
                style={{ margin: Sizes.fixPadding * 2.0, alignSelf: isRtl ? 'flex-end' : 'flex-start' }}
            />
        )
    }
}


export default AboutScreen;
