import { StyleSheet, Text,Alert , Dimensions,View,FlatList,ImageBackground, SafeAreaView, StatusBar, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState,useContext } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../../constants/AuthContext';
const {width, height} = Dimensions.get('window');

const GoalData = [
   { id: '0',
   image: require('../../assets/images/goal/goal1.png'),
   title: "Keep fit",
},
{ id: '1',
image: require('../../assets/images/goal/goal2.png'),
title: "Lose weight (lose fat)",
},
{ id: '2',
image: require('../../assets/images/goal/goal3.png'),
title: "Gain muscle mass (Grow your size)",
},
{ id: '3',
image: require('../../assets/images/goal/goal4.png'),
title: "Gain more flexible",
},
{ id: '4',
    image: require('../../assets/images/goal/goal5.png'),
    title: "Get Stringer ",
},   
];

const GoalSelectionScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`goalSelectionScreen:${key}`)
    }
    const { gender,
        email,
        age,
        height1,
        weight1,
        fullName,
        phoneNumber,
        password,
        city,
        localhost} = useContext(AuthContext);

    const [selectedGoalIndex, setSelectedGoalIndex] = useState(2);
    const [isLoading, setIsLoading] = useState(false);

const handleSigup =()=>{
    console.log(gender);
    setIsLoading(true)

    fetch(`http://${localhost}:8082/signup/player`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullname:fullName,
                email:email,
                password: password,
                phone: phoneNumber,
                gender: gender,
                age: age,
                weight: weight1,
                height: height1,
                strategy: 2,
                goal: selectedGoalIndex,
                gymid: 120,
                coachid: 0,
                city: city,
                path:'cp-1010',
                guest:1
            
            
            })
          })
          .then(res => {
           
            return res.text();}
          )
          .then(
            (result) => {
                console.log(result);
                setIsLoading(false);


                if(result==" Success + Guest "){
                    setTimeout(() => {
                        navigation.push('BottomTabs')

                    }, 2000);
    
              }
              else{

                  Alert.alert(result)
                  }
                
              console.log(result);
            },
            (error) => {
              console.log(error);
              Alert.alert(error.msg)

              setIsLoading(false);

            }
          )
        
  
};

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
                    {goalItems()}
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
                    Please wait
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
                onPress={() => handleSigup()}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Bold }}>
                   Sign up
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
    function goalItems() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => {   setSelectedGoalIndex(item.id)} }
                style={{...styles.favoritesInfoWrapStyle,
                                borderColor: selectedGoalIndex == item.id ? Colors.primaryColor : Colors.DARK_FIVE,

                                
                            }}>
             
                <ImageBackground
                    source={item.image}
                    style={{ height: height / 6.0, justifyContent: 'center', }}
                    borderTopLeftRadius={Sizes.fixPadding - 2.0}
                    borderTopRightRadius={Sizes.fixPadding - 2.0}
                >
                    <AntDesign
                        name={selectedGoalIndex == item.id ? "checkcircle":"checkcircleo"}
                        size={26}
                        color={selectedGoalIndex == item.id ? Colors.primaryColor:Colors.DEFAULT_BLACK}
                        style={{ top: 5.0, right: 5.0, position: 'absolute', }}
                    />
                   
                </ImageBackground>
                <View style={{ alignItems: 'center', paddingVertical:  Sizes.fixPadding - 5.0  }}>
                <Text style={selectedGoalIndex == item.id ? { ...Fonts.primaryColor16SemiBold } : { ...Fonts.blackColor16Regular }}>
                                {item.title}
                            </Text>
                   
                </View>
            </TouchableOpacity >
        )
        return (
            <FlatList
                data={GoalData}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding, }}
            />
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
    favoritesInfoWrapStyle: {
     
        flex: 1,
        borderRadius: Sizes.fixPadding - 2.0,
        borderwidth:2,
        backgroundColor: Colors.DEFAULT_WHITE,
        elevation: 2.0,
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 3.0,
        maxWidth: (width / 2.0) - 20,
    },
})