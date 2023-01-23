import { StyleSheet, Text, View,TextInput, SafeAreaView, ScrollView, StatusBar, FlatList, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState,useContext ,useEffect} from 'react'
import { Fonts, Colors, Sizes } from '../../constants/styles';
import { Stack, ActivityIndicator } from "@react-native-material/core";

import { Overlay } from 'react-native-elements';import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../../constants/AuthContext';
const GoalData = ['Keep fit' ,'Lose weight (lose fat)',"Gain muscle mass (Grow your size)","Gain more flexible",
 "Get Stringer "  ];
const { width, height } = Dimensions.get('window');
const activities =[
    {
        id:'1',
        activitiesimage:require('../../assets/images/icons/actt1.png'),
        name:'Cardio'
    },
    {
        id:'2',
        activitiesimage:require('../../assets/images/icons/actt2.png'),
        name:'Stretch'
    },
    {
        id:'3',
        activitiesimage:require('../../assets/images/icons/actt3.png'),
        name:'Yoga'
    },
    {
        id:'4',
        activitiesimage:require('../../assets/images/icons/actt4.png'),
        name:'Power'
    },

]
const trainers = [
    {
        id: '1',
        trainerImage: require('../../assets/images/trainers/trainer7.png'),
        trainerName: "Jems joy",
        speciality: "Yoga specialist",
        yearOfExperience: 6,
        rating: 4.5,
        price:200,
    },
    {
        id: '2',
        trainerImage: require('../../assets/images/trainers/trainer8.png'),
        trainerName: "Katin Markin",
        speciality: "S & C",
        yearOfExperience: 5,
        rating: 4.5,
        price:200,

    },
    {
        id: '3',
        trainerImage: require('../../assets/images/trainers/trainer9.png'),
        trainerName: "Devid Scot",
        speciality: "Food dietitians",
        yearOfExperience: 6,
        rating: 4.5,
        price:200,

    },
    {
        id: '4',
        trainerImage: require('../../assets/images/trainers/trainer10.png'),
        trainerName: "Ket Patel",
        speciality: "Hiit",
        yearOfExperience: 6,
        rating: 4.5,
        price:200,

    },
    {
        id: '5',
        trainerImage: require('../../assets/images/trainers/trainer11.png'),
        trainerName: "Rohit joy",
        speciality: "Yoga specialist",
        yearOfExperience: 6,
        rating: 4.5,
        price:200,

    },
    {
        id: '6',
        trainerImage: require('../../assets/images/trainers/trainer12.png'),
        trainerName: "Jems joy",
        speciality: "S & C",
        yearOfExperience: 6,
        rating: 4.5,
        price:200,


    },
];

const newVideos = [
    {
        id: '1',
        motivationalVideoThumbImage: require('../../assets/images/exercises/exercise1.jpg')
    },
    {
        id: '2',
        motivationalVideoThumbImage: require('../../assets/images/exercises/exercise2.jpg')
    },
    {
        id: '3',
        motivationalVideoThumbImage: require('../../assets/images/exercises/exercise3.jpg')
    },
];

