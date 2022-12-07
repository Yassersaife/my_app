import { SafeAreaView,TextInput, ScrollView, TouchableOpaascity,StyleSheet, Text, TouchableOpacity, View, StatusBar, ImageBackground, Image, Dimensions, FlatList, } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes,Size } from '../../constants/styles';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import SearchField from '../../components/SearchField';

const { width } = Dimensions.get('window');


const gyms =[
    {
        id: '1',
        gymImage: require('../../assets/images/GYMS/gym1.jpg'),
        gymName: 'sport village gym',
        city: 'nablus',
        rating: 4.5,
        price:99.99,
        description:' designed to be a community gym where everyone is welcome. All members have 24 hour unlimited access and it is conveniently located at 7594 Hwy 73E Mt. Pleasant, NC near the Dominos and Family Dollar. From the power lifter, bodybuilder, or beginner everyone is welcome to train here',
    },
    {
        id: '2',
        gymImage: require('../../assets/images/GYMS/gym2.jpg'),
        gymName: 'Green Gym',
        city: 'nablus',
        rating: 4.5,
        description:' designed to be a community gym where everyone is welcome. All members have 24 hour unlimited access and it is conveniently located at 7594 Hwy 73E Mt. Pleasant, NC near the Dominos and Family Dollar. From the power lifter, bodybuilder, or beginner everyone is welcome to train here',
        price:99.99,

    },
    {
        id: '3',
        gymImage: require('../../assets/images/GYMS/gym3.jpg'),
        gymName: 'Power Gym',
        city: 'nablus',
        rating: 4.5,
        description:' designed to be a community gym where everyone is welcome. All members have 24 hour unlimited access and it is conveniently located at 7594 Hwy 73E Mt. Pleasant, NC near the Dominos and Family Dollar. From the power lifter, bodybuilder, or beginner everyone is welcome to train here',
        price:99.99,

    },
    {
        id: '4',
        gymImage: require('../../assets/images/GYMS/gym4.jpg'),
        gymName: 'Top Fitness',
        city: 'nablus',
        rating: 4.5,
        description:' designed to be a community gym where everyone is welcome. All members have 24 hour unlimited access and it is conveniently located at 7594 Hwy 73E Mt. Pleasant, NC near the Dominos and Family Dollar. From the power lifter, bodybuilder, or beginner everyone is welcome to train here',
        price:99.99,

    },
    {
        id: '5',
        gymImage: require('../../assets/images/GYMS/gym5.jpg'),
        gymName: 'Dynamic Gym',
        city: 'nablus',
        rating: 4.5,
        description:' designed to be a community gym where everyone is welcome. All members have 24 hour unlimited access and it is conveniently located at 7594 Hwy 73E Mt. Pleasant, NC near the Dominos and Family Dollar. From the power lifter, bodybuilder, or beginner everyone is welcome to train here',
        price:99.99,
        
    },

];

const trainers = [
    {
        id: '1',
        trainerImage: require('../../assets/images/trainers/trainer14.png'),
        trainerName: 'Mira shah',
        specialist: 'Yoga',
        rating: 4.5,
    },
    {
        id: '2',
        trainerImage: require('../../assets/images/trainers/trainer5.png'),
        trainerName: 'yasser saife',
        specialist: 'workout',
        rating: 4.5,
    },
    {
        id: '3',
        trainerImage: require('../../assets/images/trainers/trainer12.png'),
        trainerName: 'Dhruva roi',
        specialist: 'lessfit',
        
        rating: 4.5,
    },
    {
        id: '4',
        trainerImage: require('../../assets/images/trainers/trainer4.png'),
        trainerName: 'Dr. roi',
        specialist: 'hiits',
        rating: 4.5,
    },
    {
        id: '5',
        trainerImage: require('../../assets/images/trainers/trainer1.png'),
        trainerName: 'Salman khan',
        specialist: 'S & C',
        rating: 4.5,
    },
];

