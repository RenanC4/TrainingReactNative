import React from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Text, Button, Card} from 'react-native-ui-lib';
import {connect} from "react-redux";
import * as NavigationActions from "../../actions/navigator";
import WorkOrderCarousellItemStyles from './WorkOrderCarouselItemStyles';
import moment from 'moment';


import {Ionicons} from '@expo/vector-icons';

class WorkOrderCarouselItem extends React.Component {

  render() {
    return (
        <TouchableWithoutFeedback onPress={() => this.props.onWorkOrderDetailsClick(this.props.item.Id, this.props.item.WorkOrderId)}>
          <Card style={WorkOrderCarousellItemStyles.card}
                containerStyle={WorkOrderCarousellItemStyles.container}
                elevation={7}
                width={170}
                height={170}
                borderRadius={0}>

            <Text style={[styles.detailsStatusInner,
              this.props.item.StatusId == 'CLOSE' ? styles.detailsStatusInnerCLOSE :
                  this.props.item.StatusId == 'CAN' ? styles.detailsStatusInnerCAN :
                      this.props.item.StatusId == 'APPR' ? styles.detailsStatusInnerAPPR :
                          this.props.item.StatusId == 'WPCOND' ? styles.detailsStatusInnerWPCOND :
                              this.props.item.StatusId == 'COMP' ? styles.detailsStatusInnerCOMP :
                                  this.props.item.StatusId == 'HISTEDIT' ? styles.detailsStatusInnerHISTEDIT :
                                      this.props.item.StatusId == 'WORKING' ? styles.detailsStatusInnerWORKING :
                                          this.props.item.StatusId == 'WAPPR' ? styles.detailsStatusInnerWAPPR :
                                              this.props.item.StatusId == 'WMATL' ? styles.detailsStatusInnerWMATL :
                                                  this.props.item.StatusId == 'WSCH' ? styles.detailsStatusInnerWSCH :
                                                      this.props.item.StatusId == 'INPRG' ? styles.detailsStatusInnerINPRG :'#fff'
            ]}>
              <Ionicons
                  name={this.props.item.StatusId == 'CAN' ? "md-close" : "md-checkmark"}
                  size={25}
                  style={WorkOrderCarousellItemStyles.detailsStatusIcon}
                  color={this.props.item.StatusId == 'CAN' ? '#f65752' :
                      this.props.item.StatusId == 'CLOSE' ? '#39b54a' :
                          this.props.item.StatusId == 'APPR' ? '#4488f2' :
                              this.props.item.StatusId == 'WPCOND' ? '#4488f2' :
                                  this.props.item.StatusId == 'COMP' ? '#39b54a' :
                                      this.props.item.StatusId == 'HISTEDIT' ? '#39b54a' :
                                          this.props.item.StatusId == 'WORKING' ? '#f2d935' :
                                              this.props.item.StatusId == 'WAPPR' ? '#e59323' :
                                                  this.props.item.StatusId == 'WMATL' ? '#f2d935' :
                                                      this.props.item.StatusId == 'WSCH' ? '#e59323' :
                                                          this.props.item.StatusId == 'INPRG' ? '#39b54a' : '#fff'
                  }
              />
            </Text>
            <Text numberOfLines={1}
                style={WorkOrderCarousellItemStyles.workOrderDescription}>{this.props.item.Description != null ? this.props.item.Description : 'No Description'}</Text>
            <Text
                style={WorkOrderCarousellItemStyles.workOrderOpenedDate}>{moment(this.props.item.DtStatusUpdate).format('DD/MM/YYYY HH:mm')}</Text>
            <Button style={WorkOrderCarousellItemStyles.workOrderMoreInfoButton}>
              <Text style={WorkOrderCarousellItemStyles.workOrderMoreInfoButtonText} onPress={() => this.props.onWorkOrderDetailsClick(this.props.item.Id, this.props.item.WorkOrderId)}>
                MORE INFO
              </Text>
            </Button>
          </Card>
        </TouchableWithoutFeedback>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onWorkOrderDetailsClick: (id, woId) => {
      dispatch({type: NavigationActions.ACTION_OPEN_WORK_ORDER_DETAILS.action, payload: {id: id, woId: woId}})
    }
  }
}

export default connect(null, mapDispatchToProps)(WorkOrderCarouselItem);

const styles = StyleSheet.create({
  detailsStatusInner: {
    width: 50,
    height: 50,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 50,
    borderColor: '#000',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
    paddingTop: 13,
  },
  detailsStatusInnerCLOSE: {
    borderColor: '#39b54a',
  },
  detailsStatusInnerCAN: {
    borderColor: '#f65752',
  },
  detailsStatusInnerAPPR: {
    borderColor: '#4488f2',
  },
  detailsStatusInnerWPCOND: {
    borderColor: '#4488f2',
  },
  detailsStatusInnerHISTEDIT: {
    borderColor: '#39b54a',
  },
  detailsStatusInnerCOMP: {
    borderColor: '#39b54a',
  },
  detailsStatusInnerWORKING: {
    borderColor: '#f2d935',
  },
  detailsStatusInnerWAPPR: {
    borderColor: '#e59323',
  },
  detailsStatusInnerWMATL: {
    borderColor: '#f2d935',
  },
  detailsStatusInnerWSCH: {
    borderColor: '#e59323',
  },
  detailsStatusInnerINPRG: {
    borderColor: '#39b54a',
  },

});
