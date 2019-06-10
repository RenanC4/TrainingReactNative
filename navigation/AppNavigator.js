import React from 'react';
import {createStackNavigator, createSwitchNavigator, NavigationActions} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import WorkOrderDetailsScreen from "../screens/WorkOrderDetailsScreen/WorkOrderDetailsScreen";
import NewWorkOrderScreen from "../screens/NewWorkOrderScreen/NewWorkOrderScreen";
import EditWorkOrderScreen from "../screens/EditWorkOrderScreen/EditWorkOrderScreen";

/* LOGIN STACK (outside of the bottom navigation) */

// NavigationService.js


let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

export function navigate(routeName, params) {
  _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      })
  );
}


const LoginStack = createStackNavigator({
  Login: LoginScreen,
});
LoginStack.navigationOptions = {
  tabBarVisible: false,
};

/* WORK ORDER DETAILS (outside of the bottom navigation) */
const WorkOrderDetailsStack = createStackNavigator({
  WorkOrderDetails: WorkOrderDetailsScreen,
});
WorkOrderDetailsStack.navigationOptions = {
  tabBarVisible: true,
};

/* WORK ORDER EDIT (outside of the bottom navigation) */
const EditWorkOrderStack = createStackNavigator({
  EditWorkOrder: EditWorkOrderScreen,
});
EditWorkOrderStack.navigationOptions = {
  tabBarVisible: true,
};

/* NEW WORK ORDER (outside of the bottom navigation) */
const NewWorkOrderStack = createStackNavigator({
  NewWorkOrder: NewWorkOrderScreen,
});
NewWorkOrderStack.navigationOptions = {
  tabBarVisible: true,
};

export default createSwitchNavigator({
  Main: MainTabNavigator, //2
  LoginStack, //1
  NewWorkOrderStack, //4
  WorkOrderDetailsStack, //3
  EditWorkOrderStack, //3
});
