import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import WorkOrdersScreenStyles from "./WorkOrdersScreenStyles";
import {View, TabBar, Text, TextInput, LoaderScreen} from 'react-native-ui-lib';
import ProfileDropdown from '../../components/ProfileDropdown';
import TabBarStyles from "../../styles/TabBarStyles";
import UserWelcome from "../../components/Header/UserWelcome";
import * as workOrderReducer from "../../reducers/workOrder/workOrder";
import {
  allWorkOrderListRequest,
  getWorkOrderDetail,
  myGroupWorkOrderListRequest,
  reportedByMeWorkOrderListRequest,
  workOrderListRequest
} from "../../actions/workOrder/workOrder";
import * as UserReducer from "../../reducers/user/user";
import connect from "react-redux/es/connect/connect";
import _ from "lodash";
import moment from "moment";
import * as NavigationActions from "../../actions/navigator";


class WorkOrdersScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: 2,
      loading: true,
      bringWos: false,
      searchBoxActive: false,
      refreshing: false,
    };
  }

  _getWorkOrders = (text) => {
    this.props.getWorkOrders(this.props.userData.data.Token, text);
  }
  _getMyGroupWorkOrders = (text) => {
    this.props.getMyGroupWorkOrders(this.props.userData.data.Token, text);
  }
  _getReportedByMeWorkOrders = (text) => {
    this.props.getReportedByMeWorkOrders(this.props.userData.data.Token, text);
  }
  _getAllWorkOrders = (text) => {
    this.props.getAllWorkOrders(this.props.userData.data.Token, text);
  }

  _handleSerchInputChange = (text) => {
    switch (this.state.activeTab) {
      case 1:
        this._getAllWorkOrders(text);
        break;

      case 2:
        this._getWorkOrders(text);
        break;

      case 3:
        this._getMyGroupWorkOrders(text);
        break;

      case 4:
        this._getReportedByMeWorkOrders(text);
        break;

      default:
        this._getAllWorkOrders(text);
        break;
    }
  }

  _toggleSearchBox = (value) => {
    if (value != undefined) {
      this.setState({searchBoxActive: value});
    } else {

      if (!this.state.searchBoxActive === false) {
        this._handleSerchInputChange('');
      }

      this.setState({searchBoxActive: !this.state.searchBoxActive});
    }
  };

  toggleActiveTab = (tab) => {
    this.setState({activeTab: tab});
    this._toggleSearchBox(false);
  };

  componentDidMount() {
    this._getAllWorkOrders();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.activeTab == 1 && nextProps.allWorkOrders == null) {
      this._getAllWorkOrders();
    }
    if (this.state.activeTab == 2 && nextProps.myAssignmentsWorkOrders == null) {
      this._getWorkOrders();
    }
    if (this.state.activeTab == 3 && nextProps.myGroupWorkOrders == null) {
      this._getMyGroupWorkOrders();
    }
    if (this.state.activeTab == 4 && nextProps.reportedByMeWorkOrders == null) {
      this._getReportedByMeWorkOrders();
    }
  }

  _getWorkOrderDoneAmount(workOrders, type) {
    let totalAmount = workOrders.length;
    let totalAmountType = null;

    switch (type) {
      case 'all':
        totalAmountType = _.filter(workOrders, (workOrder) => workOrder.StatusId == 'COMP').length;
        break;
    }

    return {totalAmount, totalAmountType};
  }

  render() {

    return (
      <View style={{flex: 1, flexGrow: 1}}>
        <ScrollView style={{paddingBottom: 50}} keyboardShouldPersistTaps="always" refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this._handleSerchInputChange('')}
          />
        }>

          <ImageBackground
            source={require('../../assets/img/bg/bg.png')}
            resizeMode="cover"
            style={WorkOrdersScreenStyles.imageBackground}>
            <View style={WorkOrdersScreenStyles.resumeHeaderContainer}>
              <View style={WorkOrdersScreenStyles.profileDropdownWrapper}>
                <UserWelcome/>
                <ProfileDropdown style={{zIndex: 2}} imageSource={require('../../assets/img/default-user.jpg')}
                                 navigation={this.props.navigation}/>

              </View>

            </View>
            <View flex>
              <TabBar style={TabBarStyles.detailsTabBar}
                      indicatorStyle={TabBarStyles.detailsTabBarIndicator}
                      mode="SCROLL">


                <TabBar.Item label="MY ASSIGNMENTS"
                             labelStyle={TabBarStyles.detailsTabBarItem}
                             selectedLabelStyle={TabBarStyles.detailsTabBarItemSelected}
                             onPress={() => {
                               this.toggleActiveTab(2), this._getWorkOrders()
                             }}
                />

                <TabBar.Item label="GROUP ASSIGNMENTS"
                             labelStyle={TabBarStyles.detailsTabBarItem}
                             selectedLabelStyle={TabBarStyles.detailsTabBarItemSelected}
                             onPress={() => {
                               this.toggleActiveTab(3), this._getReportedByMeWorkOrders()
                             }}
                />

                <TabBar.Item label="REPORTED BY ME"
                             labelStyle={TabBarStyles.detailsTabBarItem}
                             selectedLabelStyle={TabBarStyles.detailsTabBarItemSelected}
                             onPress={() => {
                               this.toggleActiveTab(4), this._getMyGroupWorkOrders()
                             }}
                />

                <TabBar.Item label="ALL"
                             labelStyle={TabBarStyles.detailsTabBarItem}
                             selectedLabelStyle={TabBarStyles.detailsTabBarItemSelected}
                             onPress={() => {
                               this.toggleActiveTab(1), this._getAllWorkOrders();
                             }}
                />

              </TabBar>
            </View>
          </ImageBackground>

          <View flex style={{
            backgroundColor: '#fff',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flex: 1
          }}>
            <View style={{
              paddingLeft: 20,
              paddingTop: 10,
              paddingRight: 15,
            }}>


              <TouchableWithoutFeedback
                style={{backgroundColor: '#000', width: 40, height: 40,}}
                onPress={() => this._toggleSearchBox()}>

                <View>
                  {!this.state.searchBoxActive &&
                  <Ionicons
                    name={'md-search'}
                    size={30}
                    color="#000"
                  />
                  }

                  {this.state.searchBoxActive &&
                  <Ionicons
                    name={'md-close'}
                    size={30}
                    color="#000"
                  />

                  }
                </View>
              </TouchableWithoutFeedback>
            </View>

            {/*<Text style={{paddingTop: 10, paddingLeft: 15}}><Ionicons
              name="md-funnel"
              size={30}
              color="#000"
            />
            </Text>*/}

            {
              this.props.loading == false &&
              <Text style={{paddingTop: 15, paddingLeft: 0,}}>
                 <Text style={{
                  fontFamily: 'sf-medium',
                  fontWeight: 'bold'
                }}>

                  {this.state.activeTab === 1 && this.props.allWorkOrders && this._getWorkOrderDoneAmount(this.props.allWorkOrders.Records, 'all').totalAmount}
                  {this.state.activeTab === 2 && this.props.myAssignmentsWorkOrders && this._getWorkOrderDoneAmount(this.props.myAssignmentsWorkOrders.Records, 'all').totalAmount}
                  {this.state.activeTab === 3 && this.props.myGroupWorkOrders && this._getWorkOrderDoneAmount(this.props.myGroupWorkOrders.Records, 'all').totalAmount}
                  {this.state.activeTab === 4 && this.props.reportedByMeWorkOrders && this._getWorkOrderDoneAmount(this.props.reportedByMeWorkOrders.Records, 'all').totalAmount}

                </Text>  tasks found
              </Text>
            }
          </View>


          {this.state.searchBoxActive &&
          <View style={{paddingTop: 15, paddingRight: 15, paddingLeft: 15}}>
            <TextInput
              style={{
                color: '#000',
              }}
              autoFocus={true}
              floatingPlaceholder
              floatOnFocus={true}
              placeholder="Search"
              floatingPlaceholderColor="#000"
              titleColor="#000"
              underlineColor="#000"
              placeholderTextColor="#000"
              onChangeText={(text) => this._handleSerchInputChange(text)}
              value={this.state.search}
            />
          </View>
          }

          {this.props.loading &&
          <View style={{paddingBottom: 30}}>
            <LoaderScreen
              style={{margin: 20}}
              color="#00aeee"
              overlay={false}
            />
          </View>
          }
          {this.state.activeTab === 1 &&
          this.props.allWorkOrders &&
          this.props.loading == false &&
          <View style={{paddingBottom: 30, zIndex: 1}}>
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
                }}><View style={{width: 70}}>
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
                      size={28}
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

                  <Text style={[styles.detailsStatusIndicator,
                    allWorkOrders.StatusId == 'CLOSE' ? styles.detailsStatusIndicatorCLOSE :
                      allWorkOrders.StatusId == 'CAN' ? styles.detailsStatusIndicatorCAN :
                        allWorkOrders.StatusId == 'APPR' ? styles.detailsStatusIndicatorAPPR :
                          allWorkOrders.StatusId == 'WPCOND' ? styles.detailsStatusIndicatorWPCOND :
                            allWorkOrders.StatusId == 'COMP' ? styles.detailsStatusIndicatorCOMP :
                              allWorkOrders.StatusId == 'HISTEDIT' ? styles.detailsStatusIndicatorHISTEDIT :
                                allWorkOrders.StatusId == 'WORKING' ? styles.detailsStatusIndicatorWORKING :
                                  allWorkOrders.StatusId == 'WAPPR' ? styles.detailsStatusIndicatorWAPPR :
                                    allWorkOrders.StatusId == 'WMATL' ? styles.detailsStatusIndicatorWMATL :
                                      allWorkOrders.StatusId == 'WSCH' ? styles.detailsStatusIndicatorWSCH :
                                        allWorkOrders.StatusId == 'INPRG' ? styles.detailsStatusIndicatorINPRG : '#fff']}

                  >
                    {allWorkOrders.StatusId}
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
                      }}>{allWorkOrders.Description ? (allWorkOrders.Description).toUpperCase() : 'No Description'}

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

                      }}>#{allWorkOrders.WorkOrderId} </Text>
                      <Text style={{
                        fontWeight: 'bold',
                        flex: 1,
                        fontSize: 12,
                        marginLeft: 10,
                        textAlign: 'left',
                        color: '#656565',
                      }}>{moment(allWorkOrders.DtStatusUpdate).format('DD/MM/YYYY HH:mm ')}
                        by: {allWorkOrders.ReportedById}
                      </Text>

                    </View>

                  </View>
                </View>
              </TouchableWithoutFeedback>)}
          </View>
          }
          {this.state.activeTab === 1 &&
          this.props.allWorkOrders &&
          this.props.allWorkOrders.Count == 0 &&
          this.props.loading == false && <View>
            <Text style={{fontSize: 16, textAlign: 'center', paddingTop: 20}}>No work orders to show</Text>
          </View>}


          {this.state.activeTab === 2 &&
          this.props.myAssignmentsWorkOrders &&
          this.props.loading == false &&
          <View style={{paddingBottom: 30, zIndex: 1}}>
            {_.map(this.props.myAssignmentsWorkOrders.Records, (myAssignmentsWorkOrders, index) =>
              <TouchableWithoutFeedback onPress={() => {
                {
                  this.setState({bringWos: true})
                }
                this.props.onWorkOrderDetailsClick(myAssignmentsWorkOrders.Id, myAssignmentsWorkOrders.WorkOrderId)
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
                }}><View style={{width: 70}}>
                  <Text style={[styles.detailsStatusInner,
                    myAssignmentsWorkOrders.StatusId == 'CLOSE' ? styles.detailsStatusInnerCLOSE :
                      myAssignmentsWorkOrders.StatusId == 'CAN' ? styles.detailsStatusInnerCAN :
                        myAssignmentsWorkOrders.StatusId == 'APPR' ? styles.detailsStatusInnerAPPR :
                          myAssignmentsWorkOrders.StatusId == 'WPCOND' ? styles.detailsStatusInnerWPCOND :
                            myAssignmentsWorkOrders.StatusId == 'COMP' ? styles.detailsStatusInnerCOMP :
                              myAssignmentsWorkOrders.StatusId == 'HISTEDIT' ? styles.detailsStatusInnerHISTEDIT :
                                myAssignmentsWorkOrders.StatusId == 'WORKING' ? styles.detailsStatusInnerWORKING :
                                  myAssignmentsWorkOrders.StatusId == 'WAPPR' ? styles.detailsStatusInnerWAPPR :
                                    myAssignmentsWorkOrders.StatusId == 'WMATL' ? styles.detailsStatusInnerWMATL :
                                      myAssignmentsWorkOrders.StatusId == 'WSCH' ? styles.detailsStatusInnerWSCH :
                                        myAssignmentsWorkOrders.StatusId == 'INPRG' ? styles.detailsStatusInnerINPRG : '#fff'
                  ]}>
                    <Ionicons
                      name={myAssignmentsWorkOrders.StatusId == 'CAN' ? "md-close" : "md-checkmark"}
                      size={28}
                      color={myAssignmentsWorkOrders.StatusId == 'CAN' ? '#f65752' :
                        myAssignmentsWorkOrders.StatusId == 'CLOSE' ? '#39b54a' :
                          myAssignmentsWorkOrders.StatusId == 'APPR' ? '#4488f2' :
                            myAssignmentsWorkOrders.StatusId == 'WPCOND' ? '#4488f2' :
                              myAssignmentsWorkOrders.StatusId == 'COMP' ? '#39b54a' :
                                myAssignmentsWorkOrders.StatusId == 'HISTEDIT' ? '#39b54a' :
                                  myAssignmentsWorkOrders.StatusId == 'WORKING' ? '#f2d935' :
                                    myAssignmentsWorkOrders.StatusId == 'WAPPR' ? '#e59323' :
                                      myAssignmentsWorkOrders.StatusId == 'WMATL' ? '#f2d935' :
                                        myAssignmentsWorkOrders.StatusId == 'WSCH' ? '#e59323' :
                                          myAssignmentsWorkOrders.StatusId == 'INPRG' ? '#39b54a' : '#fff'}
                    />
                  </Text>
                  <Text style={[styles.detailsStatusIndicator,
                    myAssignmentsWorkOrders.StatusId == 'CLOSE' ? styles.detailsStatusIndicatorCLOSE :
                      myAssignmentsWorkOrders.StatusId == 'CAN' ? styles.detailsStatusIndicatorCAN :
                        myAssignmentsWorkOrders.StatusId == 'APPR' ? styles.detailsStatusIndicatorAPPR :
                          myAssignmentsWorkOrders.StatusId == 'WPCOND' ? styles.detailsStatusIndicatorWPCOND :
                            myAssignmentsWorkOrders.StatusId == 'COMP' ? styles.detailsStatusIndicatorCOMP :
                              myAssignmentsWorkOrders.StatusId == 'HISTEDIT' ? styles.detailsStatusIndicatorHISTEDIT :
                                myAssignmentsWorkOrders.StatusId == 'WORKING' ? styles.detailsStatusIndicatorWORKING :
                                  myAssignmentsWorkOrders.StatusId == 'WAPPR' ? styles.detailsStatusIndicatorWAPPR :
                                    myAssignmentsWorkOrders.StatusId == 'WMATL' ? styles.detailsStatusIndicatorWMATL :
                                      myAssignmentsWorkOrders.StatusId == 'WSCH' ? styles.detailsStatusIndicatorWSCH :
                                        myAssignmentsWorkOrders.StatusId == 'INPRG' ? styles.detailsStatusIndicatorINPRG : '#fff']}

                  >
                    {myAssignmentsWorkOrders.StatusId}
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
                      }}>{myAssignmentsWorkOrders.Description ? (myAssignmentsWorkOrders.Description).toUpperCase() : 'No Description'}
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

                      }}>#{myAssignmentsWorkOrders.WorkOrderId} </Text>
                      <Text style={{
                        fontWeight: 'bold',
                        flex: 1,
                        fontSize: 12,
                        marginLeft: 10,
                        textAlign: 'left',
                        color: '#656565',
                      }}>{moment(myAssignmentsWorkOrders.DtStatusUpdate).format('DD/MM/YYYY HH:mm ')}
                        by: {myAssignmentsWorkOrders.ReportedById}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>)}
          </View>
          }
          {this.state.activeTab === 2 &&
          this.props.myAssignmentsWorkOrders &&
          this.props.myAssignmentsWorkOrders.Count == 0 &&
          this.props.loading == false && <View>
            <Text style={{fontSize: 16, textAlign: 'center', paddingTop: 20}}>No work orders to show</Text>
          </View>}

          {this.state.activeTab === 3 &&
          this.props.myGroupWorkOrders &&
          this.props.loading == false &&
          <View style={{paddingBottom: 30, zIndex: 1}}>
            {_.map(this.props.myGroupWorkOrders.Records, (myGroupWorkOrders, index) =>
              <TouchableWithoutFeedback onPress={() => {
                {
                  this.setState({bringWos: true})
                }
                this.props.onWorkOrderDetailsClick(myGroupWorkOrders.Id, myGroupWorkOrders.WorkOrderId)
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
                }}><View style={{width: 70}}>
                  <Text style={[styles.detailsStatusInner,
                    myGroupWorkOrders.StatusId == 'CLOSE' ? styles.detailsStatusInnerCLOSE :
                      myGroupWorkOrders.StatusId == 'CAN' ? styles.detailsStatusInnerCAN :
                        myGroupWorkOrders.StatusId == 'APPR' ? styles.detailsStatusInnerAPPR :
                          myGroupWorkOrders.StatusId == 'WPCOND' ? styles.detailsStatusInnerWPCOND :
                            myGroupWorkOrders.StatusId == 'COMP' ? styles.detailsStatusInnerCOMP :
                              myGroupWorkOrders.StatusId == 'HISTEDIT' ? styles.detailsStatusInnerHISTEDIT :
                                myGroupWorkOrders.StatusId == 'WORKING' ? styles.detailsStatusInnerWORKING :
                                  myGroupWorkOrders.StatusId == 'WAPPR' ? styles.detailsStatusInnerWAPPR :
                                    myGroupWorkOrders.StatusId == 'WMATL' ? styles.detailsStatusInnerWMATL :
                                      myGroupWorkOrders.StatusId == 'WSCH' ? styles.detailsStatusInnerWSCH :
                                        myGroupWorkOrders.StatusId == 'INPRG' ? styles.detailsStatusInnerINPRG : '#fff'
                  ]}>
                    <Ionicons
                      name={myGroupWorkOrders.StatusId == 'CAN' ? "md-close" : "md-checkmark"}
                      size={28}
                      color={myGroupWorkOrders.StatusId == 'CAN' ? '#f65752' :
                        myGroupWorkOrders.StatusId == 'CLOSE' ? '#39b54a' :
                          myGroupWorkOrders.StatusId == 'APPR' ? '#4488f2' :
                            myGroupWorkOrders.StatusId == 'WPCOND' ? '#4488f2' :
                              myGroupWorkOrders.StatusId == 'COMP' ? '#39b54a' :
                                myGroupWorkOrders.StatusId == 'HISTEDIT' ? '#39b54a' :
                                  myGroupWorkOrders.StatusId == 'WORKING' ? '#f2d935' :
                                    myGroupWorkOrders.StatusId == 'WAPPR' ? '#e59323' :
                                      myGroupWorkOrders.StatusId == 'WMATL' ? '#f2d935' :
                                        myGroupWorkOrders.StatusId == 'WSCH' ? '#e59323' :
                                          myGroupWorkOrders.StatusId == 'INPRG' ? '#39b54a' : '#fff'}
                    />
                  </Text>
                  <Text style={[styles.detailsStatusIndicator,
                    myGroupWorkOrders.StatusId == 'CLOSE' ? styles.detailsStatusIndicatorCLOSE :
                      myGroupWorkOrders.StatusId == 'CAN' ? styles.detailsStatusIndicatorCAN :
                        myGroupWorkOrders.StatusId == 'APPR' ? styles.detailsStatusIndicatorAPPR :
                          myGroupWorkOrders.StatusId == 'WPCOND' ? styles.detailsStatusIndicatorWPCOND :
                            myGroupWorkOrders.StatusId == 'COMP' ? styles.detailsStatusIndicatorCOMP :
                              myGroupWorkOrders.StatusId == 'HISTEDIT' ? styles.detailsStatusIndicatorHISTEDIT :
                                myGroupWorkOrders.StatusId == 'WORKING' ? styles.detailsStatusIndicatorWORKING :
                                  myGroupWorkOrders.StatusId == 'WAPPR' ? styles.detailsStatusIndicatorWAPPR :
                                    myGroupWorkOrders.StatusId == 'WMATL' ? styles.detailsStatusIndicatorWMATL :
                                      myGroupWorkOrders.StatusId == 'WSCH' ? styles.detailsStatusIndicatorWSCH :
                                        myGroupWorkOrders.StatusId == 'INPRG' ? styles.detailsStatusIndicatorINPRG : '#fff']}

                  >
                    {myGroupWorkOrders.StatusId}
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
                      }}>{myGroupWorkOrders.Description ? (myGroupWorkOrders.Description).toUpperCase() : 'No Description'}
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

                      }}>#{myGroupWorkOrders.WorkOrderId} </Text>
                      <Text style={{
                        fontWeight: 'bold',
                        flex: 1,
                        fontSize: 12,
                        marginLeft: 10,
                        textAlign: 'left',
                        color: '#656565',
                      }}>{moment(myGroupWorkOrders.DtStatusUpdate).format('DD/MM/YYYY HH:mm ')}
                        by: {myGroupWorkOrders.ReportedById}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>)}
          </View>
          }

          {this.state.activeTab === 3 &&
          this.props.myGroupWorkOrders &&
          this.props.myGroupWorkOrders.Count == 0 &&
          this.props.loading == false && <View>
            <Text style={{fontSize: 16, textAlign: 'center', paddingTop: 20}}>No work orders to show</Text>
          </View>}


          {this.state.activeTab === 4 &&
          this.props.reportedByMeWorkOrders &&
          this.props.loading == false &&
          <View style={{paddingBottom: 30, zIndex: 1}}>
            {_.map(this.props.reportedByMeWorkOrders.Records, (reportedByMeWorkOrders, index) =>
              <TouchableWithoutFeedback onPress={() => {
                {
                  this.setState({bringWos: true})
                }
                this.props.onWorkOrderDetailsClick(reportedByMeWorkOrders.Id, reportedByMeWorkOrders.WorkOrderId)
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
                }}><View style={{width: 70}}>
                  <Text style={[styles.detailsStatusInner,
                    reportedByMeWorkOrders.StatusId == 'CLOSE' ? styles.detailsStatusInnerCLOSE :
                      reportedByMeWorkOrders.StatusId == 'CAN' ? styles.detailsStatusInnerCAN :
                        reportedByMeWorkOrders.StatusId == 'APPR' ? styles.detailsStatusInnerAPPR :
                          reportedByMeWorkOrders.StatusId == 'WPCOND' ? styles.detailsStatusInnerWPCOND :
                            reportedByMeWorkOrders.StatusId == 'COMP' ? styles.detailsStatusInnerCOMP :
                              reportedByMeWorkOrders.StatusId == 'HISTEDIT' ? styles.detailsStatusInnerHISTEDIT :
                                reportedByMeWorkOrders.StatusId == 'WORKING' ? styles.detailsStatusInnerWORKING :
                                  reportedByMeWorkOrders.StatusId == 'WAPPR' ? styles.detailsStatusInnerWAPPR :
                                    reportedByMeWorkOrders.StatusId == 'WMATL' ? styles.detailsStatusInnerWMATL :
                                      reportedByMeWorkOrders.StatusId == 'WSCH' ? styles.detailsStatusInnerWSCH :
                                        reportedByMeWorkOrders.StatusId == 'INPRG' ? styles.detailsStatusInnerINPRG : '#fff'
                  ]}>
                    <Ionicons
                      name={reportedByMeWorkOrders.StatusId == 'CAN' ? "md-close" : "md-checkmark"}
                      size={28}
                      color={reportedByMeWorkOrders.StatusId == 'CAN' ? '#f65752' :
                        reportedByMeWorkOrders.StatusId == 'CLOSE' ? '#39b54a' :
                          reportedByMeWorkOrders.StatusId == 'APPR' ? '#4488f2' :
                            reportedByMeWorkOrders.StatusId == 'WPCOND' ? '#4488f2' :
                              reportedByMeWorkOrders.StatusId == 'COMP' ? '#39b54a' :
                                reportedByMeWorkOrders.StatusId == 'HISTEDIT' ? '#39b54a' :
                                  reportedByMeWorkOrders.StatusId == 'WORKING' ? '#f2d935' :
                                    reportedByMeWorkOrders.StatusId == 'WAPPR' ? '#e59323' :
                                      reportedByMeWorkOrders.StatusId == 'WMATL' ? '#f2d935' :
                                        reportedByMeWorkOrders.StatusId == 'WSCH' ? '#e59323' :
                                          reportedByMeWorkOrders.StatusId == 'INPRG' ? '#39b54a' : '#fff'}
                    />
                  </Text>
                  <Text style={[styles.detailsStatusIndicator,
                    reportedByMeWorkOrders.StatusId == 'CLOSE' ? styles.detailsStatusIndicatorCLOSE :
                      reportedByMeWorkOrders.StatusId == 'CAN' ? styles.detailsStatusIndicatorCAN :
                        reportedByMeWorkOrders.StatusId == 'APPR' ? styles.detailsStatusIndicatorAPPR :
                          reportedByMeWorkOrders.StatusId == 'WPCOND' ? styles.detailsStatusIndicatorWPCOND :
                            reportedByMeWorkOrders.StatusId == 'COMP' ? styles.detailsStatusIndicatorCOMP :
                              reportedByMeWorkOrders.StatusId == 'HISTEDIT' ? styles.detailsStatusIndicatorHISTEDIT :
                                reportedByMeWorkOrders.StatusId == 'WORKING' ? styles.detailsStatusIndicatorWORKING :
                                  reportedByMeWorkOrders.StatusId == 'WAPPR' ? styles.detailsStatusIndicatorWAPPR :
                                    reportedByMeWorkOrders.StatusId == 'WMATL' ? styles.detailsStatusIndicatorWMATL :
                                      reportedByMeWorkOrders.StatusId == 'WSCH' ? styles.detailsStatusIndicatorWSCH :
                                        reportedByMeWorkOrders.StatusId == 'INPRG' ? styles.detailsStatusIndicatorINPRG : '#fff']}

                  >
                    {reportedByMeWorkOrders.StatusId}
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
                      }}>{reportedByMeWorkOrders.Description ? (reportedByMeWorkOrders.Description).toUpperCase() : 'No Description'}
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

                      }}>#{reportedByMeWorkOrders.WorkOrderId} </Text>
                      <Text style={{
                        fontWeight: 'bold',
                        flex: 1,
                        fontSize: 12,
                        marginLeft: 10,
                        textAlign: 'left',
                        color: '#656565',
                      }}>{moment(reportedByMeWorkOrders.DtStatusUpdate).format('DD/MM/YYYY HH:mm ')}
                        by: {reportedByMeWorkOrders.ReportedById}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>)}
          </View>
          }
          {this.state.activeTab === 4 &&
          this.props.reportedByMeWorkOrders &&
          this.props.reportedByMeWorkOrders.Count == 0 &&
          this.props.loading == false && <View>
            <Text style={{fontSize: 16, textAlign: 'center', paddingTop: 20}}>No work orders to show</Text>
          </View>}

        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: workOrderReducer.isLoading(state),
    userData: UserReducer.getUserData(state),
    myAssignmentsWorkOrders: workOrderReducer.getMyAssignmentsDataWorkOrders(state),
    reportedByMeWorkOrders: workOrderReducer.getReportedByMeWorkOrders(state),
    myGroupWorkOrders: workOrderReducer.getMyGroupWorkOrders(state),
    allWorkOrders: workOrderReducer.getAllWorkOrders(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getWorkOrders: (token, text) => {
      dispatch(workOrderListRequest(token, text))
    },
    getMyGroupWorkOrders: (token, text) => {
      dispatch(myGroupWorkOrderListRequest(token, text))
    },
    getReportedByMeWorkOrders: (token, text) => {
      dispatch(reportedByMeWorkOrderListRequest(token, text))
    },
    getAllWorkOrders: (token, text) => {
      dispatch(allWorkOrderListRequest(token, text))
    },
    onGetWorkerDetails: (id) => {
      dispatch(getWorkOrderDetail(id));
    },
    onWorkOrderDetailsClick: (id, woId) => {
      dispatch({
        type: NavigationActions.ACTION_OPEN_WORK_ORDER_DETAILS.action,
        payload: {id: id, woId: woId, previousScreen: 'wos'}
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkOrdersScreen);

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
    width: 40,
    height: 40,
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

