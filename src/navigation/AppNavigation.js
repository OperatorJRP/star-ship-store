import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/homeScreen/HomeScreen'
import SearchScreen from '../screens/searchScreen/SearchScreen'
import CartScreen from '../screens/cartScreen/CartScreen'
import { Ionicons } from '@expo/vector-icons'
import { ROUTES, TAB_LABELS, ROUTE_TITLES } from './NavigationConstants'
import { TAB_ICONS } from './TabIcons'
import { colors } from '../utils/Color'

const Tab = createBottomTabNavigator()

const screenOptions = ({ route }) => {
  const name = route.name
  const iconConfig = TAB_ICONS[name] || {}
  return {
    headerShown: true,
    tabBarIcon: ({ color, size, focused }) => {
      const iconName = focused ? iconConfig.focused : iconConfig.unfocused
      return <Ionicons name={iconName} size={size} color={color} />
    },
    tabBarActiveTintColor: colors.blue,
    tabBarInactiveTintColor: 'gray',
    tabBarLabel: TAB_LABELS[name] ?? name,
  }
}

const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{ title: ROUTE_TITLES[ROUTES.HOME] }}
      />
      <Tab.Screen
        name={ROUTES.SEARCH}
        component={SearchScreen}
        options={{ title: ROUTE_TITLES[ROUTES.SEARCH] }}
      />
      <Tab.Screen
        name={ROUTES.CART}
        component={CartScreen}
        options={{ title: ROUTE_TITLES[ROUTES.CART] }}
      />
    </Tab.Navigator>
  )
}

export default AppNavigator