const workoutCategories = [
    {
        id: '1',
        category: 'Beginner',
        dec:'I want to start training',
        workoutImage: require('../../assets/images/beginnerExercise/exercise.jpg'),
        workouts: [
            {
                id: '1',
                workoutImage: require('../../assets/images/beginnerExercise/exercise1.png'),
                workoutDescription: "Learn the basic of the tranning",
                totalWorkouts: '06',
            },
            {
                id: '2',
                workoutImage: require('../../assets/images/beginnerExercise/exercise2.png'),
                workoutDescription: "Stay Active on odd days",
                totalWorkouts: '06',
            },
            {
                id: '3',
                workoutImage: require('../../assets/images/beginnerExercise/exercise3.png'),
                workoutDescription: "Learn the basic of yoga",
                totalWorkouts: '08',
            },
            {
                id: '4',
                workoutImage: require('../../assets/images/beginnerExercise/exercise4.png'),
                workoutDescription: "Learn the basic of the tranning",
                totalWorkouts: '06',
            },
            {
                id: '5',
                workoutImage: require('../../assets/images/beginnerExercise/exercise5.png'),
                workoutDescription: "Learn the basic of the tranning",
                totalWorkouts: '06',
            }
        ],
    },
    {
        id: '2',
        category: 'Medium',
        dec:'I train more that 3-5 times a week',

        workoutImage: require('../../assets/images/intermediateExercise/exercise1.jpg'),
        workouts: [
            {
                id: '1',
                workoutImage: require('../../assets/images/intermediateExercise/exercise1.png'),
                workoutDescription: "Learn the basic of the tranning",
                totalWorkouts: '06',
            },
            {
                id: '2',
                workoutImage: require('../../assets/images/intermediateExercise/exercise2.png'),
                workoutDescription: "Stay Active on odd days",
                totalWorkouts: '06',
            },
            {
                id: '3',
                workoutImage: require('../../assets/images/intermediateExercise/exercise3.png'),
                workoutDescription: "Learn the basic of yoga",
                totalWorkouts: '08',
            },
            {
                id: '4',
                workoutImage: require('../../assets/images/intermediateExercise/exercise4.png'),
                workoutDescription: "Learn the basic of the tranning",
                totalWorkouts: '06',
            },
            {
                id: '5',
                workoutImage: require('../../assets/images/intermediateExercise/exercise5.png'),
                workoutDescription: "Learn the basic of the tranning",
                totalWorkouts: '06',
            },
        ],
    },
    {
        id: '3',
        category: 'Advance',
        dec:'I train more that 5 times a week',
        workoutImage: require('../../assets/images/advanceExercise/exercise1.jpg'),
        workouts: [
            {
                id: '1',
                workoutImage: require('../../assets/images/advanceExercise/exercise1.png'),
                workoutDescription: "Learn the basic of the tranning",
                totalWorkouts: '06',
            },
            {
                id: '2',
                workoutImage: require('../../assets/images/advanceExercise/exercise2.png'),
                workoutDescription: "Stay Active on odd days",
                totalWorkouts: '06',
            },
            {
                id: '3',
                workoutImage: require('../../assets/images/advanceExercise/exercise3.png'),
                workoutDescription: "Learn the basic of yoga",
                totalWorkouts: '08',
            },
            {
                id: '4',
                workoutImage: require('../../assets/images/advanceExercise/exercise4.png'),
                workoutDescription: "Learn the basic of the tranning",
                totalWorkouts: '06',
            },
        ]
    },
];

const WorkoutScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();
    const [search, setSearch] = useState('');

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`workoutScreen:${key}`)
    }

    const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);
    const {goalname,userinfo,localhost} = useContext(AuthContext);
    const [trainer, settrainer] = useState({});
    const [isLoading, setisLoading] = useState(false);

    useEffect(()=>{
        setisLoading(true);

        console.log(userinfo.coacid);

      fetch(`http://${localhost}:8082/coaches/id/${userinfo.coachid}`, {
        method: "GET",
                 
      })
      .then(res => {
          return res.json();
        }
      )
      .then(
        (result) => {
            if(result.id==100)
            setShowAppointmentDialog(true);

            else{
          settrainer(result);}
          console.log(result);
          setisLoading(false);


        },
        (error) => {
          console.log(error);
          setisLoading(false);

                }
      )
    },[]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                {searchField()}
                  {programInfo()}
                    {todayWorkoutInfo()}

                    {CategoriesInfo()}
                    {trainersInfo()}

                    {activitiesinfo()}

                    {workoutVideos()}
                </ScrollView>
            </View>
            {appointmentDialog()}
            {loadingDialog()}
        </SafeAreaView>
    )
