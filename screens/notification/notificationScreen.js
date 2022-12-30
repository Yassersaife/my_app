import { StyleSheet, Text, View, FlatList, Animated, Dimensions, SafeAreaView, StatusBar } from 'react-native'
import React, { useState, useRef } from 'react'
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const rowTranslateAnimatedValues = {};

const newNotificationsList = [
    {
        key: '1',
        title: "Congratulation",
        description: "50% of your daiy task is completed.",
        notificationTime: "2 min",
    },
    {
        key: '2',
        title: "Attention",
        description: "Your plan is expire very soon. subscribe now",
        notificationTime: "2 min",
    },
];

const oldNotificationsList = [
    {
        key: '1',
        title: "Daily Task",
        description: "It’s time to drink a water.",
        notificationTime: "3:00 PM",
    },
    {
        key: '2',
        title: "Drink more",
        description: "You drink only 200ml today. to reach your goal yo drink 500ml more.",
        notificationTime: "5:00 PM",
    },
    {
        key: '3',
        title: "Appointment",
        description: "You fix appointment yoga specialist mr joy.",
        notificationTime: "9:00 PM",
    },
];

const NotificationScreen = ({ navigation }) => {

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`notificationScreen:${key}`)
    }

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [snackBarMsg, setSnackBarMsg] = useState('');

    const [listData, setListData] = useState(newNotificationsList);
    const [oldListData, setOldListData] = useState(oldNotificationsList);

    Array(listData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    Array(oldListData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        if (
            value < -width &&
            !animationIsRunning.current
        ) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = listData.find(item => item.key === key);

                setSnackBarMsg(`${removedItem.title} ${tr('dismissed')}`);

                setListData(newData);

                setShowSnackBar(true);

                animationIsRunning.current = false;
            });
        }
    };

    const renderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: ['0%', '100%'],
                        outputRange: ['0%', '100%'],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <View style={{ ...styles.notificationWrapStyle, }}>
                    <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, }}>
                            <Text style={{ ...Fonts.blackColor16Medium }}>
                                {data.item.title}
                            </Text>
                            <Text style={{ ...Fonts.blackColor14Regular }}>
                                {data.item.description}
                            </Text>
                        </View>
                        <Text style={{ ...Fonts.primaryColor16Medium }}>
                            {data.item.notificationTime}
                        </Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
        </View>
    );

    const oldOnSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        if (
            value < -Dimensions.get('window').width &&
            !animationIsRunning.current
        ) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...oldListData];
                const prevIndex = oldListData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = oldListData.find(item => item.key === key);

                setSnackBarMsg(`${removedItem.title} ${tr('dismissed')}`);

                setOldListData(newData);

                setShowSnackBar(true);

                animationIsRunning.current = false;
            });
        }
    };

    const oldRenderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: ['0%', '100%'],
                        outputRange: ['0%', '100%'],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <View style={{
                    ...styles.notificationWrapStyle,
                    borderWidth: 1.0,
                    elevation: 1.0
                }}>
                    <View style={{ flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, }}>
                            <Text style={{ ...Fonts.blackColor16Medium }}>
                                {data.item.title}
                            </Text>
                            <Text style={{ ...Fonts.blackColor14Regular }}>
                                {data.item.description}
                            </Text>
                        </View>
                        <Text style={{ ...Fonts.primaryColor16Medium }}>
                            {data.item.notificationTime}
                        </Text>
                    </View>
                </View>
            </View>
        </Animated.View>
    );

    const oldRenderHiddenItem = () => (
        <View style={styles.rowBack}>
        </View>
    );

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

    function newNotificationInfo() {
        return (
            <View>
                {
                    listData.length == 0
                        ?
                        null
                        :
                        <Text style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                            {tr('new')}
                        </Text>
                }
                <SwipeListView
                    listKey='newList'
                    disableRightSwipe
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-width}
                    onSwipeValueChange={onSwipeValueChange}
                    useNativeDriver={false}
                />
            </View>
        )
    }

    function oldNotificationInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
                {
                    oldListData.length == 0
                        ?
                        null
                        :
                        <Text style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.grayColor16SemiBold }}>
                            {tr('yesterday')}
                        </Text>
                }
                <SwipeListView
                    listKey='oldNotification'
                    disableRightSwipe
                    data={oldListData}
                    renderItem={oldRenderItem}
                    renderHiddenItem={oldRenderHiddenItem}
                    rightOpenValue={-width}
                    onSwipeValueChange={oldOnSwipeValueChange}
                    useNativeDriver={false}
                />
            </View>
        )
    }

    function noNotificationInfo() {
        return (
            <View style={styles.noNotificationWrapStyle}>
                <MaterialIcons name="notifications-off" size={40} color={Colors.grayColor} />
                <Text style={{ ...Fonts.grayColor16Medium, marginTop: Sizes.fixPadding }}>
                    {tr('noNotification')}
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {listData.length == 0 && oldListData.length == 0 ?
                    noNotificationInfo()
                    :
                    <FlatList
                        ListHeaderComponent={
                            <>
                                {newNotificationInfo()}
                                {oldNotificationInfo()}
                            </>
                        }
                    />
                }
                <Snackbar
                    style={styles.snackBarStyle}
                    visible={showSnackBar}
                    onDismiss={() => setShowSnackBar(false)}
                >
                    {snackBarMsg}
                </Snackbar>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    rowBack: {
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        flex: 1,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    snackBarStyle: {
        backgroundColor: Colors.lightBlackColor,
        elevation: 0.0,
    },
    notificationWrapStyle: {
        borderWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 2.0,
        borderColor: Colors.primaryColor,
    },
    noNotificationWrapStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Sizes.fixPadding * 3.0
    }
});

export default NotificationScreen;