
import Icon, { Icons } from '../constants/Icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Fonts, Sizes,images } from '../constants/styles';
import { Entypo } from '@expo/vector-icons'; 

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import * as Animatable from 'react-native-animatable';

import HomeTraninerScreen from '../screens/trainerpages/Home';
import ProfileTrainerScreen from '../screens/trainerpages/profileScreen';

import addScreen from '../screens/trainerpages/AddworkoutScreen';

const TabArr = [
  { route: 'Home', label: 'Home', type: AntDesign, activeIcon: 'home', inActiveIcon: 'home', component:HomeTraninerScreen },
  { route: 'Add', label: 'Workout', type: MaterialIcons, activeIcon: 'add-circle', inActiveIcon: 'add-circle-outline', component: addScreen },
  { route: 'ProfileTrainer', label: 'My Profile', type: Ionicons, activeIcon: 'person-circle-sharp', inActiveIcon: 'person-circle-outline', component: ProfileTrainerScreen},

];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({0: {scale: .5, rotate: '0deg'}, 1: {scale: 1.5, rotate: '360deg'}});
    } else {
      viewRef.current.animate({0: {scale: 1.5, rotate: '360deg'}, 1: {scale: 1, rotate: '0deg'}});
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <Icon type={item.type} name={focused ? item.activeIcon : item.inActiveIcon} color={focused ? Colors.primaryColor : Colors.primary4} />
      </Animatable.View>
    </TouchableOpacity>
  )
}

export default function BottomTabs2() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16
        }
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.route} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})