function appointmentDialog() {
        return (
            <Overlay
                isVisible={showAppointmentDialog}
                onBackdropPress={() => setShowAppointmentDialog(false)}
                overlayStyle={{ width: width - 40.0, borderRadius: Sizes.fixPadding - 2.0, padding: 0.0 }}
            >
                <View style={{ marginVertical: Sizes.fixPadding * 2.5, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    <Text style={{ textAlign: 'center', ...Fonts.blackColor16Medium }}>
                        {tr('appointmentTitle')}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.99}
                        onPress={() => {
                            setShowAppointmentDialog(false)
                            navigation.push('Trainers')
                        }}
                        style={styles.buttonStyle}
                    >
                        <Text style={{ ...Fonts.whiteColor16Bold }}>
                            {tr('bookAppintment')}
                        </Text>
                    </TouchableOpacity>
                   
                </View>
            </Overlay>
        )
    }
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
    function appointmentDialog() {
        return (
            <Overlay
                isVisible={showAppointmentDialog}
                onBackdropPress={() => setShowAppointmentDialog(false)}
                overlayStyle={{ width: width - 40.0, borderRadius: Sizes.fixPadding - 2.0, padding: 0.0 }}
            >
                <View style={{ marginVertical: Sizes.fixPadding * 2.5, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    <Text style={{ textAlign: 'center', ...Fonts.blackColor16Medium }}>
                        {tr('appointmentTitle')}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.99}
                        onPress={() => {
                            setShowAppointmentDialog(false)
                            navigation.push('Trainers')
                        }}
                        style={styles.buttonStyle}
                    >
                        <Text style={{ ...Fonts.whiteColor16Bold }}>
                            {tr('bookAppintment')}
                        </Text>
                    </TouchableOpacity>
                    <Text
                        onPress={() => setShowAppointmentDialog(false)}
                        style={{ textAlign: 'center', ...Fonts.grayColor16SemiBold }}
                    >
                        {tr('skip')}
                    </Text>
                </View>
            </Overlay>
        )
    }
    function CategoriesInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => navigation.push('WorkoutCategoryDetail', { item: item })}
                style={styles.dietCategoriesInfoWrapStyle}
            >
                <ImageBackground
                    source={item.workoutImage}
                    style={{ height: height / 6.0 }}
                    borderTopLeftRadius={Sizes.fixPadding - 2.0}
                    borderTopRightRadius={Sizes.fixPadding - 2.0}
                >
                <SimpleLineIcons size={23}
                       name="energy"
                        color={Colors.yellowColor}

                        style={{ alignSelf: 'flex-end', margin: Sizes.fixPadding - 5.0, }}
                         />
                    
                </ImageBackground>
                <View style={{ alignItems: 'center', paddingVertical: Sizes.fixPadding ,backgroundColor:Colors.DARK_sex}}>
                    <Text style={{ ...Fonts.primaryColor16SemiBold }}>
                    {item.category}
                    </Text>
                    <Text            numberOfLines={2}
style={{ marginTop: Sizes.fixPadding - 5.0,marginHorizontal:5, ...Fonts.blackColor12Regular,alignItems: 'center' }}>
                        {item.dec} 
                    </Text>
                </View>
            </TouchableOpacity>
        )
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0, }}>
                <View style={{ ...styles.dietCategoriesHeaderWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    Fitness Level                  </Text>
                    
                </View>
                <View style={{ marginHorizontal: Sizes.fixPadding }}>
                    <FlatList
                        data={workoutCategories}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderItem}
                        numColumns={3}
                        scrollEnabled={false}
                    />
                </View>
            </View>
        )
    }
    function trainersInfo() {
            return (
                <View style={{ marginVertical: Sizes.fixPadding-4 ,}}>
<Text style={{ marginHorizontal: Sizes.fixPadding * 2.0,paddingVertical:Sizes.fixPadding , ...Fonts.blackColor16SemiBold }}>
                   My coach
                </Text>
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => navigation.push('TrainerProfile',{item:trainer})}
                    style={styles.trainerInfoWrapStyle}
                >
                    <ImageBackground
                        source={{uri:`http://${localhost}:8082/downloadFile/${trainer.path}`}}
                        style={{ width: width / 1.5, height: (width / 2.5) - 30, }}
                        borderTopLeftRadius={Sizes.fixPadding - 2.0}
                        borderTopRightRadius={Sizes.fixPadding - 2.0}
                    >
                        <View style={styles.currencyWrapStyle}>
                            <Text style={{ ...Fonts.whiteColor14SemiBold }}>
                                
                            </Text>
                        </View>
                    </ImageBackground>
                    <View style={{ ...styles.trainerDetailWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                        <View style={{ flex: 1, }}>
                            <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                                {trainer.fullname}
                            </Text>
                            <Text numberOfLines={1} style={{ ...Fonts.grayColor14Regular }}>
                            {GoalData[trainer.goal]}                             </Text>
                        </View>
                        <View style={{ marginTop: Sizes.fixPadding - 7.0, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                            <MaterialIcons name="work" size={13} color={Colors.primary2} />
                            <Text style={{ ...Fonts.blackColor12Regular, marginLeft: Sizes.fixPadding - 7.0 }}>
                            {trainer.experience} </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                </View>
            )
        }
        
    
    function searchField() {
        return (
            <View style={{ ...styles.searchFieldWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                <MaterialIcons name="search" size={22} color={Colors.grayColor} />
                <TextInput
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                    placeholder='Find to Exercise'
                    
                />
            </View>
        )
    }

    function workoutVideos() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.99}
                    style={{ borderRadius: Sizes.fixPadding - 2.0, marginRight: Sizes.fixPadding * 1.0 }}
                    onPress={() => setShowAppointmentDialog(true)}
                >
                    <View
    style={{
      borderRadius: 10,
      marginHorizontal: 10,
      shadowOffset: {width: -2, height: 3},
      shadowColor: 'grey',
      shadowOpacity: 0.5,
      shadowRadius: 3,
      backgroundColor: '#fff',
      width:width/1.5,
    }}>
    <View style={{borderRadius: 10, overflow: 'hidden'}}>
      <ImageBackground
        source={item.motivationalVideoThumbImage}
        style={{
          height: 150,
          width: 300,
        }}>
        <LinearGradient
          locations={[0, 1.0]}
          colors={['rgba(0,0,0,0.00)', 'rgba(0,0,0,0.60)']}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}></LinearGradient>
      </ImageBackground>
      <Text
        style={{
          position: 'absolute',
          bottom: 5,
          left: 10,
          ...Fonts.blackColor16Bold,
          color: '#fff',
        }}>
        Transformation
      </Text>
      
    </View>
    <View
      style={{
        backgroundColor: 'white',
        padding: 10,
      }}>
      <View
        style={{
          position: 'absolute',
          padding: 10,
          right: 25,
          top: -35,
        }}>
        <MaterialIcons
                                        name="play-arrow"
                                        size={40}
                                        color={Colors.primaryColor}
                                        style={{ position: 'absolute' }}
                                    />
      </View>
      <Text style={{...Fonts.blackColor14Medium}}>
        2 Hour Bulking Trainer
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{...Fonts.blackColor14Medium ,color:Colors.primaryColor, fontSize: 12}}>
          
           Beginner
        </Text>
        <Text
          style={{
            ...Fonts.blackColor14Medium,
            fontSize: 12,
            color: Colors.primaryColor,
          }}>
          45 Min
        </Text>
      </View>
    </View>
  </View>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('nextWorkoutTitle')}
                </Text>
                <FlatList
                    data={newVideos}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0, paddingTop: Sizes.fixPadding }}
                />
            </View>
        )
    }

    function workouts() {
        return (
            <View>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('workoutTitle')}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding, flexDirection: isRtl ? 'row-reverse' : 'row', marginHorizontal: Sizes.fixPadding }}>
                    {workoutsShort({ icon: require('../../assets/images/icons/workout.png'), title: tr('userProgram'), onPress: () => { navigation.push('Videos') } })}
                    {workoutsShort({ icon: require('../../assets/images/icons/trainer.png'), title: tr('trainer'), onPress: () => { navigation.push('Trainers') } })}
                </View>
            </View>
        )
    }

    function workoutsShort({ icon, title, onPress }) {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={onPress}
                style={styles.workoutsWrapStyle}
            >
                <Image
                    source={icon}
                    style={{ height: height / 8.0, resizeMode: 'contain', marginBottom: Sizes.fixPadding + 5.0 }}
                />
                <Text style={{ textAlign: 'center', ...Fonts.blackColor16Bold }}>
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }

    function activitiesinfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
