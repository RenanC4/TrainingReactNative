import React from 'react';
import {Text, View, FlatList, ActivityIndicator, BackHandler} from 'react-native';
import WorkOrderCarouselItem from "./WorkOrderCarouselItem";
import {workOrderListRequest, workOrderListRequestByDateFilter} from "../../actions/workOrder/workOrder";
import * as workOrderReducer from '../../reducers/workOrder/workOrder';
import {connect} from "react-redux";
import * as UserReducer from "../../reducers/user/user";
import LoaderScreen from "react-native-ui-lib/typings/screensComponents/loaderScreen";
import * as DateFilter from "../../reducers/dateFilter/dateFilter";

import moment from "moment";

class WorkOrderCarousel extends React.Component {

  state = {
    previousIndex: undefined,
    data: {},

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dateFilter.data.index) {
      if (this.state.previousIndex != nextProps.dateFilter.data.index) {
        this.props.getWorkOrders(nextProps.userData.data.Token, nextProps.dateFilter.data.data);
        this.setState({previousIndex: nextProps.dateFilter.data.index})
      }
    }

  }

  render() {
    return (
        <View style={{height: 200, marginTop: 0}}>

          {this.props.workOrders == null || this.props.workOrders.data.Count == 0 &&
          <View style={{position: 'absolute', width: '100%', height: '100%',}}>
            <Text style={{textAlign: 'center', marginTop: 70, fontSize: 18, color: '#000'}}>
              No Work Orders for today
            </Text>
          </View>
          }
          {this.props.workOrders == null &&
          <View style={{position: 'absolute', width: '100%', height: '100%', zIndex: 10000}}>

            <LoaderScreen
                style={{margin: 20}}
                color="#00aeee"
                overlay={false}
            />

          </View>
          }

          {this.props.workOrders != null &&
          <FlatList horizontal={true}
                    data={this.props.workOrders.data.Records}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => <WorkOrderCarouselItem item={item}/>}
                    keyExtractor={(item, index) => index.toString()}
          />
          }
        </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    dateFilter: DateFilter.getFilterSelected(state),
    userData: UserReducer.getUserData(state),
    workOrders: workOrderReducer.getWorkOrderFilteredByDate(state),
    navigation: state.navigation,
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    getWorkOrders: (token, date) => {
      dispatch(workOrderListRequestByDateFilter(token, date))
    }
  })
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(WorkOrderCarousel);
