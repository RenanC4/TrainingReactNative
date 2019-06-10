import React from 'react';
import {
  ImageBackground,
  ScrollView,
    AsyncStorage
} from 'react-native';

import {View} from 'react-native-ui-lib';
import ProfileDropdown from '../../components/ProfileDropdown';
import WorkOrderDateFilterCarousel from "../../components/WorkOrderDateFilterCarousel/WorkOrderDateFilterCarousel";
import TaskTimeline from "../../components/TaskTimeline/TaskTimeline";
import UserWelcome from "../../components/Header/UserWelcome";
import WorkOrderCarousel from "../../components/WorkOrderCarousel/WorkOrderCarousel";
import * as NavigationActions from '../../actions/navigator';
import {connect} from 'react-redux';
import ResumeScreenStyles from './ResumeScreenStyles';
import WorkOrderFab from '../../components/WorkOrderFab/WorkOrderFab';
import moment from 'moment';
import Toast from 'react-native-easy-toast';
import * as WorkOrderSelectors from "../../reducers/workOrder/workOrder";
import {workOrderListRequest} from "../../actions/workOrder/workOrder";
import * as UserReducer from "../../reducers/user/user";
import LoaderScreen from "react-native-ui-lib/typings/screensComponents/loaderScreen";

class ResumeScreen extends React.Component {

  state = {
    loadingDates: false,
    selectedDate: {
      date: moment(),
      index: 1,
      active: true
    },
    showFab: true,
    showToast: false,
  }

  handleTextLayout(evt) {

    if (evt.nativeEvent.layout.height > evt.nativeEvent.layout.width) {

      this.setState({
        landscape: true,
        portrait: false,
      })

    } else if (evt.nativeEvent.layout.height < evt.nativeEvent.layout.width) {

      this.setState({
        landscape: false,
        portrait: true,
      })
    }
  }

  static navigationOptions = {
    header: null,
  };

  _selectDate = (date) => {
    this.setState({selectedDate: date});
    this.setState({loadingDates: true});
    setTimeout(() => {
      this.setState({loadingDates: false});
    }, 3000)
  }

  _checkForCarouselLoading = (status) => {
    this.setState({loadingDates: status})
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      const value2 = await AsyncStorage.getItem('@MySuperStore:password');
      if (value !== null && value2 !== null) {
        // We have data!!
        console.log('no login a info settada',value, value2);
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  componentDidMount() {
    if (this.props.userData.data.Permissions.length != 0) {
      this.setState({showFab: true});
    }

  }


  render() {
    this._retrieveData();
    if (this.props) {

      if (this.props.getToastMessages) {
        this.refs.toast.show(this.props.getToastMessages, 3000);
      }
    }

    return (

        <View style={{flex: 1, flexGrow: 1}}>

          {this.state.loadingDates &&
          <View style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 10000,
            backgroundColor: 'rgba(255,255,255,0.8)',
          }}>
            <LoaderScreen
                style={{margin: 20}}
                color="#00aeee"
                overlay={false}
            />
          </View>
          }

          <ScrollView style={ResumeScreenStyles.container}
                      onLayout={(event) => this.handleTextLayout(event)}>

            <ImageBackground
                source={require('../../assets/img/bg/bg.png')}
                resizeMode="cover"
                style={ResumeScreenStyles.imageBackground}>

              <View style={ResumeScreenStyles.resumeHeaderContainer}>
                <View style={ResumeScreenStyles.resumeHeaderInner}>
                  <UserWelcome/>
                  <View style={ResumeScreenStyles.profileDropdownWrapper}>
                    <ProfileDropdown imageSource={require('../../assets/img/default-user.jpg')}
                                     navigation={this.props.navigation}/>
                  </View>
                </View>
              </View>

              <View flex style={ResumeScreenStyles.carouselWrapper}>

                <WorkOrderDateFilterCarousel
                    selectedDate={this.state.selectedDate}
                    onSelectDate={this._selectDate}
                />

                <WorkOrderCarousel screenNavigation={this.props.navigation} checkForLoading={(status) => this._checkForCarouselLoading(status)}/>
              </View>

            </ImageBackground>

            <View style={ResumeScreenStyles.timeLineWrapper} flex>
              <TaskTimeline/>
            </View>

          </ScrollView>

          {this.state.showFab == true && <WorkOrderFab/>}


          <Toast ref="toast"/>

        </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    getToastMessages: WorkOrderSelectors.tostMessage(state),
    userData: UserReducer.getUserData(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onWorkOrderDetailsClick: (id) => {
      dispatch({type: NavigationActions.ACTION_OPEN_WORK_ORDER_DETAILS.action, payload: {id: id}})
    },
    getWorkOrders: (token) => {
      dispatch(workOrderListRequest(token))
    },
    onGoToLogin: () => {
      dispatch({type: NavigationActions.ACTION_OPEN_LOGIN.action})

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeScreen);