Activities that Interrst                </Text>
                <View style={{ marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                    {
                        activities.map((item) => (
                            <TouchableOpacity
                                activeOpacity={0.99}
                                key={`${item.id}`}
                                style={{ flex: 1, marginHorizontal: Sizes.fixPadding, }}>
                                <ImageBackground
                                    source={item.activitiesimage}
                                    style={{ height: height / 12.0,borderWidth:1,borderColor:Colors.primaryColor,backgroundColor:Colors.SECONDARY_WHITE }}
                                >
                                                                </ImageBackground>

                                    <View style={styles.workoutCategoryImageCoverStyle}>
                                        <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold,paddingTop:4 }}>
                                            {item.name}
                                        </Text>
                                    </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }
    function programInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                My Program Training
                </Text>
                <TouchableOpacity
                  activeOpacity={0.99}
                    onPress={() => navigation.push('Videos')}                >
                <View style={{ ...styles.todayInfoWrapStyle,borderWidth:0.5,
        borderColor:Colors.primaryColor ,borderRadius:10,backgroundColor:Colors.whiteColor, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <Image
                        source={require('../../assets/images/icons/program.png')}
                        style={{ width: 45.0, height: 45.0, resizeMode: "contain",borderWidth:0.2,
        borderColor:Colors.primaryColor ,borderRadius:10}}
                    />
                    <View style={{ marginHorizontal: Sizes.fixPadding + 5.0, flex: 1 }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                                         {GoalData[userinfo.goal]}      </Text>
                        <View style={{ ...styles.sessionStartTimeWrapStyle, alignSelf: isRtl ? 'flex-end' : 'flex-start', }}>
                            <Text style={{ ...Fonts.primaryColor14Regular }}>
                            Today you have 5 workout.

                            </Text>
                        </View>
                    </View>
                    <MaterialIcons name={isRtl ? "arrow-back-ios" : "arrow-forward-ios"} size={20} color={Colors.primaryColor} />

                </View>

                </TouchableOpacity>

            </View>
        )
    }
    function todayWorkoutInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16SemiBold }}>
                    {tr('todayVideo')}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => navigation.push('Videos')}
                    style={{ alignItems: 'center' }}
                >
                    <Image
                        source={require('../../assets/images/exercises/exercise1.jpg')}
                        style={{ width: '100%', height: height / 4.0, borderRadius: Sizes.fixPadding - 2.0, }}
                    />
                    <View style={styles.workoutInfoWrapStyle}>
                        <Text style={{ ...Fonts.blackColor14SemiBold }}>
                            Day 1
                        </Text>
                        <Text style={{ ...Fonts.grayColor12SemiBold }}>
                            7.00 AM - 8.00 AM
                        </Text>
                        <Text style={{ ...Fonts.primaryColor16SemiBold }}>
                            Full Body Tranning
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    function header() {
        return (
            <Text style={{ margin: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.blackColor18SemiBold }}>
                {tr('header')}
            </Text>
        )
    }
}

