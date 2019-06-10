import React from 'react';

import {FloatingAction} from 'react-native-floating-action';
import {connect} from "react-redux";
import { Ionicons } from '@expo/vector-icons';

const actions = [
  {
    text: 'New Work Order',
    icon: <Ionicons style={{fontSize: 25, color: '#fff'}} name="ios-checkmark-circle-outline"/>,
    name: 'ACTION_OPEN_NEW_WORK_ORDER',
    position: 1
  },
];

class WorkOrderFab extends React.Component {

  render() {
    return (
      <FloatingAction
        distanceToEdge={15}
        actions={actions}
        color="#DD0000"
        onPressItem={(name) => this.props.onNewWorkOrderButtonClick(name)}
      />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onNewWorkOrderButtonClick: (action) => {
      dispatch({type: action});
      return true;
    }
  }
}

export default connect(null, mapDispatchToProps)(WorkOrderFab);