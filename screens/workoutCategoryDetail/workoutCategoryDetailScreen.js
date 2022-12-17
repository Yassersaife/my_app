import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, ImageBackground, FlatList, Dimensions, } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import { SimpleLineIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const WorkoutCategoryDetailScreen = ({ navigation, route }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`workoutCategoryDetailScreen:${key}`)
    }

    const workouts = route.params.item;

    const [showAppointmentDialog, setShowAppointmentDialog] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, }}>
                {header()}
                {activitiesinfo()}
            </View>
            {appointentDialog()}
        </SafeAreaView>
    )

    function appointentDialog() {
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

    function workoutsInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => { setShowAppointmentDialog(true) }}
                style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0, borderRadius: Sizes.fixPadding - 2.0 }}
            >
                <ImageBackground
                    source={item.workoutImage}
                    style={styles.imageStyle}
                    borderRadius={Sizes.fixPadding - 2.0}
                    resizeMode="stretch"
                >
                    <Text style={{ margin: Sizes.fixPadding + 5.0, ...Fonts.whiteColor16SemiBold }}>
                        {item.workoutDescription}{`\n`}{item.totalWorkouts} workout
                    </Text>
                    <View style={styles.currencyWrapStyle}>
                    <SimpleLineIcons size={23}
                       name="energy"
                        color={Colors.yellowColor}

                        style={{ alignSelf: 'flex-end', margin: Sizes.fixPadding - 5.0, }}
                         />
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={workouts.workouts}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
            />
        )
    }
function activitiesinfo(){
    const renderItem = ({ item }) => (

        <TouchableOpacity
                                     onPress={() => { setShowAppointmentDialog(true) }}

                    
                        style={{
                            flex: 1,
        elevation: 2.0,
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
              height: 220,
              width: 330,
              left:15,
              backgroundColor: Colors.DEFAULT_WHITE,
              borderRadius: 20,
              shadowColor: Colors.DARK_ONE,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
    
              elevation: 3,
                       }}>
                       
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
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 15,
                justifyContent: 'space-between',
                paddingVertical: 10,
              }}>
              <View >
                <Text numberOfLines={1} style={{fontSize: 14, ...Fonts.blackColor16Bold,}}>
                {item.workoutDescription}
                </Text>
                
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                <MaterialIcons name="fitness-center" size={16} color={Colors.primaryColor} /> {item.totalWorkouts} workout 
                    </Text>
              </View>

            </View>
    
                    </TouchableOpacity>
        )
        return (
            <FlatList
                data={workouts.workouts}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                numColumns={1}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding +5}}
                showsVerticalScrollIndicator={false}
            />
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
                <Text style={{ marginHorizontal: Sizes.fixPadding+5, ...Fonts.primaryColor18SemiBold,alignItems:'center' }}>
                    {workouts.category}
                </Text>
            </View>
        )
    }

}
export default WorkoutCategoryDetailScreen;

const styles = StyleSheet.create({
    currencyWrapStyle: {
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        right: 5.0,
        top: 5.0,
        position: 'absolute',
    },
    imageStyle: {
        height: height / 4.0,
        justifyContent: 'flex-end'
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
})