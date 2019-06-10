import React from 'react';

import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import ResumeScreen from '../screens/ResumeScreen/ResumeScreen';
import WorkOrdersScreen from '../screens/WorkOrdersScreen/WorkOrdersScreen';
import SyncScreen from '../screens/SyncScreen/SyncScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';

import TabBarStyles from '../styles/TabBarStyles';

/* RESUME STACK */
const ResumeStack = createStackNavigator({
  Resume: ResumeScreen,
});

ResumeStack.navigationOptions = {
  tabBarLabel: 'RESUME',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name="ios-apps"
    />
  ),
};

/* WORK ORDER STACK */
const WorkOrderStack = createStackNavigator({
  WorkOrders: WorkOrdersScreen,
});

WorkOrderStack.navigationOptions = {
  tabBarLabel: 'WORK ORDERS',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name="ios-checkmark-circle-outline"
    />
  ),
};

/* SYNC STACK */
const SyncStack = createStackNavigator({
  Sync: SyncScreen,
});

SyncStack.navigationOptions = {
  tabBarLabel: 'SYNC',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name="md-sync"
    />
  ),
};

/* SETTINGS STACK */
const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'CONFIG',

  tabBarIcon: ({focused}) => (
    <TabBarIcon
      color="#fff"
      focused={focused}
      name="ios-settings"
      selectedLabelStyle={TabBarStyles.tabBarItemSelected}
    />
  ),
};

export default createBottomTabNavigator({
  ResumeStack,
  WorkOrderStack,
  SyncStack,
  SettingsStack,
}, {
  tabBarOptions: TabBarStyles,
  animationEnabled: true
});
