import { SafeAreaView, ScrollView, TouchableOpaascity,StyleSheet, Text, TouchableOpacity, View, StatusBar, ImageBackground, Image, Dimensions, FlatList, } from 'react-native'
import React, { useState,useContext,useEffect } from 'react'
import { Colors, Fonts, Sizes,Size } from '../../constants/styles';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Stack, ActivityIndicator } from "@react-native-material/core";

import { Overlay } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { AuthContext } from '../../constants/AuthContext';

const { width } = Dimensions.get('window');

const products =[{ 
    id: 1,
    name: "Hexagon Dumbbells",
    image: require('../../assets/images/shopgym/hex-dumbbell_hero.jpg'),
    price: "150.00",
    description:
      "Sturdy and versatile design to develop strength and power",
    categoryId: 1,
    rating: 4.5,
    included: "10 kg",
  },
  {
    id: 2,
    name: "Kettlebells",
    image: require('../../assets/images/shopgym/carousel-kettlebells.jpg'),
    price: "14",
    description:
      "Stylish weights for functional training",
    categoryId: 1,
    rating: 4.5,
    included: "10kg",
  },
  {
    id: 3,
    name: "Bumper Plates",
    image: require('../../assets/images/shopgym/carousel-bumper_plates-1.jpg'),
    price: "20",
    description:  "Consistent drop absorption and bounce",
    categoryId: 1,
    rating: 4.5,
    included: "10-50kg",
  },
  {
    id: 4,
    name: "Elastic Bands",
    image: require('../../assets/images/shopgym/carousel-elastic_bands.jpg'),
    price: "10",
    description:
      "Light and versatile, with practical handles",
    categoryId: 1,
    rating: 4.5,
    included: "",
  },

];
const todaysPlans = [
    {
        id: '1',
        foodImage: require('../../assets/images/food/food1.jpg'),
        mealsCategory: 'Breakfast',
        eatTime: '8:00AM - 8.30AM',
    },
    {
        id: '2',
        foodImage: require('../../assets/images/food/food13.png'),
        mealsCategory: 'Lunch',
        eatTime: '12.30PM - 1.00PM',
    },
    {
        id: '3',
        foodImage: require('../../assets/images/food/food17.png'),
        mealsCategory: 'Snacks',
        eatTime: '5.00PM - 6.00PM',
    },
    {
        id: '4',
        foodImage: require('../../assets/images/food/food4.jpg'),
        mealsCategory: 'Dinner',
        eatTime: '8.00PM - 9.00PM',
    }
];

const gyms =[
    {
        id: '1',
        gymImage: require('../../assets/images/GYMS/gym1.jpg'),
        gymName: 'sport village gym',
        city: 'nablus',
        rating: 4.5,
    },
    {
        id: '2',
        gymImage: require('../../assets/images/GYMS/gym2.jpg'),
        gymName: 'Green Gym',
        city: 'nablus',
        rating: 4.5,
    },
    {
        id: '3',
        gymImage: require('../../assets/images/GYMS/gym3.jpg'),
        gymName: 'Power Gym',
        city: 'nablus',
        rating: 4.5,
    },
    {
        id: '4',
        gymImage: require('../../assets/images/GYMS/gym4.jpg'),
        gymName: 'Top Fitness',
        city: 'nablus',
        rating: 4.5,
    },
    {
        id: '5',
        gymImage: require('../../assets/images/GYMS/gym5.jpg'),
        gymName: 'Dynamic Gym',
        city: 'nablus',
        rating: 4.5,
    },

];

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

const popularWorkouts = [
    {
        id: '1',
        workoutThumbImage: require('../../assets/images/exercises/exercise1.jpg'),
    },
    {
        id: '2',
        workoutThumbImage: require('../../assets/images/exercises/exercise6.png'),
    },
    {
        id: '3',
        workoutThumbImage: require('../../assets/images/exercises/exercise2.jpg'),
    },
];

