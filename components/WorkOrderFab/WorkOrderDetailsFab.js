import React from 'react';

import {FloatingAction} from 'react-native-floating-action';
import {connect} from "react-redux";
import {Ionicons} from '@expo/vector-icons';

const actions = [
  {
    text: 'Edit Work Order',
    icon: <Ionicons style={{fontSize: 25, color: '#fff'}} name="md-create"/>,
    name: 'ACTION_OPEN_EDIT_WORK_ORDER',
    position: 1
  },
];

class WorkOrderDetailsFab extends React.Component {
  state = {};
  render() {
    return (
      <FloatingAction
        distanceToEdge={15}
        actions={actions}
        color="#DD0000"
        onPressItem={(name) => this.props.onEditWorkOrderButtonClick(name, this.props.id)}
      />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onEditWorkOrderButtonClick: (action, id) => {
      dispatch({type: action, payload: {id: id}});
      return true;
    },
  }
}

export default connect(null, mapDispatchToProps)(WorkOrderDetailsFab);