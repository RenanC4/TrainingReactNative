import React from 'react'
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers'

import {connect} from 'react-redux'
import {Platform, View, Text, StyleSheet} from 'react-native';

import TabBarIcon from '../components/TabBarIcon';

import LoginScreen from "../screens/LoginScreen/LoginScreen";
import WorkOrderDetailsScreen from "../screens/WorkOrderDetailsScreen/WorkOrderDetailsScreen";
import EditWorkOrderScreen from "../screens/EditWorkOrderScreen/EditWorkOrderScreen";

import ResumeScreen from "../screens/ResumeScreen/ResumeScreen";
import WorkOrdersScreen from "../screens/WorkOrdersScreen/WorkOrdersScreen";
import SyncScreen from "../screens/SyncScreen/SyncScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";

import TabBarStyles from "../styles/TabBarStyles";
import NewWorkOrderScreen from "../screens/NewWorkOrderScreen/NewWorkOrderScreen";

//whithout bottom navigation
export const ACTION_OPEN_LOGIN = {
  action: 'ACTION_OPEN_LOGIN',
  routeName: 'Login'
};

export const ACTION_OPEN_WORK_ORDER_DETAILS = {
  action: 'ACTION_OPEN_WORK_ORDER_DETAILS',
  routeName: 'WorkOrderDetails'
};

export const ACTION_OPEN_EDIT_WORK_ORDER = {
  action: 'ACTION_OPEN_EDIT_WORK_ORDER',
  routeName: 'EditWorkOrder'
};

export const ACTION_OPEN_NEW_WORK_ORDER = {
  action: 'ACTION_OPEN_NEW_WORK_ORDER',
  routeName: 'NewWorkOrder'
};

//whithout bottom navigation

//with bottom navigation
export const ACTION_OPEN_MAIN = {
  action: 'ACTION_OPEN_MAIN',
  routeName: 'Main'
};
export const ACTION_OPEN_RESUME = {
  action: 'ACTION_OPEN_RESUME',
  routeName: 'Resume'
};
export const ACTION_OPEN_WORK_ORDERS = {
  action: 'ACTION_OPEN_WORK_ORDERS',
  routeName: 'WorkOrders'
};
export const ACTION_OPEN_SYNC = {
  action: 'ACTION_OPEN_SYNC',
  routeName: 'Sync'
};
export const ACTION_OPEN_SETTINGS = {
  action: 'ACTION_OPEN_SETTINGS',
  routeName: 'Settings'
};

//with bottom navigation


const NavigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.navigation
);


/* RESUME STACK */
const ResumeStack = createStackNavigator({
  Resume: ResumeScreen,
});

ResumeStack.navigationOptions = {
  tabBarLabel: () => (
    <Text style={navigatorStyles.bottomNavigationItem}>
      DASHBOARD
    </Text>
  ),
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
  tabBarLabel: () => (
    <Text style={navigatorStyles.bottomNavigationItem}>
      WORK ORDERS
    </Text>
  ),
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
  tabBarLabel: () => (
    <Text style={navigatorStyles.bottomNavigationItem}>
      SYNC
    </Text>
  ),
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
  tabBarLabel: () => (
    <Text style={navigatorStyles.bottomNavigationItem}>
      CONFIG
    </Text>
  ),
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      color="#fff"
      focused={focused}
      name="ios-settings"
    />
  ),
};

const BottomTabNavigator = createBottomTabNavigator({
  ResumeStack,
  WorkOrderStack,
  SyncStack,
  SettingsStack,
}, {
  tabBarOptions: TabBarStyles,
  animationEnabled: true,
});

const navigatorStyles = StyleSheet.create({
  bottomNavigationItem: {
    color: '#fff',
    fontSize: 10,
    position: 'relative',
    top: -3,
    left: Platform.OS === 'ios' ? 15 : 0,
    textAlign: Platform.OS === 'ios' ? 'left' : 'center'
  }
});

const RootNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
      tabBarVisible: false,
    }
  },
  NewWorkOrder: {
    screen: NewWorkOrderScreen,
    navigationOptions: {
      header: null,
      tabBarVisible: true,
    }
  },
  WorkOrderDetails: {
    screen: WorkOrderDetailsScreen,
    navigationOptions: {
      header: null,
      tabBarVisible: true,
    }
  },
  EditWorkOrder: {
    screen: EditWorkOrderScreen,
    navigationOptions: {
      header: null,
      tabBarVisible: true,
    }
  },
  Main: {
    screen: BottomTabNavigator,
    navigationOptions: {
      header: null,
    }
  },
});

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.navigation,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export {RootNavigator, AppNavigator, NavigationMiddleware};