const motivationalVideos = [
    {
        id: '1',
        title:'yoga',
        subtitle:'2 Hour Bulking Trainer',
        motivationalVideoThumbImage: require('../../assets/images/exercises/exercise7.jpg')
    },
    {
        id: '2',
        title:'yoga',
        subtitle:'2 Hour Bulking Trainer',
        motivationalVideoThumbImage: require('../../assets/images/exercises/exercise11.png')
    },
    {
        id: '3',
        title:'yoga',
        subtitle:'2 Hour Bulking Trainer',
        motivationalVideoThumbImage: require('../../assets/images/exercises/exercise15.png')
    },
];
const GoalData = ['Keep fit' ,'Lose weight (lose fat)',"Gain muscle mass (Grow your size)","Gain more flexible",
 "Get Stringer " 
 ];

const HomeScreen = ({ navigation, route, screenProps }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    const [showAppointmentDialog, setShowAppointmentDialog] = useState(false)

    function tr(key) {
        return t(`homeScreen:${key}`)
    }
    const {userinfo,email,setuserinfo,setgoalname} = useContext(AuthContext);
    const [gym, setgym] = useState([]);
    const [trainer, settrainer] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    const hanletrainers=async()=>{

      fetch(`http://192.168.1.12:8082/coaches/`, {
        method: "GET",
                 
      })
      .then(res => {
          return res.json();}
      )
      .then(
        (result) => {
          settrainer(result);
          console.log(result);
        

        },
        (error) => {

          console.log(error);
                }
      )
    }
    const hanlegym=async ()=>{
      setisLoading(true);

      fetch(`http://192.168.1.12:8082/gyms/`, {
        method: "GET",
                 
      })
      .then(res => {
          return res.json();}
      )
      .then(
        (result) => {
          console.log(result);
          setgym(result);
          setisLoading(false);

        },
        (error) => {

          console.log(error);
                }
      )
    }

    useEffect(()=>{
      setuserinfo([]);


        hanlegym();
        hanletrainers();

        fetch(`http://192.168.1.12:8082/player/getdatafromemail/${email}`, {
            method: "GET",
                     
          })
          .then(res => {
              return res.json();}
          )
          .then(
            (result) => {
              console.log(result);
              setuserinfo(result);
              setgoalname(GoalData[userinfo.goal]);

              console.log(userinfo);

            },
            (error) => {
              console.log(error);
                    }
          )
        
    },[])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
                >
                    {banner()}
                    {gymspoulare()}
                    {trainersInfo()}
                    {Shop()}
                    {todaysPlan()}
                    {popularWorkoutInfo()}
                    {motivationalVideosInfo()}
                </ScrollView>
                {appointmentDialog()}
                {loadingDialog()}
            </View>
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

    function motivationalVideosInfo() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.99}
                    style={{ borderRadius: Sizes.fixPadding - 2.0, marginRight: Sizes.fixPadding * 2.0 }}
                    onPress={() => setShowAppointmentDialog(true)}
                >
      
                    <ImageBackground
                        source={item.motivationalVideoThumbImage}
                        style={styles.card}
                        borderRadius={Sizes.fixPadding - 2.0}
                        imageStyle={styles.imageStyle}
                        resizeMode="cover"
                    >
                    	<LinearGradient style={styles.overlay} colors={['rgba(0, 0, 0, 1)', 'transparent']} start={[0, 0]} end={[1, 0]} />
				<View>
					<Text style={styles.title}>{item.title}</Text>
					<Text style={styles.subtitle}>{item.subtitle}</Text>
				</View>
				<TouchableOpacity style={styles.btn}   
                   onPress={() => setShowAppointmentDialog(true)}
>
					<Image style={{ width: 40, height: 40 }} source={require('../../assets/images/icons/play.png')} resizeMode="contain" />
				</TouchableOpacity>
                    </ImageBackground>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0 }}>
                            <View style={{ ...styles.dietCategoriesHeaderWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}>

                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('motivationalVideoTitle')}
                </Text>
                <Text
                        onPress={() => navigation.push('DietCategories')}
                        style={{ ...Fonts.primaryColor14SemiBold }}
                    >
                        {tr('seeAll')}
                    </Text>
                </View>
                <FlatList
                    data={motivationalVideos}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0, paddingTop: Sizes.fixPadding }}
                />
            </View>
        )
    }

    function popularWorkoutInfo() {
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
        source={item.workoutThumbImage}
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
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#fff',
          padding: 5,
          right: 10,
          top: 10,
          borderRadius: 5,
        }}>
