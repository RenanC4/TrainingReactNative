import * as Actions from './../actions/navigator'
import {StackActions} from 'react-navigation'
import {RootNavigator} from '../actions/navigator'

const router = RootNavigator.router;
const initialAction = router.getActionForPathAndParams(Actions.ACTION_OPEN_LOGIN.routeName);
const initialState = router.getStateForAction(initialAction);

export default function navigation(state = initialState, action) {
  let nextState;

  switch (action.type) {
    case Actions.ACTION_OPEN_MAIN.action:
      nextState = router.getStateForAction(
        StackActions.replace({routeName: Actions.ACTION_OPEN_MAIN.routeName}),
        state
      );
      break;
    case Actions.ACTION_OPEN_LOGIN.action:
      nextState = router.getStateForAction(
        StackActions.replace({routeName: Actions.ACTION_OPEN_LOGIN.routeName}),
        state
      );
      break;
    case Actions.ACTION_OPEN_WORK_ORDER_DETAILS.action:
      nextState = router.getStateForAction(
        StackActions.push({routeName: Actions.ACTION_OPEN_WORK_ORDER_DETAILS.routeName, params: action.payload}),
        state
      );
      break;
    case Actions.ACTION_OPEN_EDIT_WORK_ORDER.action:
      nextState = router.getStateForAction(
        StackActions.push({routeName: Actions.ACTION_OPEN_EDIT_WORK_ORDER.routeName, params: action.payload}),
        state
      );
      break;
    case Actions.ACTION_OPEN_NEW_WORK_ORDER.action:
      nextState = router.getStateForAction(
        StackActions.push({routeName: Actions.ACTION_OPEN_NEW_WORK_ORDER.routeName}),
        state
      );
      break;
    case Actions.ACTION_OPEN_RESUME.action:
      nextState = router.getStateForAction(
        StackActions.push({routeName: Actions.ACTION_OPEN_RESUME.routeName}),
        state
      );
      break;
    case Actions.ACTION_OPEN_WORK_ORDERS.action:
      nextState = router.getStateForAction(
        StackActions.push({routeName: Actions.ACTION_OPEN_WORK_ORDERS.routeName}),
        state
      );
      break;
    case Actions.ACTION_OPEN_SYNC.action:
      nextState = router.getStateForAction(
        StackActions.push({routeName: Actions.ACTION_OPEN_SYNC.routeName}),
        state
      );
      break;
    case Actions.ACTION_OPEN_SETTINGS.action:
      nextState = router.getStateForAction(
        StackActions.push({routeName: Actions.ACTION_OPEN_SETTINGS.routeName}),
        state
      );
      break;
    default:
      nextState = router.getStateForAction(action, state);
      break;
  }

  return nextState || state
}