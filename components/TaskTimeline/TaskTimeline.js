import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {View, Text, Card} from 'react-native-ui-lib';
import {Ionicons} from '@expo/vector-icons';
import * as UserReducer from "../../reducers/user/user";
import {connect} from "react-redux";
import * as workOrderReducer from "../../reducers/workOrder/workOrder";
import {allWorkOrderListRequest} from "../../actions/workOrder/workOrder";
import moment from "moment";
import _ from "lodash";
import * as NavigationActions from "../../actions/navigator";
import TaskTimelineStyles from "../../components/TaskTimeline/TaskTimelineStyles";

class TaskTimeline extends React.Component {

  state = {
    data: {},
  }

  componentWillMount() {
    this.props.getWorkOrders(this.props.userData.data.Token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.allWorkOrders == null) {
      this.props.getWorkOrders(this.props.userData.data.Token);
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <ScrollView>
        <View style={{paddingBottom: 30, paddingTop: 70}}>
          {this.props.allWorkOrders == null || this.props.allWorkOrders.Count == 0 &&
          <View><Text style={{textAlign: 'center', marginTop: 10, fontSize: 18, color: '#000'}}>No Work Orders to
            Timeline yet</Text></View>
          }

          {this.props.allWorkOrders != null && this.props.allWorkOrders.Count > 0 &&
          <View><Text style={TaskTimelineStyles.timeLineWrapperText}>TASKS TIMELINE</Text></View>
          }

          {this.props.allWorkOrders &&
          <View>
            {_.map(this.props.allWorkOrders.Records, (allWorkOrders, index) =>

              <TouchableWithoutFeedback onPress={() => {
                {
                  this.setState({bringWos: true})
                }
                this.props.onWorkOrderDetailsClick(allWorkOrders.Id, allWorkOrders.WorkOrderId)
              }} key={index}>

                <View flex style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginBottom: 0,
                  marginTop: 12,
                  marginRight: 10,
                  marginLeft: 10,
                  backgroundColor: '#fff',
                  height: 70,

                  elevation: 7,
                }}><View style={{width: 70, zIndex: 0}}>
                  <Text style={[styles.detailsStatusInner,
                    allWorkOrders.StatusId == 'CLOSE' ? styles.detailsStatusInnerCLOSE :
                      allWorkOrders.StatusId == 'CAN' ? styles.detailsStatusInnerCAN :
                        allWorkOrders.StatusId == 'APPR' ? styles.detailsStatusInnerAPPR :
                          allWorkOrders.StatusId == 'WPCOND' ? styles.detailsStatusInnerWPCOND :
                            allWorkOrders.StatusId == 'COMP' ? styles.detailsStatusInnerCOMP :
                              allWorkOrders.StatusId == 'HISTEDIT' ? styles.detailsStatusInnerHISTEDIT :
                                allWorkOrders.StatusId == 'WORKING' ? styles.detailsStatusInnerWORKING :
                                  allWorkOrders.StatusId == 'WAPPR' ? styles.detailsStatusInnerWAPPR :
                                    allWorkOrders.StatusId == 'WMATL' ? styles.detailsStatusInnerWMATL :
                                      allWorkOrders.StatusId == 'WSCH' ? styles.detailsStatusInnerWSCH :
                                        allWorkOrders.StatusId == 'INPRG' ? styles.detailsStatusInnerINPRG : '#fff'
                  ]}>
                    <Ionicons
                      name={allWorkOrders.StatusId == 'CAN' ? "md-close" : "md-checkmark"}
                      size={36}
                      color={allWorkOrders.StatusId == 'CAN' ? '#f65752' :
                        allWorkOrders.StatusId == 'CLOSE' ? '#39b54a' :
                          allWorkOrders.StatusId == 'APPR' ? '#4488f2' :
                            allWorkOrders.StatusId == 'WPCOND' ? '#4488f2' :
                              allWorkOrders.StatusId == 'COMP' ? '#39b54a' :
                                allWorkOrders.StatusId == 'HISTEDIT' ? '#39b54a' :
                                  allWorkOrders.StatusId == 'WORKING' ? '#f2d935' :
                                    allWorkOrders.StatusId == 'WAPPR' ? '#e59323' :
                                      allWorkOrders.StatusId == 'WMATL' ? '#f2d935' :
                                        allWorkOrders.StatusId == 'WSCH' ? '#e59323' :
                                          allWorkOrders.StatusId == 'INPRG' ? '#39b54a' : '#fff'}
                    />
                  </Text>
                </View>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{width: 250, height: 30, alignSelf: 'flex-start'}}>
                      <Text numberOfLines={1} style={{
                        fontFamily: 'sf-medium',
                        fontWeight: 'bold',
                        fontSize: 17,
                        textAlign: 'left',
                        color: '#313131',
                        marginTop: 10,
                        marginLeft: 10,
                        marginRight: 15,
                      }}>{allWorkOrders.Description ? (allWorkOrders.Description).toUpperCase() : ' No Description'}
                      </Text>
                    </View>
                    <View style={{width: 250, height: 30, marginTop: 0}}>
                      <Text style={{
                        fontWeight: 'bold',
                        flex: 1,
                        fontSize: 12,
                        marginLeft: 10,
                        textAlign: 'left',
                        color: '#656565',
                      }}>#{allWorkOrders.WorkOrderId} {moment(allWorkOrders.DtStatusUpdate).format('DD/MM/YYYY HH:mm ')}
                      </Text>
                    </View>
                    <View style={{width: 250, height: 30, marginTop: -15}}>
                      <Text style={{
                        fontWeight: 'bold',
                        flex: 1,
                        fontSize: 12,
                        marginLeft: 10,
                        textAlign: 'left',
                        color: '#656565',
                      }}>
                        <Text style={TaskTimelineStyles.timeLineDescName}> {allWorkOrders.ReportedById}</Text>
                        {allWorkOrders.StatusId == 'CLOSE' ? ' Closed the task' :
                          allWorkOrders.StatusId == 'CAN' ? ' Canceled the task' :
                            allWorkOrders.StatusId == 'APPR' ? ' Approved the task' :
                              allWorkOrders.StatusId == 'WPCOND' ? ' WPCOND the task' :
                                allWorkOrders.StatusId == 'HISTEDIT' ? ' HISTEDIT the task' :
                                  allWorkOrders.StatusId == 'WORKING' ? ' is Working on the task' :
                                    allWorkOrders.StatusId == 'WAPPR' ? ' is waiting approval for the task' :
                                      allWorkOrders.StatusId == 'WMATL' ? ' WMATL the task' :
                                        allWorkOrders.StatusId == 'WSCH' ? ' is waiting schedule for the task' :
                                          allWorkOrders.StatusId == 'INPRG' ? ' is doing the task' : ' didn\'t reported a status'}

                      </Text>

                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>)}
          </View>
          }
        </View>
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    userData: UserReducer.getUserData(state),
    allWorkOrders: workOrderReducer.getAllWorkOrders(state),
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    getWorkOrders: (token) => {
      dispatch(allWorkOrderListRequest(token))
    },
    onWorkOrderDetailsClick: (id, woId) => {
      dispatch({
        type: NavigationActions.ACTION_OPEN_WORK_ORDER_DETAILS.action,
        payload: {id: id, woId: woId}
      })
    }
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
(TaskTimeline);