<MaterialIcons
                                        name="favorite"
                                        size={20}
                                        color={Colors.primaryColor}
                                    />    
                                    
                                      </View>
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
            <View>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('popularWorkoutTitle')}
                </Text>
                <FlatList
                    data={popularWorkouts}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding *1.3, paddingTop: Sizes.fixPadding }}
                />
            </View>
        )
    }

    function trainersInfo() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => navigation.push('TrainerProfile',{item:item})}
                    style={styles.trainerInfoWrapStyle}
                >
                    <ImageBackground
                source={{uri:`http://192.168.1.12:8082/downloadFile/${item.path}`}}
                        style={{ width: width / 2.5, height: (width / 2.5) - 30, }}
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
                            <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
                                {item.fullname}
                            </Text>
                            <Text numberOfLines={2} style={{ ...Fonts.grayColor14Regular }}>
                            {GoalData[item.goal]}
                            </Text>
                        </View>
                        <View style={{ marginTop: Sizes.fixPadding - 7.0, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                            <MaterialIcons name="star" size={13} color={Colors.yellowColor} />
                            <Text style={{ ...Fonts.blackColor12Regular, marginLeft: Sizes.fixPadding *-20 }}>4.5                       </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ marginVertical: Sizes.fixPadding }}>
                            <View style={{ ...styles.dietCategoriesHeaderWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}>

                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('personalTrainerTitle')}
                </Text>
                <Text
                        onPress={() => navigation.push('Trainers')}
                        style={{ ...Fonts.primaryColor14SemiBold }}
                    >
                        {tr('seeAll')}
                    </Text>
                </View>
                <FlatList
                    data={trainer.slice(0,5)}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding, paddingLeft: Sizes.fixPadding * 2.0, }}
                />
            </View>
        )
    }

    function gymspoulare() {
        const renderItem = ({item}) => {
            return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ClubInfo', {
                      item:item
                    });
                }}
                    style={{
          height: 209,
          width: 231,
          backgroundColor: Colors.DEFAULT_WHITE,
          borderRadius: 20,
          marginRight: 20,
          
          shadowColor: Colors.DARK_ONE,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
                   }}>
                   
        <Image
                source={{uri:`http://192.168.1.12:8082/downloadFile/${item.path}`}}
          style={{
            height: 150,
            width: '100%',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            resizeMode: 'stretch',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}>
          <View>
            <Text style={{fontSize: 14, ...Fonts.blackColor14SemiBold}}>
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: 10,
                ...Fonts.blackColor14Medium,

              }}>
              {item.location}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons
                          style={{
                            marginLeft: Size / 2,
                          }}
                          name="star"
                          color={Colors.DEFAULT_YELLOW}
                          size={Size * 2}
                        />
                        <Text
                          style={{
                            color: Colors.blackColor,
                            marginLeft: Size / 2,
                          }}
                        >
                          {item.rating}
                        </Text>
          </View>
        </View>

                </TouchableOpacity>
            );
        }
        return (
            <View style={{ marginTop: Sizes.fixPadding +7.0 }}>
                <View style={{ ...styles.dietCategoriesHeaderWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('GymsTitle')}
                </Text>
                <Text
                        onPress={() => navigation.push('Clubs')}
                        style={{ ...Fonts.primaryColor14SemiBold }}
                    >
                        {tr('seeAll')}
                    </Text>
                    </View>
                <View style={{ marginTop: Sizes.fixPadding }}>
                    <FlatList
                        data={gym.slice(0,5)}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderItem}
                        horizontal
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 4.0, paddingLeft: Sizes.fixPadding * 2.0 }}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        )
    }


    function todaysPlan() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => navigation.push('MealCategoryVideo')}
                    style={{ alignItems: 'center', marginRight: Sizes.fixPadding * 2.0 }}
                >
                    <Image
                        source={item.foodImage}
                        style={styles.foodImageStyle}
                    />
                    <View style={styles.mealsCategoryWrapStyle}>
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                            {item.mealsCategory}
                        </Text>
                        <Text style={{ ...Fonts.blackColor14Regular }}>
                            {item.eatTime}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
                            <View style={{ ...styles.dietCategoriesHeaderWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}>

                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('todayPlanTitle')}
                </Text>
                <Text
                        onPress={() => navigation.push('DietDetail')}
                        style={{ ...Fonts.primaryColor14SemiBold }}
                    >
                        {tr('seeAll')}
                    </Text>
                </View>
                <View style={{ marginTop: Sizes.fixPadding }}>
                    <FlatList
                        data={todaysPlans}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderItem}
                        horizontal
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 4.0, paddingLeft: Sizes.fixPadding * 2.0 }}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        )
    }

    function Shop() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => {
                    navigation.navigate('ProductInfo', {
                      product: item
                    })}}
                                        style={{ alignItems: 'center', marginRight: Sizes.fixPadding * 2.0 }}
                >
                <View
                key={item.id}
                style={{
                  width: width / 2 - Size * 3,
                  marginBottom: Size,
                  borderRadius: Size *2,
                  overflow: "hidden",
                  height:270,
                }}
              >
                <BlurView
                
                  intensity={95}
                  style={{
                    backgroundColor:Colors.lightBlackColor,
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
                      source={item.image}
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
                      <BlurView
                        tint="dark"
                        intensity={70}
                        style={{
                          flexDirection: "row",
                          padding: Size -4,
                        }}
                      >
                        <Ionicons
                          style={{
                            marginLeft: Size / 2,
                          }}
                          name="star"
                          color={Colors.DEFAULT_YELLOW}
                          size={Size * 2}
                        />
                        <Text
                          style={{
                            color: Colors.blackColor,
                            marginLeft: Size / 2,
                          }}
                        >
                          {item.rating}
                        </Text>
                      </BlurView>
                    </View>
                  </TouchableOpacity>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: Colors.blackColor,
                      ...Fonts.blackColor12Medium,
                      marginTop: Size,
                      marginBottom: Size / 2,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ color: Colors.DARK_THREE, fontSize: Size * 1.2 }}
                  >
                    {item.included}
                  </Text>
                  <View
                    style={{
                      marginVertical: Size / 2,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          color: Colors.lightPrimaryColor,
                          marginRight: Size / 2,
                          fontSize: Size * 1.6,
                        }}
                      >
                        $
                      </Text>
                      <Text
                        style={{ color: Colors.DARK_ONE, fontSize: Size * 1.6 }}
                      >
                        {item.price}
                      </Text>
                    </View>
                    <TouchableOpacity
                           onPress={() => {
                    navigation.navigate('ProductInfo', {
                      product: item
                    });
                }}

                      style={{
                        backgroundColor: Colors.DEFAULT_WHITE,
                        padding: Size / 2,
                        borderRadius: Size,
                      }}
                    >
                      <Ionicons
                        name="add"
                        size={Size * 3}
                        color={Colors.primaryColor}
                      />
                    </TouchableOpacity>
                  </View>
                </BlurView>
              </View>
              </TouchableOpacity>
            )
        }
        return (
            <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
                            <View style={{ ...styles.dietCategoriesHeaderWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}>

                <Text style={{ marginHorizontal: Sizes.fixPadding *2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('shop')}
                </Text>
                <Text
                        onPress={() => navigation.push('Shop')}
                        style={{ ...Fonts.primaryColor14SemiBold }}
                    >
                        {tr('seeAll')}
                    </Text>
                </View>
                <View style={{ marginTop: Sizes.fixPadding }}>
                    <FlatList
                        data={products}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderItem}
                        horizontal
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding*2 , paddingLeft: Sizes.fixPadding * 2.0 }}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        )
    }



    function todayInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    {tr('today')}
                </Text>
                <View style={{ ...styles.todayInfoWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <Image
                        source={require('../../assets/images/icons/timer.png')}
                        style={{ width: 24.0, height: 24.0, resizeMode: "contain" }}
                    />
                    <View style={{ marginHorizontal: Sizes.fixPadding + 5.0, flex: 1 }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                            {tr('sessionStart')}
                        </Text>
                        <View style={{ ...styles.sessionStartTimeWrapStyle, alignSelf: isRtl ? 'flex-end' : 'flex-start', }}>
                            <Text style={{ ...Fonts.blackColor14Regular }}>
                                09:30:60
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    function banner() {
        return (
            <View style={{ ...styles.bannerWrapStyle, flexDirection: 'row', }}>
                <View style={{ zIndex: 1.0, flex: 0.8, }}>
                    <Text style={{ ...Fonts.whiteColor22Bold }}>
                        {'Start Your\nPersonal Tranning'}
                    </Text>
                    <Text style={{ ...Fonts.POPPINS_BOLD }}>
                        3 day free 
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.99}
                        onPress={() => navigation.push('TrainerProfile')}
                        style={{ ...styles.joinNowButtonStyle, alignSelf: isRtl ? 'flex-end' : 'flex-start', }}
                    >
                        <Text style={{ ...Fonts.whiteColor16SemiBold }}>
                            {tr('joinNow')}
                        </Text>
                    </TouchableOpacity>
                   
                </View>
                <View style={{ position: 'absolute', right: -20.0, bottom: 0.0 }}>
                    <Image
                        source={require('../../assets/images/exercises/model.png')}
                        style={{
                            height: width / 2.3,
                            resizeMode: 'stretch',
                            width: width / 2,
                        }}
                    />
                </View>
            </View>
        )
    }

    function header() {
        return (
            <View style={{ ...styles.headerWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <View style={{ flex: 1, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <Image
                source={{uri:`http://192.168.1.12:8082/downloadFile/${userinfo.path}`}}
                        style={{ width: 45.0, height: 45.0, borderRadius: 22.5 }}
                    />
                    <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding + 5.0 }}>
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                            Hello {userinfo.fullname}
                        </Text>
                        <Text style={{ ...Fonts.blackColor14Regular }}>
                            {tr('userWelcome')}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => navigation.push('Notification')}
                    style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}
                >
                    <MaterialCommunityIcons
                        name="calendar-month-outline"
                        size={24}
                        color={Colors.blackColor}
                        onPress={() => navigation.push('UserProgram')}
                    />
                    <View style={{ marginLeft: isRtl ? 0.0 : Sizes.fixPadding, marginRight: isRtl ? Sizes.fixPadding : 0.0 }}>
                        <MaterialCommunityIcons name="bell-outline" size={24} color={Colors.blackColor} />
                        <View style={styles.newNotificationBellStyle} />
                    </View>
                    <View style={{ marginLeft: isRtl ? 0.0 : Sizes.fixPadding, marginRight: isRtl ? Sizes.fixPadding : 0.0 }}>
                        <MaterialCommunityIcons name="chat" size={24} color={Colors.blackColor}
          onPress={() =>  this.props.navigation.navigate('Chat', { name: userinfo.fullname})}
 />
                        <View style={styles.newNotificationBellStyle} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    headerWrapStyle: {
        marginVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    newNotificationBellStyle: {
        position: 'absolute',
        width: 8.0,
        height: 8.0,
        borderRadius: 4.0,
        backgroundColor: Colors.redColor,
        right: 2.5, top: 5.0,
        borderColor: Colors.whiteColor,
        borderWidth: 1.0
    },
    joinNowButtonStyle: {
        backgroundColor: Colors.blackColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding + 2.0,
        marginTop: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding - 5.0,
    },
    bannerWrapStyle: {
        paddingLeft: Sizes.fixPadding * 1.9,
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginTop: Sizes.fixPadding + 15.0,

    },
    todayInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 7.0
    },
    sessionStartTimeWrapStyle: {
        marginTop: Sizes.fixPadding - 7.0,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding - 8.0,
    },
    mealsCategoryWrapStyle: {
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        position: 'absolute',
        bottom: -30.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 2.0
    },
    foodImageStyle: {
        width: width / 1.5,
        height: width / 2.5,
        resizeMode: 'stretch',
        borderRadius: Sizes.fixPadding - 2.0
    },
    trainerInfoWrapStyle: {
        marginRight: Sizes.fixPadding * 2.0,
        width: width / 2.5,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.whiteColor,
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
    workoutThumbImageStyle: {
        width: width / 1.7,
        height: width / 2.8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginTop: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding,
    },
    card: {
        width: width / 1.5,
        height: width / 2.7,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		borderRadius: 8,
		paddingBottom: 10,
		paddingHorizontal: 15,
		backgroundColor: '#FFF',
	},
	overlay: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: null,
		height: 158,
		borderRadius: 8,
	},
	imageStyle: {
		borderRadius: 8,
	},
	title: {
		color: '#FFF',
		fontSize: 24,
		fontWeight: 'bold',
		...Fonts.blackColor16Medium,
	},
	subtitle: {
		color: '#FFF',
	},
	btn: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 40,
		height: 40,
	},
    dietCategoriesHeaderWrapStyle: {
        marginBottom: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})