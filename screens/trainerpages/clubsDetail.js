import {
    Dimensions,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Image,
  } from "react-native";
  import React, { useState } from "react";
  import { MaterialIcons } from '@expo/vector-icons';

  import { Ionicons } from "@expo/vector-icons";
  import { Colors, Fonts, Sizes ,Size} from '../../constants/styles';
  import { BlurView } from "expo-blur";
  import IC_Call from '../../assets/images/icons/ic_call.svg'
  import IC_Chat from '../../assets/images/icons/ic_chat.svg'
  const GoalData = ['Keep fit' ,'Lose weight (lose fat)',"Gain muscle mass (Grow your size)","Gain more flexible",
  "Get Stringer "  ];
  const { height, width } = Dimensions.get("window");
  const trainers = [
    {
        id: '1',
        trainerImage: require('../../assets/images/trainers/trainer14.png'),
        trainerName: 'Mira shah',
        specialist: 'Yoga',
        rating: 4.5,
        yearOfExperience:5,
    },
    {
        id: '2',
        trainerImage: require('../../assets/images/trainers/trainer5.png'),
        trainerName: 'yasser saife',
        specialist: 'workout',
        rating: 4.5,
        yearOfExperience:5,

    },]

  const ClubworkInfo = ({ navigation,route }) => {
    const {item} = route.params;
  
    
    return (
      <>
        <ScrollView>
              <SafeAreaView>
            <ImageBackground
              source={item.gymImage}
              style={{
                height: height / 2 + Size * 2,
  
                justifyContent: "space-between",
              }}
              imageStyle={{
                borderRadius: Size * 3,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: Size * 2,
                }}
              >
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
                <TouchableOpacity
                
                  style={{
                    backgroundColor: Colors.DEFAULT_WHITE,
                    padding: Size,
                    borderRadius: Size * 1.5,
                  }}
                >
                  <Ionicons
                    name="heart"
                    color={Colors.DEFAULT_RED}
                    size={Size * 2}
                  />
                </TouchableOpacity>
              </View>
              

              <View
                style={{
                  borderRadius: Size * 3,
                  overflow: "hidden",
                }}
              >
                <BlurView
                  intensity={80}
                  tint="dark"
                  style={{
                    padding: Size * 2,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: Size * 2,
                        color: Colors.DEFAULT_WHITE,
                        fontWeight: "600",
                        marginBottom: Size,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: Size * 1.8,
                        color: Colors.lightPrimaryColor,
                        fontWeight: "500",
                        marginBottom: Size,
                      }}
                    >
                      {item.location}
                    </Text>
                    <View style={{ flexDirection: "row", marginTop: Size }}>
                      <Ionicons
                        name="star"
                        size={Size * 1.5}
                        color={Colors.DEFAULT_YELLOW}
                      />
                      <Text
                        style={{
                          color: Colors.DEFAULT_WHITE,
                          marginLeft: Size,
                        }}
                      >
                        {item.rating}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "35%",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          padding: Size / 2,
                          width: Size * 5,
                          height: Size * 5,
                          backgroundColor: Colors.DEFAULT_BLACK,
                          borderRadius: Size,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Ionicons
                        name="Yogaia"                       size={Size * 2}
                          color={Colors.lightPrimaryColor}
                        />
                        <Text
                          style={{
                            color: Colors.DEFAULT_WHITE,
                            fontSize: Size,
                          }}
                        >
                          Yogaia
                        </Text>
                      </View>
                      <View
                        style={{
                          padding: Size / 2,
                          width: Size * 5,
                          height: Size * 5,
                          backgroundColor: Colors.DEFAULT_BLACK,
                          borderRadius: Size,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Ionicons
                        name="fitness-center"                        
                          size={Size * 2}
                          color={Colors.lightPrimaryColor}
                        />
                        <Text
                          style={{
                            color: Colors.DEFAULT_WHITE,
                            fontSize: Size,
                          }}
                        >
                            Fitness
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        backgroundColor: Colors.dark,
                        padding: Size / 2,
                        borderRadius: Size / 2,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      
                    </View>
                  </View>
                </BlurView>
              </View>
            </ImageBackground>
  
            <View
              style={{
                padding: Size,
              }}
            >
              <Text
                style={{
                  color: Colors.DEFAULT_BLACK,
                  fontSize: Size * 1.7,
                  marginBottom: Size,
                }}
              >
                Description
              </Text>
              <Text numberOfLines={3} style={{ ...Fonts.blackColor12Regular}}>
{item.description}             </Text>

              <View
              style={{
                marginVertical: Size * 2,
              }}
            >

              </View>
                
                

            </View>

            </SafeAreaView>
        </ScrollView>
        <SafeAreaView
          style={{ flexDirection: "row", justifyContent: "space-between",height:height/9 }}
        >
          <View
            style={{
              padding: Size,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: Size * 3,
            }}
          >
            <Text style={{ color: Colors.blackColor, fontSize: Size * 2.5}}>
              Salary
            </Text>
            <View style={{ flexDirection: "row" }}>
            <Text style={{ color: Colors.primaryColor, fontSize: Size * 2.5 }}>
                $
              </Text>
              <Text
                style={{
                  color: Colors.DARK_ONE,
                  fontSize: Size * 2.5,
                  marginLeft: Size / 2,
                }}
              >
                {item.amountmonthly}
              </Text>
              <Text style={{ color: Colors.DARK_TWO, fontSize: Size ,top:15}}>
                /PER MONTH
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              marginRight: Size,
              backgroundColor: Colors.primaryColor,
              width: width / 2.5 + Size * 3,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: Size * 2,
            }}
          >
            <Text
              style={{
                ...Fonts.whiteColor14SemiBold
              }}
            >
             Join Now
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </>
    );
  };
  
  function trainersData() {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.99}
            onPress={() => navigation.push('TrainerProfile',{item:item})}
            style={{ ...styles.trainerInfoWrapStyle, flexDirection:  'row'  }}
        >
            <View style={{ flex: 1, flexDirection: 'row' , alignItems: 'center', }}>
                <Image
                    source={item.trainerImage}
                    style={{ width: 70.0, height: 70.0, borderRadius: 35.0, }}
                />
                <View style={{ flex: 1,  marginLeft:  Sizes.fixPadding-5  }}>
                    <View style={{ marginBottom: Sizes.fixPadding -5,}}>
                        <Text style={{ ...Fonts.blackColor14SemiBold }}>
                            {item.fullname}
                        </Text>
                        <Text style={{ ...Fonts.grayColor14Medium }}>
                        {GoalData[item.goal]}                        </Text>
                    </View>
                    <View style={{ marginTop: Sizes.fixPadding  }}>
                        <Text style={{ ...Fonts.primaryColor14SemiBold }}>
                            {item.registrationyear} Year
                        </Text>
                        <Text style={{ ...Fonts.grayColor14Medium }}>
                        Registration                         </Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection:  'row-reverse' , alignItems: 'center' }}>
                <MaterialIcons name="star" size={16} color={Colors.yellowColor} />
                <Text style={{
                    marginLeft:   Sizes.fixPadding - 7.0 ,
                    ...Fonts.blackColor14SemiBold
                }}>
                    4.5
                </Text>
            </View>
            
        </TouchableOpacity>
    )
    return (<View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
        <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
Trainers gym        </Text>
        <View style={{ marginTop: Sizes.fixPadding }}>
        <FlatList
            data={item.gymCoaches}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: Sizes.fixPadding - 5.0, }}
        />
        </View>
        </View>
    )
}
  export default ClubworkInfo;
  
  const styles = StyleSheet.create({
    trainerInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 1.5,
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        borderBottomWidth: 0.0,
    }
  });
  