const styles = StyleSheet.create({
  detailsStatusIndicator: {
    fontFamily: 'sf-semibold',
    fontSize: 9,
    backgroundColor: '#56af30',
    color: '#fff',
    textAlign: 'center',
    borderRadius: 15,
    marginLeft: 5,
    marginBottom: 5

  },

  detailsStatusIndicatorCLOSE: {
    backgroundColor: '#39b54a',
  },
  detailsStatusIndicatorCAN: {
    backgroundColor: '#f65752',
  },
  detailsStatusIndicatorAPPR: {
    backgroundColor: '#4488f2',
  },
  detailsStatusIndicatorWPCOND: {
    backgroundColor: '#4488f2',
  },
  detailsStatusIndicatorHISTEDIT: {
    backgroundColor: '#39b54a',
  },
  detailsStatusIndicatorCOMP: {
    backgroundColor: '#39b54a',
  },
  detailsStatusIndicatorWORKING: {
    backgroundColor: '#f2d935',
  },
  detailsStatusIndicatorWAPPR: {
    backgroundColor: '#e59323',
  },
  detailsStatusIndicatorWMATL: {
    backgroundColor: '#f2d935',
  },
  detailsStatusIndicatorWSCH: {
    backgroundColor: '#e59323',
  },
  detailsStatusIndicatorINPRG: {
    backgroundColor: '#39b54a',
  },

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
    paddingTop: 5,
    marginLeft: 5,
    marginBottom: 3
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

