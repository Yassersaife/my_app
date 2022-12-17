import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon, { Icons } from '../constants/Icons';
import { Colors, Fonts, Sizes,images } from '../constants/styles';

import * as Animatable from 'react-native-animatable';
import HomeScreen from '../screens/home/homeScreen';
import ShopScreen from '../screens/shop/ShopScreen';
import clubsScreen from '../screens/clubsScreen/clubs';
import DietCategoriesScreen from '../screens/diet/dietCategoriesScreen';
import DietCategoryDetailScreen from '../screens/diet/dietCategoryDetailScreen';
import DietScreen from '../screens/diet/dietScreen';
import InsightScreen from '../screens/insight/insightScreen';
import MapTestScreen from '../screens/maps/MapsScreen';
import ProfileScreen from '../screens/profile/profileScreen';
import WorkoutScreen from '../screens/workout/workoutScreen';
const TabArr = [
  { route: 'Home', label: 'Home', type: Icons.Ionicons, activeIcon: 'grid', inActiveIcon: 'grid-outline', component:HomeScreen },
  { route: 'Clubs', label: 'chat', type: Icons.MaterialCommunityIcons, activeIcon: 'heart-plus', inActiveIcon: 'heart-plus-outline', component: InsightScreen },
  { route: 'map', label: 'map', type: Icons.MaterialCommunityIcons, activeIcon: 'timeline-plus', inActiveIcon: 'timeline-plus-outline',component: DietScreen },
  { route: 'shop', label: 'shop', type: Icons.FontAwesome, activeIcon: 'user-circle', inActiveIcon: 'user-circle-o', component: WorkoutScreen},
  { route: 'rrr', label: 'shop', type: Icons.FontAwesome, activeIcon: 'user-circle', inActiveIcon: 'user-circle-o', component: ProfileScreen},

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
        <Icon type={item.type} name={focused ? item.activeIcon : item.inActiveIcon} color={focused ? Colors.lightPrimaryColor : Colors.primaryColor} />
      </Animatable.View>
    </TouchableOpacity>
  )
}

export default function BottomTabs() {
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