export default WorkoutScreen

const styles = StyleSheet.create({
    workoutInfoWrapStyle: {
        marginTop: -Sizes.fixPadding * 4.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 2.0,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
    },
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
    workoutCategoryImageCoverStyle: {
        borderRadius: Sizes.fixPadding - 2.0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    workoutsWrapStyle: {
        paddingVertical: Sizes.fixPadding + 5.0,
        backgroundColor: Colors.whiteColor, elevation: 2.0,
        borderRadius: Sizes.fixPadding - 2.0,
        flex: 1,
        marginHorizontal: Sizes.fixPadding,
        alignItems: 'center',
        borderWidth: 1.0,
        borderBottomWidth: 0.0,
        borderColor: Colors.lightGrayColor,
    },
    todayInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        backgroundColor: Colors.SECONDARY_WHITE,
        elevation: 2.0,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 7.0,
        borderWidth:1.0,
        borderColor:Colors.primaryColor
   },
    workoutThumbImageStyle: {
        width: width / 1.7,
        height: width / 2.8,
        alignItems: 'center',
        justifyContent: 'center',
    },trainerInfoWrapStyle: {
        marginHorizontal:Sizes.fixPadding*8,
        width: width / 1.5,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.whiteColor,
        shadowColor: Colors.DARK_ONE,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
    },
    currencyWrapStyle: {
        margin: Sizes.fixPadding - 3.0,
        alignSelf: 'flex-end',
        backgroundColor: Colors.primaryColor,
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    trainerDetailWrapStyle: {
        paddingVertical: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        justifyContent: 'space-between'
    },
    todayInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 7.0
    },
    currencyWrapStyle: {
        backgroundColor: Colors.primaryColor,
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 5.0,
        right: 5.0,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginTop: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding,
    }, dietCategoriesInfoWrapStyle: {
        flex: 1,
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    favoriteDietImageStyle: {
        width: width / 2.4,
        height: height / 3.8,
        borderRadius: Sizes.fixPadding - 2.0,
        marginRight: Sizes.fixPadding * 2.0,
    },
    sanckBarStyle: {
        position: 'absolute',
        left: -10.0,
        right: -10.0,
        bottom: -10.0,
        backgroundColor: Colors.lightBlackColor,
        elevation: 0.0,
    },
    dietCategoriesHeaderWrapStyle: {
        marginBottom: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding ,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})