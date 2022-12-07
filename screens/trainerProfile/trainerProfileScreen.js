import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TouchableOpacity, StatusBar, Dimensions, ImageBackground } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import { useTranslation } from 'react-i18next';

const { height, width } = Dimensions.get('window');

const reviews = [
    {
        id: '1',
        userImage: require('../../assets/images/user/user2.png'),
    },
    {
        id: '2',
        userImage: require('../../assets/images/user/user3.png'),
    },
    {
        id: '3',
        userImage: require('../../assets/images/user/user4.png'),
    },
    {
        id: '4',
        userImage: require('../../assets/images/user/user5.png'),
    },
];

const sessions = [
    {
        id: '1',
        sessionThumbImage: require('../../assets/images/exercises/exercise13.png'),
        sessionDate: `14 July 2022`,
        sessionType: "Dumbbell core",
    },
    {
        id: '2',
        sessionThumbImage: require('../../assets/images/exercises/exercise14.png'),
        sessionDate: `25 July 2022`,
        sessionType: "Pushup",
    },
    {
        id: '3',
        sessionThumbImage: require('../../assets/images/exercises/exercise15.png'),
        sessionDate: `30 July 2022`,
        sessionType: "Yoga special"
    },
];

const TrainerProfileScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`trainerProfileScreen:${key}`)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            {collapsibleHeader()}
        </SafeAreaView>
    )

    function collapsibleHeader() {
        const renderContent = () => {
            return (
                <View style={{ flex: 1, }}>
                    {trainerDetail()}
                    {reviewInfo()}
                    {upcomingSecssionInfo()}
                </View>
            )
        }

        const renderNavBar = () => {
            return (
                <View style={{ marginVertical: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                        <MaterialIcons
                            name={isRtl ? "arrow-forward" : "arrow-back"}
                            size={24}
                            color={Colors.whiteColor}
                            onPress={() => navigation.pop()}
                        />
                        <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.whiteColor18SemiBold }}>
                            {tr('header')}
                        </Text>
                    </View>
                    <MaterialIcons
                        name='share'
                        color={'white'}
                        size={25}
                    />
                </View>
            )
        }

        const renderToolBar = () => {
            return (
                <ImageBackground
                    source={require('../../assets/images/trainers/trainer6.png')}
                    style={{ width: '100%', height: height / 2.1, }}
                >
                </ImageBackground>
            )
        }

        return (
            <CollapsibleToolbar
                renderContent={renderContent}
                renderNavBar={renderNavBar}
                renderToolBar={renderToolBar}
                collapsedNavBarBackgroundColor={Colors.primaryColor}
                translucentStatusBar={false}
            />
        )
    }

    function trainerDetail() {
        return (
            <View style={styles.trainerDetailWrapStyle}>
                {trainerNameAndSpeciality()}
                {contactOptions()}
                {expercienceInfo()}
                {otherDetail()}
                {feeAndBookButton()}
            </View>
        )
    }

    function upcomingSecssionInfo() {
        const renderItem = ({ item }) => {
            return (
                <ImageBackground
                    source={item.sessionThumbImage}
                    style={{ width: width / 2.5, height: (width / 2.5) - 30.0, marginRight: Sizes.fixPadding * 2.0, }}
                    borderRadius={Sizes.fixPadding - 2.0}
                >
                    <View style={styles.sessionThumbImageCoverStyle}>
                        <Text style={{ ...Fonts.whiteColor14SemiBold }}>
                            {item.sessionDate}{`\n`}{item.sessionType}
                        </Text>
                    </View>
                </ImageBackground>
            )
        }
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.5 }}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('upcomingSessionTitle')}
                </Text>
                <FlatList
                    data={sessions}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0, paddingTop: Sizes.fixPadding }}
                />
            </View>
        )
    }

    function reviewInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding * 2.5 }}>
                {reviewTitleAndRatingInfo()}
                {totalReviewsAndUserInfo()}
            </View>
        )
    }

    function totalReviewsAndUserInfo() {
        let left = 80;
        return (
            <View style={{ marginTop: Sizes.fixPadding, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                <View style={{ ...styles.totalReviewsWrapStyle, }}>
                    <Text style={{ ...Fonts.whiteColor10SemiBold }}>
                        50k
                    </Text>
                </View>
                {
                    reviews.slice(0, 4).reverse().map((item, index) => {
                        left = left - 20;
                        return (
                            <Image
                                key={`${item.id}`}
                                source={item.userImage}
                                style={{ ...styles.reviewImageStyle, left: left, position: 'absolute' }}
                            />
                        )
                    })
                }
            </View>
        )
    }

    function reviewTitleAndRatingInfo() {
        return (
            <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    {tr('reviews')}
                </Text>
                <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', alignItems: 'center' }}>
                    <MaterialIcons name="star" size={16} color={Colors.yellowColor} />
                    <Text style={{ ...Fonts.blackColor16Regular }}>
                        4.5
                    </Text>
                </View>
            </View>
        )
    }

    function feeAndBookButton() {
        return (
            <View style={{ ...styles.feeAndBookButtonWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <View style={{ backgroundColor: '#E6E6E6', ...styles.buttonStyle, }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                        ₹999/{tr('month')}
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => navigation.push('SubscriptionDetail')}
                    style={{ backgroundColor: Colors.primaryColor, ...styles.buttonStyle, }}
                >
                    <Text style={{ ...Fonts.whiteColor16SemiBold }}>
                        {tr('book')}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function otherDetail() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                {detailShort({ title: tr('work'), description: '09:00 AM to 06:00 PM' })}
                {detailShort({ title: tr('speak'), description: 'English & Hindi' })}
                {detailShort({ title: tr('qualification'), description: 'Diploma in personal tranning' })}
            </View>
        )
    }

    function detailShort({ title, description }) {
        return (
            <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                <Text numberOfLines={1} style={{ width: 100.0, maxWidth: 100.0, ...Fonts.grayColor14Medium }}>
                    {title}
                </Text>
                <Text style={{ marginHorizontal: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Medium }}>
                    :
                </Text>
                <Text style={{ flex: 1, ...Fonts.blackColor14Medium }}>
                    {description}
                </Text>
            </View>
        )
    }

    function expercienceInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.5, flexDirection: isRtl ? 'row-reverse' : 'row', marginHorizontal: Sizes.fixPadding + 5.0 }}>
                {expercienceInfoShort({ count: 18, description: `Work\nexpriance`, bgColor: '#FAE3E1' })}
                {expercienceInfoShort({ count: 600, description: `Job\nCompleted`, bgColor: '#E4E5E7' })}
                {expercienceInfoShort({ count: 60, description: `Client\nServing`, bgColor: '#F5DADE' })}
            </View>
        )
    }

    function expercienceInfoShort({ count, description, bgColor }) {
        return (
            <View style={{ ...styles.expercienceInfoWrapStyle, backgroundColor: bgColor, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor16SemiBold }}>
                    {count}
                </Text>
                <Text numberOfLines={2} style={{ textAlign: 'center', ...Fonts.blackColor14Regular }}>
                    {description}
                </Text>
            </View>
        )
    }

    function contactOptions() {
        return (
            <View style={{ ...styles.contactOptionsWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                {contactOptionsShort({ icon: 'call', onPress: () => { } })}
                {contactOptionsShort({ icon: 'chat', onPress: () => { } })}
                {contactOptionsShort({ icon: 'videocam', onPress: () => { } })}
            </View>
        )
    }

    function contactOptionsShort({ icon, onPress }) {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={onPress}
                style={styles.contactOptionWrapStyle}
            >
                <MaterialIcons name={icon} size={20} color={Colors.blackColor} />
            </TouchableOpacity>
        )
    }

    function trainerNameAndSpeciality() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, alignItems: 'center', }}>
                <Text style={{ ...Fonts.blackColor22SemiBold }}>
                    James Joys
                </Text>
                <Text style={{ ...Fonts.grayColor14SemiBold }}>
                    Yoga specialist
                </Text>
            </View>
        )
    }
}

export default TrainerProfileScreen;

const styles = StyleSheet.create({
    contactOptionWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding - 2.0
    },
    expercienceInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding - 5.0,
        flex: 1,
        padding: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding - 5.0,
        flex: 1,
        borderRadius: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding,
    },
    feeAndBookButtonWrapStyle: {
        marginTop: Sizes.fixPadding * 2.5,
        marginHorizontal: Sizes.fixPadding,
        alignItems: 'center'
    },
    contactOptionsWrapStyle: {
        marginTop: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reviewImageStyle: {
        width: 35.0,
        height: 35.0,
        borderRadius: 17.5,
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
    },
    totalReviewsWrapStyle: {
        width: 35.0,
        height: 35.0,
        borderRadius: 17.5,
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
        left: 85,
        position: 'absolute',
        backgroundColor: '#0F9EB2',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sessionThumbImageCoverStyle: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: Sizes.fixPadding - 2.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    trainerDetailWrapStyle: {
        marginTop: -Sizes.fixPadding * 6.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding + 2.0,
        paddingVertical: Sizes.fixPadding * 2.0,
        elevation: 2.0,
    }
})