import React from 'react';

import {FloatingAction} from 'react-native-floating-action';
import {connect} from "react-redux";
import {Ionicons} from '@expo/vector-icons';


const actions = [
  {
    text: 'Discard changes',
    icon: <Ionicons style={{fontSize: 25, color: '#fff'}} name="md-close"/>,
    name: 'ACTION_OPEN_WORK_ORDER_DETAILS',
    position: 1,
  },
  {
    text: 'Save Work Order',
    icon: <Ionicons style={{fontSize: 25, color: '#fff'}} name="md-checkmark"/>,
    name: 'ACTION_SAVE_EDIT_WORK_ORDER',
    position: 2,
    color: '#20b642',
  },
];

class WorkOrderEditFab extends React.Component {

  render() {
    return (
      <FloatingAction
        distanceToEdge={15}
        actions={actions}
        color="#DD0000"
        onPressItem={(name) => name == 'ACTION_SAVE_EDIT_WORK_ORDER' ? this.props.onEditButtonClick() : this.props.onCancelButtonClick()}
      />
    )
  }
}

export default connect(null, null)(WorkOrderEditFab);