import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, FlatList, TextInput, Image, } from 'react-native'
import React, { useState,useContext,useEffect } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Stack, ActivityIndicator } from "@react-native-material/core";

import { Overlay } from 'react-native-elements';
import { AuthContext } from '../../constants/AuthContext';
const trainers = [
    {
        id: '133',
        trainerImage: require('../../assets/images/trainers/trainer7.png'),
        trainerName: "Jems joy",
        speciality: "Yoga specialist",
        yearOfExperience: 6,
        rating: 4.5,
        price:200,
    },
    {
        id: '134',
        trainerImage: require('../../assets/images/trainers/trainer8.png'),
        trainerName: "Katin Markin",
        speciality: "S & C",
        yearOfExperience: 5,
        rating: 4.5,
        price:200,

    },
    {
        id: '135',
        trainerImage: require('../../assets/images/trainers/trainer9.png'),
        trainerName: "Devid Scot",
        speciality: "Food dietitians",
        yearOfExperience: 6,
        rating: 4.5,
        price:200,

    },
    {
        id: '136',
        trainerImage: require('../../assets/images/trainers/trainer10.png'),
        trainerName: "Ket Patel",
        speciality: "Hiit",
        yearOfExperience: 6,
        rating: 4.5,
        price:200,

    },
    {
        id: '137',
        trainerImage: require('../../assets/images/trainers/trainer11.png'),
        trainerName: "Rohit joy",
        speciality: "Yoga specialist",
        yearOfExperience: 6,
        rating: 4.5,
        price:200,

    },
    {
        id: '138',
        trainerImage: require('../../assets/images/trainers/trainer12.png'),
        trainerName: "Jems joy",
        speciality: "S & C",
        yearOfExperience: 6,
        rating: 4.5,
        price:200,


    },
    {
        id: '139',
        trainerImage: require('../../assets/images/trainers/trainer13.png'),
        trainerName: "Priti joy",
        speciality: "S & C",
        yearOfExperience: 6,
        rating: 4.5,
        price:200,

    },
    {
        id: '140',
        trainerImage: require('../../assets/images/trainers/trainer14.png'),
        trainerName: "Madhuri patel",
        speciality: "S & C",
        yearOfExperience: 6,
        rating: 4.5,
        price:200,

    },
    {
        id: '141',
        trainerImage: require('../../assets/images/trainers/trainer7.png'),
        trainerName: "yasser saife",
        speciality: "Yoga specialist",
        yearOfExperience: 6,
        rating: 4.5, 
        price:200,

    },
];

const GoalData = ['Keep fit' ,'Lose weight (lose fat)',"Gain muscle mass (Grow your size)","Gain more flexible",
 "Get Stringer " 
 ];

const TrainersScreen = ({ navigation }) => {
const [search,setsearch]=useState('');
    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`trainersScreen:${key}`)
    }
    const [trainer, settrainer] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const {setemail,localhost} = useContext(AuthContext);

    useEffect(()=>{

      fetch(`http://${localhost}:8082/coaches/`, {
        method: "GET",
                 
      })
      .then(res => {
          return res.json();
          setisLoading(true);
        }
      )
      .then(
        (result) => {
          settrainer(result);
          console.log(result);
          setisLoading(false);


        },
        (error) => {
          console.log(error);
          setisLoading(false);

                }
      )
    },[])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                {searchField()}
                {trainersData()}
            </View>
            {loadingDialog()}
        </SafeAreaView>
    )
    function loadingDialog() {
        return (
            <Overlay
                isVisible={isLoading}
                overlayStyle={{ width: '80%',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 3.5,
        paddingTop: Sizes.fixPadding * 3.0,
        elevation: 3.0,}}
            >
                <ActivityIndicator size={40} color={Colors.primaryColor} style={{ alignSelf: 'center' }} />
                <Text style={{ marginTop: Sizes.fixPadding, textAlign: 'center', ...Fonts.blackColor16Bold }}>
                    Please wait...
                </Text>
            </Overlay>
        )
    }

    function trainersData() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => navigation.push('TrainerProfile',{item:item})}
                style={{ ...styles.trainerInfoWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}
            >
                
                <View style={{ flex: 1, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center', }}>
                    <Image
                        source={{uri:`http://${localhost}:8082/downloadFile/${item.path}`}}
                        style={{ width: 70.0, height: 70.0, borderRadius: 35.0, }}
                    />
                    <View style={{ flex: 1, marginLeft: isRtl ? 0.0 : Sizes.fixPadding, marginRight: isRtl ? Sizes.fixPadding : 0.0 }}>
                        <View style={{ marginBottom: Sizes.fixPadding - 6.0 }}>
                            <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                {item.fullname}
                            </Text>
                            <Text style={{ ...Fonts.grayColor14Medium }}>
                            {GoalData[item.goal]}
                            </Text>
                        </View>
                        <View style={{ marginTop: Sizes.fixPadding - 6.0, }}>
                            <Text style={{ ...Fonts.primaryColor14SemiBold }}>
                                {item.experience} {tr('years')}
                            </Text>
                            <Text style={{ ...Fonts.grayColor14Medium }}>
                                {tr('experiance')}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <MaterialIcons name="star" size={16} color={Colors.yellowColor} />
                    <Text style={{
                        marginLeft: isRtl ? 0.0 : Sizes.fixPadding - 7.0,
                        marginRight: isRtl ? Sizes.fixPadding - 7.0 : 0.0,
                        ...Fonts.blackColor14SemiBold
                    }}>
                        4.5
                    </Text>
                </View>
                
            </TouchableOpacity >
        )
        return (
            <FlatList
                data={trainer.filter((item)=>{return search.toLowerCase()==''?item:item.fullname.toLowerCase().includes(search)})}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding - 5.0, }}
            />
        )
    }

    function searchField() {
        return (
            <View style={{ ...styles.searchFieldWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                <MaterialIcons name="search" size={22} color={Colors.grayColor} />
                <TextInput
                    value={search}
                    onChangeText={(text) => setsearch(text)}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                />
            </View>
        )
    }

    function header() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                <MaterialIcons
                    name={isRtl ? "arrow-forward" : "arrow-back"}
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.blackColor18SemiBold }}>
                    {tr('header')}
                </Text>
            </View>
        )
    }
}

export default TrainersScreen;

const styles = StyleSheet.create({
    searchFieldWrapStyle: {
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: '#F0F0F0',
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    textFieldStyle: {
        marginLeft: Sizes.fixPadding,
        ...Fonts.blackColor14Medium,
        flex: 1,
        height: 20.0,
    },
    trainerInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding + 7.0,
        paddingHorizontal: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 1.5,
        borderRadius: Sizes.fixPadding + 2.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        borderBottomWidth: 0.5,
    }
})