import { StyleSheet, Text, View,  Dimensions,   SafeAreaView, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { PricingCard } from 'react-native-elements';
import { Size } from '../../constants/styles';
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

const { height, width } = Dimensions.get("window");

const RegstierSelectionScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`genderSelectionScreen:${key}`)
    }

    const [selectedGender, setSelectedGender] = useState('');

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
                </ScrollView>
            </View>
        </SafeAreaView>
    )

   
    function genderSelection() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {genderSelectionShort({ icon: require('../../assets/images/victore/Pilates-amico.png'), gender: 'Signup',name:'Signup as player' })}
                {genderSelectionShort({ icon: require('../../assets/images/victore/tr.png'), gender: 'Signuptr',name:'Sigup as Trainer ' })}
            </View>
        )
    }

    function genderSelectionShort({ icon, gender,name }) {
        return (
            <View
                
                style={{
                  width: width / 1.8 - Size *2,
                  marginBottom: Size,
                  borderRadius: Size * 2,
                  overflow: "hidden",
                  height:300,
                }}
              >
                <BlurView
                
                  intensity={95}
                  style={{
                    backgroundColor:Colors.lightPrimaryColor,
                    padding: Size*2,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: 150,
                      width: "100%",
                    }}
                  >
                    <Image
                      source={icon}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: Size * 2,
                      }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        right: 0,
                        borderBottomStartRadius: Size * 3,
                        borderTopEndRadius: Size * 2,
                        overflow: "hidden",
                      }}
                    >
                      
                    </View>
                  </TouchableOpacity>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: Colors.DEFAULT_BLACK,
                      fontWeight: "500",
                      fontSize: Size * 2,
                      marginTop: Size,
                      marginBottom: Size / 2,
                    }}
                  >
                    {name}
                  </Text>
                  
                  <View
                    style={{
                      marginVertical: Size / 2,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    
                    <TouchableOpacity


                           onPress={() => {
                    navigation.navigate(gender);
                }}

                      style={{
                        backgroundColor: Colors.DEFAULT_WHITE,
                        padding: Size ,
                        borderRadius: Size*2,
                      }}
                    >
                      <AntDesignIcons name="right" 
                                style={{fontSize: 25, color: Colors.primaryColor}}/>
                                
                    </TouchableOpacity>
                  </View>
                </BlurView>
              </View>
        )
    }

    function getInformationText() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, alignItems: 'center', marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 7.0, textAlign: 'center', ...Fonts.primaryColor18SemiBold }}>
                 Choose to register in the app..?
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

export default RegstierSelectionScreen;

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
        borderBottomWidth: 0.0,
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