const clubsScreen = ({ navigation, route, screenProps }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    const [showAppointmentDialog, setShowAppointmentDialog] = useState(false)

    function tr(key) {
        return t(`clubsScreen:${key}`)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
                >
                {welcomegym()}
                    {gymspoulare()}
                    {recommend()}

                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function recommend() {
        const renderItem = ({item}) => {
            return (
                <TouchableOpacity
                    onPress={() => {
                    navigation.navigate('ClubInfo', {
                        item: item
                    });
                }}
                     style={{
        marginVertical: 10,
        backgroundColor: Colors.DEFAULT_WHITE,
        borderRadius: 20,

        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
      }}>
           <View
        style={{
          flexDirection: 'row',
          height: 100,
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <View>        
        <Image
          source={item.gymImage}
          style={{
              height: 60,
              width: 60,
              borderRadius: 10,
              resizeMode: 'stretch',
            }}
        />
        </View>
        <View style={{flex: 1, paddingLeft: 20}}>
          
            <Text style={{fontSize: 14, ...Fonts.blackColor14SemiBold}}>
              {item.gymName}
            </Text>
            <Text
              style={{
                fontSize: 10,
                ...Fonts.blackColor14Medium,

              }}>
              {item.city}
            </Text>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
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
        </View>

                </TouchableOpacity>
            );
        }
        return (
            <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                   Recommrndrd For You
                </Text>
                <View style={{ marginTop: Sizes.fixPadding }}>
                    <FlatList
                        data={gyms}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderItem}
                        
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 4.0, paddingLeft: Sizes.fixPadding * 2.0 }}
                        showsHorizontalScrollIndicator={true}
                    />
                </View>
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
          source={item.gymImage}
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
              {item.gymName}
            </Text>
            <Text
              style={{
                fontSize: 10,
                ...Fonts.blackColor14Medium,

              }}>
              {item.city}
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
            <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                </Text>
                <View style={{ marginTop: Sizes.fixPadding }}>
                    <FlatList
                        data={gyms}
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

    function welcomegym() {
        return (
        <View style={styles.wrapperWelcome}>
          <Text style={styles.textWelcome}>Find Your GYM </Text>
          <SearchField/>

        </View>
            
              
                )
    }
    

    function header() {
        return (
            <View style={{ ...styles.headerWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <View style={{ flex: 1, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                <TouchableOpacity
                style={{
                  backgroundColor: Colors.DEFAULT_WHITE,
                  padding: Size,
                  borderRadius: Size * 1.5,
                }}
              >
                <Ionicons
                  name="arrow-back"
                  color={Colors.primaryColor}
                  size={Size * 2}
                  onPress={() => navigation.pop()}
           
                />
              </TouchableOpacity>
                    <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding + 5.0 }}>
                        <Text style={{ ...Fonts.primaryColor14Bold }}>
                           Clubs GYM                      
                         </Text>
                        
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => navigation.push('')}
                    style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}
                >
                    <MaterialCommunityIcons
                        name="location"
                        size={40}
                        color={Colors.blackColor}
                        onPress={() => navigation.push('')}
                    />
                    
                </TouchableOpacity>
            </View>
        )
    }
}

export default clubsScreen;

const styles = StyleSheet.create({
    headerWrapStyle: {
        marginVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'space-between'
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
    screen: {flex: 1, backgroundColor: 'white'},
  wrapperWelcome: {paddingHorizontal: 20},
  textWelcome: {
    fontSize: 30,
  ...Fonts.POPPINS_BOLD,
  color:Colors.primary2,
  },
  wrapperSearch: {
    paddingHorizontal: 20,
    marginTop: 30,

    shadowColor: Colors.blackColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  wrapperTxtInput: {
    flexDirection: 'row',
    backgroundColor: Colors.DEFAULT_WHITE,
    height: 55,
    width: '100%',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  txtInput: {fontSize: 14, ...Fonts.POPPINS_LIGHT},
  wrapperBtnSearch: {
    backgroundColor: Colors.primaryColor,
    height: 39,
    width: 39,
    borderRadius: 39 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperContent: {
    marginTop: 30,
    paddingLeft: 20,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  wrapperRecommend: {marginTop: 30, paddingHorizontal: 20},
  textTitleRecommend: {fontSize: 16, ...Fonts.POPPINS_BOLD},

    
})