import React from 'react';
import {
  ImageBackground,
  ScrollView,
  BackHandler,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  DatePickerAndroid
} from 'react-native';

import {laborListRequest} from '../../actions/workOrder/labor';
import {View, Text, TabBar, Card, LoaderScreen, Button, TextInput} from 'react-native-ui-lib';
import {Ionicons} from '@expo/vector-icons';
import ProfileDropdown from '../../components/ProfileDropdown';
import * as laborReducer from '../../reducers/workOrder/labor';
import EditWorkOrderScreenStyles from './EditWorkOrderScreenStyles'
import TabBarStyles from "../../styles/TabBarStyles";
import Content from "../../styles/Content";
import moment from "moment";
import {connect} from "react-redux";

import * as materialReducer from '../../reducers/workOrder/material';

import {materialRequest} from '../../actions/workOrder/material';

import {
  locationIdLookup,
  assetIdLookup,
  classificationLookup,
  siteIdLookup,
  workTypeLookup,
  ownerLookup,
  ownerGroupLookup,
  priorityLookup,
  statusLookup,
  laborLookup,
  craftLookup
} from '../../actions/lookup/lookup';
import {
  createMaterial, emptyWorkOrder, laborCreate
} from '../../actions/workOrder/workOrder';
import * as AssetIdLookupReducer from '../../reducers/lookup/assetIdLookup';
import * as LaborLookupReducer from '../../reducers/lookup/laborLookup';
import * as CraftLookupReducer from '../../reducers/lookup/craftLookup';
import * as ClassificationLookupReducer from '../../reducers/lookup/classificationLookup';
import * as LocationIdLookupReducer from '../../reducers/lookup/locationIdLookup';
import * as OwnerLookupReducer from '../../reducers/lookup/ownerLookup';
import * as OwnerGroupLookupReducer from '../../reducers/lookup/ownerGroupLookup';
import * as PriorityLookupReducer from '../../reducers/lookup/priorityLookup';
import * as ReportedByLookupReducer from '../../reducers/lookup/reportedByLookup';
import * as SiteIdLookupReducer from '../../reducers/lookup/siteIdLookup';
import * as WorkTypeLookupReducer from '../../reducers/lookup/workTypeLookup';
import * as StatusLookupReducer from '../../reducers/lookup/statusLookup';

import LookupModal from '../../components/Lookup/LookupModal'

import Toast from 'react-native-easy-toast';

import {StackActions} from 'react-navigation';
import {getWorkOrderDetail, workOrderEdit} from '../../actions/workOrder/workOrder';
import * as WorkOrderSelectors from '../../reducers/workOrder/workOrder';

import WorkOrderEditFab from '../../components/WorkOrderFab/WorkOrderEditFab';
import WorkOrderDetailsScreenStyles from "../WorkOrderDetailsScreen/WorkOrderDetailsScreenStyles";
import * as UserReducer from "../../reducers/user/user";
import _ from "lodash";

class WorkOrderDetailsScreen extends React.Component {


  state = {
    showCreateLaborForm: false,
    showCreateMaterialForm: false,
    lookupTemp: {},
    loading: true,
    activeTab: 1,
    materialData: {
      Description: '',
      LineType: 'MATERIAL',
      Quantity: null,
      UnitCost: null,
      ViewMode: false
    },

    laborData: {
      CraftId: null,
      CraftIdDescription:null,
      DtStart: null,
      GlDebitAccount: null,
      LaborId: null,
      LineCost: null,
      RegularHours: null,
      SkillLevel: null,
      WorkOrderId: this.props.getSelectedWorkOrder.WorkOrderId,
    },

    LaborStartDateLabel: '',
    data: {},
    //LOCATION ID LOOKUP
    locationIdModalLookUpVisible: false,
    locationIdLookUpData: null,

    //ASSET ID LOOKUP
    assetIdModalLookUpVisible: false,
    assetIdLookUpData: null,

    //CLASSIFICATION LOOKUP
    classificationModalLookUpVisible: false,
    classificationLookUpData: null,

    //WORK TYPE LOOKUP
    workTypeModalLookUpVisible: false,
    workTypeLookUpData: null,

    //OWNER LOOKUP
    ownerModalLookUpVisible: false,
    ownerLookUpData: null,

    //OWNER GROUP
    ownerGroupModalLookUpVisible: false,
    ownerGroupLookUpData: null,

    //PRIORITY
    priorityModalLookUpVisible: false,
    priorityLookUpData: null,

    //STATUS
    statusModalLookUpVisible: false,
    statusLookUpData: null,

    //LABOR LOOKUP
    laborModalLookUpVisible: false,
    laborLookUpData: null,

    //CRAFT LOOKUP
    craftModalLookUpVisible: false,
    craftLookUpData: null,
  };

  static navigationOptions = {
    header: null,
  };

  toggleActiveTab = (tab) => {
    this.setState({activeTab: tab});
  }

  _toggleShowCreateLaborForm = () => {
    this.setState({showCreateLaborForm: !this.state.showCreateLaborForm});
  }

  _toggleShowCreateMaterialForm = () => {
    this.setState({showCreateMaterialForm: !this.state.showCreateMaterialForm});
  }

  formatDate = (date) => (
      moment(date, 'YYYY-MM-DDTHH:mm:SS').format('DD/MM/YYYY HH:mmA')
  )

  componentDidMount() {
    this.setState({
      materialData: {
        ...this.state.materialData,
        OrgId: this.props.getSelectedWorkOrder.OrgId,
        SiteId: this.props.getSelectedWorkOrder.SiteId,
        WorkOrderId: this.props.getSelectedWorkOrder.WorkOrderId,
      },
      data: {
        ...this.state.data,
        Asset: this.props.getSelectedWorkOrder.Asset,
        AssetId: this.props.getSelectedWorkOrder.AssetId,
        ClassStructure: this.props.getSelectedWorkOrder.ClassStructure,
        ClassStructureId: this.props.getSelectedWorkOrder.ClassStructureId,
        Description: this.props.getSelectedWorkOrder.Description,
        DtStatusUpdate: this.props.getSelectedWorkOrder.DtStatusUpdate,
        DtTargetEnd: this.props.getSelectedWorkOrder.DtTargetEnd,
        DtTargetStart: this.props.getSelectedWorkOrder.DtTargetStart,
        Id: this.props.getSelectedWorkOrder.Id,
        JpNum: this.props.getSelectedWorkOrder.JpNum,
        Label: this.props.getSelectedWorkOrder.Label,
        Location: this.props.getSelectedWorkOrder.Location,
        LocationId: this.props.getSelectedWorkOrder.LocationId,
        LongDescription: this.props.getSelectedWorkOrder.LongDescription,
        OrgId: this.props.getSelectedWorkOrder.OrgId,
        Owner: this.props.getSelectedWorkOrder.Owner,
        OwnerGroup: this.props.getSelectedWorkOrder.OwnerGroup,
        OwnerGroupId: this.props.getSelectedWorkOrder.OwnerGroupId,
        OwnerId: this.props.getSelectedWorkOrder.OwnerId,
        Priority: this.props.getSelectedWorkOrder.Priority,
        PriorityDescription: this.props.getSelectedWorkOrder.PriorityDescription,
        ProblemCode: this.props.getSelectedWorkOrder.ProblemCode,
        ReportedAt: this.props.getSelectedWorkOrder.ReportedAt,
        ReportedBy: this.props.getSelectedWorkOrder.ReportedBy,
        ReportedById: this.props.getSelectedWorkOrder.ReportedById,
        Site: this.props.getSelectedWorkOrder.Site,
        SiteId: this.props.getSelectedWorkOrder.SiteId,
        Status: this.props.getSelectedWorkOrder.Status,
        StatusId: this.props.getSelectedWorkOrder.StatusId,
        Text: this.props.getSelectedWorkOrder.Text,
        WorkOrderId: this.props.getSelectedWorkOrder.WorkOrderId,
        WorkType: this.props.getSelectedWorkOrder.WorkType,
        WorkTypeId: this.props.getSelectedWorkOrder.WorkTypeId,
        Labor: null,
      }
    })
    const {params} = this.props.navigation.state;
    this.props.onGetWorkerDetails(params.id);
    this._getLaborsWithPagination();
    this._getLabors();
    BackHandler.addEventListener('hardwareBackPress', this.props.onBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.props.onBackButtonClick);
  }

  _onEditButtonClick = () => {
    this.props.onEditWorkOrder(this.state, this.props.navigation, this.refs.toast)
  }

  _getLaborsWithPagination = () => {
    this.props.onGetLaborsPagination()
  }

  _getCraftWithPagination = (labor, craftSearch) => {
    this.props.onGetCraftPagination(labor, craftSearch)
  }
  _getLabors = () => {
    this.props.onGetLabor(this.props.userData.data.Token, this.props.getSelectedWorkOrder.WorkOrderId);
  }


  async _selectDate() {


    const {action, year, month, day} = await DatePickerAndroid.open({
      date: new Date(),
      minDate: new Date()
    });

    if (action === DatePickerAndroid.dismissedAction) {
      return;
    }


    let selectedDateRAW = moment(year + '-' + (month + 1) + '-' + day, "YYYY-MM-DD");
     var selectedDate = selectedDateRAW.format();
    let selectedDateLabel = selectedDateRAW.format("MMM Do YY");
    this.setState({laborData: {...this.state.laborData,DtStart: selectedDate}})
    this.setState({LaborStartDateLabel: selectedDateLabel})
  }

  _resetMaterial = (toastMessage) => {
    this.setState({
      materialData: {
        ...this.state.materialData,
        Description: '',
        LineType: 'MATERIAL',
        Quantity: null,
        UnitCost: null,
      }
    })

    this.refs.toast.show(toastMessage, 2000)
  }

  _resetLabor = (toastMessage) => {
    this.setState({
      LaborStartDateLabel:null,
      laborData: {
        CraftId: null,
        CraftIdDescription:null,
        DtStart: null,
        GlDebitAccount: null,
        LaborId: null,
        LineCost: null,
        RegularHours:  null,
        SkillLevel: null,
        WorkOrderId: this.props.getSelectedWorkOrder.WorkOrderId,
      }
    })

    this.refs.toast.show(toastMessage, 2000)
  }

  componentWillReceiveProps(nextProps) {


    if (!this.state.data && nextProps.getSelectedWorkOrder) {
      this.setState({data: nextProps.getSelectedWorkOrder});
    }

    if (nextProps.getToastMessages) {
      if (nextProps.getToastMessages == 'Labor Created') {
        this._resetLabor(nextProps.getToastMessages);
      }

      if (nextProps.getToastMessages == 'Material Created') {
        this._resetMaterial(nextProps.getToastMessages);
      }


  }
  }


  /* LOCATION ID LOOKUP */
  _applyLocationIdLookup = (data) => {

    this.setState({
      ...this.state,

      lookupTemp: {
        ...this.state.lookupTemp,
        LocationId: data.LocationId,
        Location: data,
        AssetId: null,
        Asset: null
      },
      data: {
        ...this.state.data,
        LocationId: data.LocationId,
        Location: data,
        AssetId: null,
        Asset: null
      }
    });

    this._closeLookup();
  }
  /* LOCATION ID LOOKUP END */

  /* ASSET ID LOOKUP */
  _applyAssetIdLookup = (data) => {
    this.setState({
      ...this.state,

      lookupTemp: {
        ...this.state.lookupTemp,
        AssetId: data.AssetId,
        Asset: data
      },
      data: {
        ...this.state.data,
        AssetId: data.AssetId,
        Asset: data
      }
    });

    this._closeLookup();
  }
  /* ASSET ID LOOKUP END */

  /* CLASSIFICATION LOOKUP */

  _applyClassificationLookup = (data) => {

    this.setState({
      ...this.state,

      lookupTemp: {
        ...this.state.lookupTemp,
        ClassStructureId: data.ClassStructureId,
        ClassStructure: data,
      },
      data: {
        ...this.state.data,
        ClassStructureId: data.ClassStructureId,
        ClassStructure: data,

      }
    });

    this._closeLookup();
  }

  /* CLASSIFICATION LOOKUP END */

  /* WORK TYPE LOOKUP */

  _applyWorkTypeLookup = (data) => {

    this.setState({
      ...this.state,

      lookupTemp: {
        ...this.state.lookupTemp,
        WorkTypeId: data.WorkTypeId,
        WorkType: data,
      },
      data: {
        ...this.state.data,
        WorkTypeId: data.WorkTypeId,
        WorkType: data,

      }
    });


    this._closeLookup();
  }

  /* WORK TYPE LOOKUP END */


  /* OWNER LOOKUP */

  _applyOwnerLookup = (data) => {


    this.setState({
      ...this.state,

      lookupTemp: {
        ...this.state.lookupTemp,
        OwnerId: data.PersonId,
        Owner: data,
      },
      data: {
        ...this.state.data,
        OwnerId: data.PersonId,
        Owner: data,
      }
    });

    this._closeLookup();
  }

  /* OWNER LOOKUP END */


  /* PRIORITY LOOKUP */

  _applyPriorityLookup = (data) => {
    this.setState({
      ...this.state,

      lookupTemp: {
        ...this.state.lookupTemp,
        PriorityId: data.PriorityId,
        Priority: data.PriorityId,
        PriorityDescription: data.Description
      },
      data: {
        ...this.state.data,
        PriorityId: data.PriorityId,
        Priority: data.PriorityId,
        PriorityDescription: data.Description
      }
    });

    this._closeLookup();
  }

  /* PRIORITY LOOKUP END */

  /* STATUS LOOKUP */

  _applyStatusLookup = (data) => {
    this.setState({
      ...this.state,

      lookupTemp: {
        ...this.state.lookupTemp,
        StatusId: data.StatusId,
        Status: data.Status,
      },
      data: {
        ...this.state.data,
        StatusId: data.StatusId,
        Status: data.Status,
      }
    });


    this._closeLookup();
  }

  /* STATUS LOOKUP END */

  /* LABOR LOOKUP */

  _applyLaborLookup = (data) => {

    this._getCraftWithPagination(data.LaborId, '')
    this.setState({
      ...this.state,
      laborData: {
        ...this.state.laborData,
        LaborId: data.LaborId,
        CraftId: '',
        CraftIdDescription: '',
        SkillLevel: '',
        GlDebitAccount: '',
        LineCost: '',
      }
    });

    this._closeLookup();
  }

  /* LABOR LOOKUP END */

  /* CRAFT LOOKUP */

  _applyCraftLookup = (data) => {


    this.setState({
      ...this.state,

      lookupTemp: {
        ...this.state.lookupTemp,
        CraftId: data.CraftId,
        Craft: data,
        CraftLabel: data.CraftIdDescription,
        LineCost: data.LineCost ? data.LineCost.toString() : '0',
      },
      laborData: {
        ...this.state.laborData,
        CraftId: data.CraftId,
        CraftIdDescription: data.CraftIdDescription,
        SkillLevel: data.SkillLevel,
        GlDebitAccount: data.GlDebitAccount,
        LineCost: data.LineCost ? data.LineCost.toString() : '0',
      }
    });


    this._closeLookup();
  }

  /* CRAFT LOOKUP END */


  _closeLookup = () => {

    this.setState({assetIdModalLookUpVisible: false});
    this.setState({assetLookUpVisible: false});

    this.setState({locationIdModalLookUpVisible: false});
    this.setState({locationLookUpVisible: false});

    this.setState({classificationModalLookUpVisible: false});
    this.setState({classificationLookupUpVisible: false})

    this.setState({workTypenModalLookUpVisible: false});
    this.setState({workTypeLookupUpVisible: false})

    this.setState({ownerModalLookUpVisible: false});
    this.setState({ownerLookupUpVisible: false})

    this.setState({priorityModalLookUpVisible: false});
    this.setState({priorityLookupUpVisible: false})

    this.setState({statusModalLookUpVisible: false});
    this.setState({statusLookupUpVisible: false})

    this.setState({laborModalLookUpVisible: false});
    this.setState({laborLookupUpVisible: false})

    this.setState({craftModalLookUpVisible: false});
    this.setState({craftLookupUpVisible: false})
  }

  render() {
    console.log(this.props.labor)
    return (

        <KeyboardAvoidingView behavior="padding" enabled style={{flex: 1, flexGrow: 1,}}>

          <View style={{flex: 1, flexGrow: 1}}>

            {!this.props.getSelectedWorkOrder &&
            <View style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 10000,

            }}>
              <ActivityIndicator color="#00aeee" style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                marginTop: -35,
                width: 70,
                height: 70,
              }}/>
            </View>
            }


            <ScrollView style={EditWorkOrderScreenStyles.container} keyboardShouldPersistTaps="always">

              <ImageBackground
                  source={require('../../assets/img/bg/bg.png')}
                  resizeMode="cover"
                  style={WorkOrderDetailsScreenStyles.imageBackground}>

                <View style={WorkOrderDetailsScreenStyles.resumeHeaderContainer}>
                  <View style={WorkOrderDetailsScreenStyles.resumeHeaderInner}>
                    <View flex>
                      <Button style={{
                        backgroundColor: 'transparent',
                        width: 20,
                        padding: 0,
                        marginLeft: -20,
                        marginTop: -15
                      }} onPress={() => this.props.onBackButtonClick(this.props)}>
                        <Ionicons
                            name="md-arrow-back"
                            size={40}
                            style={WorkOrderDetailsScreenStyles.goBackIcon}
                            color="#fff"
                        />
                      </Button>
                    </View>
                    <View style={WorkOrderDetailsScreenStyles.profileDropdownWrapper}>
                      <ProfileDropdown imageSource={require('../../assets/img/default-user.jpg')}
                                       navigation={this.props.navigation}/>
                    </View>

                  </View>
                </View>

                <View flex>
                  <TabBar style={TabBarStyles.detailsTabBar}
                          indicatorStyle={TabBarStyles.detailsTabBarIndicator}
                          mode="SCROLL">

                    <TabBar.Item label="MAIN"
                                 labelStyle={TabBarStyles.detailsTabBarItem}
                                 selectedLabelStyle={TabBarStyles.detailsTabBarItemSelected}
                                 onPress={() => this.toggleActiveTab(1)}
                    />

                    <TabBar.Item label="LABOR"
                                 labelStyle={TabBarStyles.detailsTabBarItem}
                                 selectedLabelStyle={TabBarStyles.detailsTabBarItemSelected}
                                 onPress={() => this.toggleActiveTab(2)}
                    />

                    <TabBar.Item label="ATTACHMENTS"
                                 labelStyle={TabBarStyles.detailsTabBarItem}
                                 selectedLabelStyle={TabBarStyles.detailsTabBarItemSelected}
                                 onPress={() => this.toggleActiveTab(3)}
                    />


                    <TabBar.Item label="MATERIALS"
                                 labelStyle={TabBarStyles.detailsTabBarItem}
                                 selectedLabelStyle={TabBarStyles.detailsTabBarItemSelected}
                                 onPress={() => this.toggleActiveTab(5)}
                    />

                  </TabBar>
                </View>
              </ImageBackground>

              {this.state.activeTab === 1 &&

              <View style={Content.default}>
                <Text style={Content.viewHeading}>
                  DETAILS
                </Text>

                <Card elevation={3}>
                  {this.props.isLoading &&
                  <View style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 10000,
                    backgroundColor: 'rgba(255,255,255,0.8)',

                  }}>
                    <ActivityIndicator color="#00aeee" style={{
                      position: 'absolute',
                      top: '50%',
                      left: '40%',
                      right: 0,
                      marginTop: -35,
                      width: 70,
                      height: 70,
                    }}/>
                  </View>
                  }
                  <Card.Section body>

                    <View>

                      <TextInput
                          placeholder="WORK ORDER NUMBER"
                          style={{color: '#000'}}
                          floatingPlaceholder
                          floatOnFocus={true}
                          floatingPlaceholderColor="#666"
                          titleColor="#00aeee"
                          underlineColor="#cecece"
                          placeholderTextColor="#666"
                          editable={false}
                          value={this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.WorkOrderId}
                      />
                    </View>

                    <View>

                      {this.state.statusModalLookUpVisible &&
                      <View style={{position: 'absolute'}}>
                        <LookupModal modalVisible={true}
                                     lookupSearchFunction={(text) => this.props.onStatusLookupChange(text)}
                                     lookupSearchedData={this.props.statusLookup}
                                     lookupApplyFunction={(item) => this._applyStatusLookup(item)}
                                     lookupBackFunction={() => this._closeLookup()}
                        />
                      </View>
                      }
                      <TouchableWithoutFeedback onPress={() => this.setState({statusModalLookUpVisible: true})}>
                        <View>
                          <View>
                            <TextInput
                                placeholder="STATUS*"
                                style={{color: '#000', paddingRight: 35}}
                                floatingPlaceholder
                                floatOnFocus={true}
                                floatingPlaceholderColor="#666"
                                titleColor="#00aeee"
                                underlineColor="#00aeee"
                                placeholderTextColor="#666"
                                editable={false}
                                value={this.state.data.Status}
                            />
                          </View>

                          <View style={{position: 'absolute', top: 7, right: -30}}>
                            <Button style={{
                              backgroundColor: 'transparent',
                            }} onPress={() => this.setState({statusModalLookUpVisible: true})}>
                              <Ionicons
                                  name="md-search"
                                  size={35}
                                  color="#666"
                              />
                            </Button>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>

                    <View>
                      <TextInput
                          placeholder="SUMMARY*"
                          style={{color: '#000'}}
                          floatingPlaceholder
                          floatOnFocus={true}
                          floatingPlaceholderColor="#666"
                          titleColor="#00aeee"
                          underlineColor="#00aeee"
                          placeholderTextColor="#666"
                          onChangeText={(text) => this.setState({data: {...this.state.data, Description: text}})}
                          value={this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.Description}
                      />
                    </View>


                    <View>
                      <TextInput
                          placeholder="SITE"
                          style={{color: '#000'}}
                          floatingPlaceholder
                          floatOnFocus={true}
                          floatingPlaceholderColor="#666"
                          titleColor="#00aeee"
                          underlineColor="#cecece"
                          placeholderTextColor="#666"
                          editable={false}
                          onChangeText={(text) => this.setState({data: {...this.state.data, SiteId: text}})}
                          value={this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.SiteId}
                      />
                    </View>

                    <View>
                      <TextInput
                          multiline={true}
                          placeholder="DETAILS*"
                          style={{color: '#000'}}
                          floatingPlaceholder
                          floatOnFocus={true}
                          floatingPlaceholderColor="#666"
                          titleColor="#00aeee"
                          underlineColor="#00aeee"
                          placeholderTextColor="#666"
                          onChangeText={(text) => this.setState({data: {...this.state.data, Text: text}})}
                          value={this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.Text}
                      />
                    </View>
                  </Card.Section>
                </Card>

                <Text style={Content.viewHeading}>
                  WORK DETAILS
                </Text>

                <Card elevation={3}>

                  {this.props.isLoading &&
                  <View style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 10000,
                    backgroundColor: 'rgba(255,255,255,0.8)',

                  }}>
                    <ActivityIndicator color="#00aeee" style={{
                      position: 'absolute',
                      top: '50%',
                      left: '40%',
                      right: 0,
                      marginTop: -35,
                      width: 70,
                      height: 70,
                    }}/>
                  </View>
                  }

                  <Card.Section body>

                    <View>
                      {this.state.locationIdModalLookUpVisible &&
                      <View style={{position: 'absolute'}}>
                        <LookupModal modalVisible={true}
                                     lookupSearchFunction={(text) => this.props.onLocationIdLookupChange(text, this.state.data.SiteId)}
                                     lookupSearchedData={this.props.locationIdLookup}
                                     lookupApplyFunction={(item) => this._applyLocationIdLookup(item)}
                                     lookupBackFunction={() => this._closeLookup()}
                        />
                      </View>
                      }
                      <TouchableWithoutFeedback onPress={() => this.setState({locationIdModalLookUpVisible: true})}>
                        <View>
                          <TextInput
                              placeholder="LOCATION"
                              style={{color: '#000', position: 'relative', paddingRight: 35}}
                              floatingPlaceholder
                              floatOnFocus={true}
                              floatingPlaceholderColor="#666"
                              titleColor="#00aeee"
                              underlineColor="#00aeee"
                              placeholderTextColor="#666"
                              editable={false}
                              value={this.state.data.Location ? this.state.data.Location.Label : null}
                          />

                          <View style={{position: 'absolute', top: 7, right: -30}}>
                            <Button style={{
                              backgroundColor: 'transparent',
                            }} onPress={() => this.setState({locationIdModalLookUpVisible: true})}>
                              <Ionicons
                                  name="md-search"
                                  size={35}
                                  color="#666"
                              />
                            </Button>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>

                    <View>
                      {this.state.assetIdModalLookUpVisible &&
                      <View style={{position: 'absolute'}}>
                        <LookupModal modalVisible={true}
                                     lookupSearchFunction={(text) => this.props.onAssetIdLookupChange(text, this.state.data.SiteId, this.state.data.LocationId)}
                                     lookupSearchedData={this.props.assetIdLookup}
                                     lookupApplyFunction={(item) => this._applyAssetIdLookup(item)}
                                     lookupBackFunction={() => this._closeLookup()}
                        />
                      </View>
                      }


                      <TouchableWithoutFeedback onPress={() => this.setState({assetIdModalLookUpVisible: true})}>
                        <View>
                          <TextInput
                              placeholder="ASSET"
                              style={{color: '#000', paddingRight: 35}}
                              floatingPlaceholder
                              floatOnFocus={true}
                              floatingPlaceholderColor="#666"
                              titleColor="#00aeee"
                              underlineColor="#00aeee"
                              placeholderTextColor="#666"
                              editable={false}
                              value={this.state.data.Asset ? this.state.data.Asset.Label : null}
                          />

                          <View style={{position: 'absolute', top: 7, right: -30}}>
                            <Button style={{
                              backgroundColor: 'transparent',
                            }} onPress={() => this.setState({assetIdModalLookUpVisible: true})}>
                              <Ionicons
                                  name="md-search"
                                  size={35}
                                  color="#666"
                              />
                            </Button>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>


                    <View>
                      {this.state.classificationModalLookUpVisible &&
                      <View style={{position: 'absolute'}}>
                        <LookupModal modalVisible={true}
                                     lookupSearchFunction={(text) => this.props.onClassificationLookupChange(text)}
                                     lookupSearchedData={this.props.classificationLookup}
                                     lookupApplyFunction={(item) => this._applyClassificationLookup(item)}
                                     lookupBackFunction={() => this._closeLookup()}
                        />
                      </View>
                      }


                      <TouchableWithoutFeedback onPress={() => this.setState({assetIdModalLookUpVisible: true})}>
                        <View>
                          <View>
                            <TextInput
                                placeholder="CLASSIFICATION"
                                style={{color: '#000', paddingRight: 35}}
                                floatingPlaceholder
                                floatOnFocus={true}
                                floatingPlaceholderColor="#666"
                                titleColor="#00aeee"
                                underlineColor="#00aeee"
                                placeholderTextColor="#666"
                                editable={false}
                                value={this.state.data.ClassStructure ? this.state.data.ClassStructure.Label : null}
                            />
                          </View>
                          <View style={{position: 'absolute', top: 7, right: -30}}>
                            <Button style={{
                              backgroundColor: 'transparent',
                            }} onPress={() => this.setState({classificationModalLookUpVisible: true})}>
                              <Ionicons
                                  name="md-search"
                                  size={35}
                                  color="#666"
                              />
                            </Button>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>

                    <View>
                      {this.state.workTypeModalLookUpVisible &&
                      <View style={{position: 'absolute'}}>
                        <LookupModal modalVisible={true}
                                     lookupSearchFunction={(text) => this.props.onWorkTypeLookupChange(text)}
                                     lookupSearchedData={this.props.workTypeLookup}
                                     lookupApplyFunction={(item) => this._applyWorkTypeLookup(item)}
                                     lookupBackFunction={() => this._closeLookup()}
                        />
                      </View>
                      }
                      <TouchableWithoutFeedback onPress={() => this.setState({workTypeModalLookUpVisible: true})}>
                        <View>
                          <View>
                            <TextInput
                                placeholder="WORK TYPE"
                                style={{color: '#000', paddingRight: 35}}
                                floatingPlaceholder
                                floatOnFocus={true}
                                floatingPlaceholderColor="#666"
                                titleColor="#00aeee"
                                underlineColor="#00aeee"
                                placeholderTextColor="#666"
                                editable={false}
                                onChangeText={(text) => this.setState({data: {...this.state.data, WorkTypeId: text}})}
                                value={this.state.data.WorkType ? this.state.data.WorkType.Label : null}
                            />
                          </View>
                          <View style={{position: 'absolute', top: 7, right: -30}}>
                            <Button style={{
                              backgroundColor: 'transparent',
                            }} onPress={() => this.setState({workTypeModalLookUpVisible: true})}>
                              <Ionicons
                                  name="md-search"
                                  size={35}
                                  color="#666"
                              />
                            </Button>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>

                    <View>

                      {this.state.priorityModalLookUpVisible &&
                      <View style={{position: 'absolute'}}>
                        <LookupModal modalVisible={true}
                                     lookupSearchFunction={(text) => this.props.onPriorityLookupChange(text)}
                                     lookupSearchedData={this.props.priorityLookup}
                                     lookupApplyFunction={(item) => this._applyPriorityLookup(item)}
                                     lookupBackFunction={() => this._closeLookup()}
                        />
                      </View>
                      }
                      <TouchableWithoutFeedback onPress={() => this.setState({priorityModalLookUpVisible: true})}>
                        <View>
                          <View>
                            <TextInput
                                placeholder="PRIORITY"
                                style={{color: '#000', paddingRight: 35}}
                                floatingPlaceholder
                                floatOnFocus={true}
                                floatingPlaceholderColor="#666"
                                titleColor="#00aeee"
                                underlineColor="#00aeee"
                                placeholderTextColor="#666"
                                editable={false}
                                value={this.state.data.PriorityDescription}
                            />
                          </View>

                          <View style={{position: 'absolute', top: 7, right: -30}}>
                            <Button style={{
                              backgroundColor: 'transparent',
                            }} onPress={() => this.setState({priorityModalLookUpVisible: true})}>
                              <Ionicons
                                  name="md-search"
                                  size={35}
                                  color="#666"
                              />
                            </Button>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>

                  </Card.Section>
                </Card>

                <Text style={Content.viewHeading}>
                  RESPONSABILITY
                </Text>

                <Card elevation={3}>

                  {this.props.isLoading &&
                  <View style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 10000,
                    backgroundColor: 'rgba(255,255,255,0.8)',

                  }}>
                    <ActivityIndicator color="#00aeee" style={{
                      position: 'absolute',
                      top: '50%',
                      left: '40%',
                      right: 0,
                      marginTop: -35,
                      width: 70,
                      height: 70,
                    }}/>
                  </View>
                  }

                  <Card.Section body>
                    <View>
                      {this.state.ownerModalLookUpVisible &&
                      <View style={{position: 'absolute'}}>
                        <LookupModal modalVisible={true}
                                     lookupSearchFunction={(text) => this.props.onOwnerLookupChange(text)}
                                     lookupSearchedData={this.props.ownerLookup}
                                     lookupApplyFunction={(item) => this._applyOwnerLookup(item)}
                                     lookupBackFunction={() => this._closeLookup()}
                        />
                      </View>
                      }
                      <TouchableWithoutFeedback onPress={() => this.setState({ownerModalLookUpVisible: true})}>
                        <View>

                          <View>
                            <TextInput
                                placeholder="OWNER"
                                style={{color: '#000', paddingRight: 35}}
                                floatingPlaceholder
                                floatOnFocus={true}
                                floatingPlaceholderColor="#666"
                                titleColor="#00aeee"
                                underlineColor="#00aeee"
                                placeholderTextColor="#666"
                                editable={false}
                                value={this.state.data.Owner ? this.state.data.Owner.Label : null}
                            />
                          </View>

                          <View style={{position: 'absolute', top: 7, right: -30}}>
                            <Button style={{
                              backgroundColor: 'transparent',
                            }} onPress={() => this.setState({ownerModalLookUpVisible: true})}>
                              <Ionicons
                                  name="md-search"
                                  size={35}
                                  color="#666"
                              />
                            </Button>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>

                    <View>
                      <View>
                        <TextInput
                            placeholder="OWNER GROUP"
                            style={{color: '#000', paddingRight: 35}}
                            floatingPlaceholder
                            floatOnFocus={true}
                            floatingPlaceholderColor="#666"
                            titleColor="#00aeee"
                            underlineColor="#cecece"
                            placeholderTextColor="#666"
                            editable={false}
                            value={this.state.data.OwnerGroup ? this.state.data.OwnerGroup.Label : null}
                        />
                      </View>

                    </View>


                    <View>
                      <TextInput
                          placeholder="REPORTED BY"
                          style={{color: '#000', paddingRight: 35}}
                          floatingPlaceholder
                          floatOnFocus={true}
                          floatingPlaceholderColor="#666"
                          titleColor="#00aeee"
                          underlineColor="#cecece"
                          placeholderTextColor="#666"
                          editable={false}
                          value={this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.ReportedById}
                      />
                    </View>

                    <View>
                      <TextInput
                          placeholder="REPORTED DATE"
                          style={{color: '#000', paddingRight: 35}}
                          floatingPlaceholder
                          floatOnFocus={true}
                          floatingPlaceholderColor="#666"
                          titleColor="#00aeee"
                          underlineColor="#cecece"
                          placeholderTextColor="#666"
                          editable={false}
                          onChangeText={(text) => this.setState({data: {...this.state.data, ReportedAt: text}})}
                          value={this.props.getSelectedWorkOrder != null && this.formatDate(this.props.getSelectedWorkOrder.ReportedAt)}
                      />
                    </View>

                  </Card.Section>
                </Card>

              </View>
              }

              {this.state.activeTab === 2 &&
              <View style={Content.default}>
                {this.state.showCreateLaborForm == false &&

                <Button style={{
                  backgroundColor: '#51bee9',
                  alignSelf: 'center',
                  width: '80%',
                  height: 36,
                  marginTop: 6
                }}>
                  <Text style={{
                    fontWeight: 'normal',
                    color: '#FFF',
                    fontSize: 14,
                    width: '100%',
                    textAlign: 'center',
                  }}
                        onPress={() => {
                          this._toggleShowCreateLaborForm()
                        }}>
                    CREATE LABOR
                  </Text>
                </Button>}

                {this.state.showCreateLaborForm == true &&
                <Text style={Content.viewHeading}>
                  ADD LABOR
                </Text>}

                {this.state.showCreateLaborForm == true &&

                <Card elevation={3}>

                  {this.props.isLoading &&
                  <View style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 10000,
                    backgroundColor: 'rgba(255,255,255,0.8)',

                  }}>
                    <ActivityIndicator color="#00aeee" style={{
                      position: 'absolute',
                      top: '50%',
                      left: '40%',
                      right: 0,
                      marginTop: -35,
                      width: 70,
                      height: 70,
                    }}/>
                  </View>
                  }

                  <Card.Section body>

                    <View>

                      <View>

                        {this.state.laborModalLookUpVisible &&
                        <View style={{position: 'absolute'}}>
                          <LookupModal modalVisible={true}
                                       lookupSearchFunction={(text) => this.props.onLaborLookupChange(text)}
                                       lookupSearchedData={this.props.laborLookup}
                                       lookupApplyFunction={(item) => this._applyLaborLookup(item)}
                                       lookupBackFunction={() => this._closeLookup()}
                          />
                        </View>
                        }
                        <TouchableWithoutFeedback onPress={() => this.setState({laborModalLookUpVisible: true})}>
                          <View>
                            <View>
                              <TextInput
                                  placeholder="LABOR*"
                                  style={{color: '#000', paddingRight: 35}}
                                  floatingPlaceholder
                                  floatOnFocus={true}
                                  floatingPlaceholderColor="#666"
                                  titleColor="#00aeee"
                                  underlineColor="#00aeee"
                                  placeholderTextColor="#666"
                                  editable={false}
                                  value={this.state.laborData.LaborId}
                              />
                            </View>

                            <View style={{position: 'absolute', top: 7, right: -30}}>
                              <Button style={{
                                backgroundColor: 'transparent',
                              }} onPress={() => this.setState({laborModalLookUpVisible: true})}>
                                <Ionicons
                                    name="md-search"
                                    size={35}
                                    color="#666"
                                />
                              </Button>
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>


                      <View>

                        {this.state.craftModalLookUpVisible &&
                        <View style={{position: 'absolute'}}>
                          <LookupModal modalVisible={true}
                                       lookupSearchFunction={(text) => this.props.onCraftLookupChange(this.state.laborData.LaborId, text)}
                                       lookupSearchedData={this.props.craftLookup}
                                       lookupApplyFunction={(item) => this._applyCraftLookup(item)}
                                       lookupBackFunction={() => this._closeLookup()}
                          />
                        </View>
                        }
                        <TouchableWithoutFeedback onPress={() => this.setState({craftModalLookUpVisible: true})}>
                          <View>
                            <View>
                              <TextInput
                                  placeholder="CRAFT*"
                                  style={{color: '#000', paddingRight: 35}}
                                  floatingPlaceholder
                                  floatOnFocus={true}
                                  floatingPlaceholderColor="#666"
                                  titleColor="#00aeee"
                                  underlineColor="#00aeee"
                                  placeholderTextColor="#666"
                                  editable={false}
                                  value={this.state.laborData.CraftIdDescription}
                              />
                            </View>

                            <View style={{position: 'absolute', top: 7, right: -30}}>
                              <Button style={{
                                backgroundColor: 'transparent',
                              }} onPress={() => this.setState({craftModalLookUpVisible: true})}>
                                <Ionicons
                                    name="md-search"
                                    size={35}
                                    color="#666"
                                />
                              </Button>
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>


                      <TextInput
                          placeholder="LINE COST"
                          keyboardType='numeric'
                          style={{color: '#000', position: 'relative', paddingRight: 35}}
                          floatingPlaceholder
                          floatOnFocus={true}
                          floatingPlaceholderColor="#666"
                          titleColor="#00aeee"
                          underlineColor="#cecece"
                          placeholderTextColor="#666"
                          editable={false}
                          value={this.state.laborData.LineCost}
                      />

                      <View>

                        {this.state.craftModalLookUpVisible &&
                        <View style={{position: 'absolute'}}>
                          <LookupModal modalVisible={true}
                                       lookupSearchFunction={(text) => this.props.onCraftLookupChange(this.state.laborData.LaborId, text)}
                                       lookupSearchedData={this.props.craftLookup}
                                       lookupApplyFunction={(item) => this._applyCraftLookup(item)}
                                       lookupBackFunction={() => this._closeLookup()}
                          />
                        </View>
                        }
                        <TouchableWithoutFeedback onPress={() => this._selectDate()}>
                          <View>
                            <View>
                              <TextInput
                                  placeholder="START DATE*"
                                  style={{color: '#000', paddingRight: 35}}
                                  floatingPlaceholder
                                  floatOnFocus={true}
                                  floatingPlaceholderColor="#666"
                                  titleColor="#00aeee"
                                  underlineColor="#00aeee"
                                  placeholderTextColor="#666"
                                  editable={false}
                                  value={(this.state.LaborStartDateLabel)}
                              />
                            </View>

                            <View style={{position: 'absolute', top: 7, right: -30}}>
                              <Button style={{
                                backgroundColor: 'transparent',
                              }} onPress={() => this._selectDate()

                              }>
                                <Ionicons
                                    name="md-calendar"
                                    size={35}
                                    color="#666"
                                />
                              </Button>
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>

                      <TextInput
                          keyboardType='numeric'
                          placeholder="REGULAR HOURS"
                          style={{color: '#000', position: 'relative', paddingRight: 35}}
                          floatingPlaceholder
                          floatOnFocus={true}
                          floatingPlaceholderColor="#666"
                          titleColor="#00aeee"
                          underlineColor="#00aeee"
                          placeholderTextColor="#666"
                          editable={true}
                          onChangeText={(text) => {
                            this.setState({
                              laborData: {
                                ...this.state.laborData,
                                RegularHours: (parseInt(text)).toString()
                              }
                            })
                          }}
                          value={this.state.laborData.RegularHours}
                      />
                    </View>
                    <View>
                      <Button style={{
                        backgroundColor: '#51bee9',
                        alignSelf: 'center',
                        width: '80%',
                        height: 36,
                        marginTop: 6
                      }}>
                        <Text style={{
                          fontWeight: 'normal',
                          color: '#FFF',
                          fontSize: 14,
                          width: '100%',
                          textAlign: 'center',
                        }}
                              onPress={() => {
                                if (!this.state.laborData.LaborId) {
                                  this.refs.toast.show('Labor field is required', 3000)
                                } else if (!this.state.laborData.CraftId) {
                                  this.refs.toast.show('Craft field is required', 3000)
                                } else if (!this.state.laborData.DtStart) {
                                  this.refs.toast.show('Start Date field is required', 3000)
                                }else if (!this.state.laborData.RegularHours) {
                                  this.refs.toast.show('Regular hours field is required', 3000)
                                }
                                else {
                                  this.props.onCreateLabor(this.state.laborData, this.props.getSelectedWorkOrder.WorkOrderId, this.props.userData.data.Token)
                                }

                              }}>
                          CREATE LABOR
                        </Text>
                      </Button>
                    </View>
                  </Card.Section>
                </Card>}
                <Text style={Content.viewHeading}>
                  LABOR
                </Text>

                {_.map(this.props.labor.Records, (labor, index) =>
                    <Card elevation={3} style={{marginBottom: 15}} key={index}>
                      <Card.Section body>

                        {this.state.getSelectedWorkOrder &&
                        <LoaderScreen
                            color="#01a1db"
                            overlay={true}
                            backgroundColor="#fff"
                        />
                        }

                        <Text style={Content.heading}>
                          {labor.LaborId}
                        </Text>

                        <View style={Content.separator}/>

                        <View>
                          <Text style={Content.innerHeadline}>REGULAR HOURS</Text>
                          <Text style={Content.innerValue}>{labor.RegularHours}</Text>
                        </View>

                        <View style={Content.separator}/>

                        <View>
                          <Text style={Content.innerHeadline}>GL DEBIT ACCOUNT</Text>
                          <Text style={Content.innerValue}>{labor.GlDebitAccount}</Text>
                        </View>

                        <View style={Content.separator}/>

                        <View>
                          <Text style={Content.innerHeadline}>CREATE DATE</Text>
                          <Text style={Content.innerValue}>{moment(labor.DtStart).format('DD/MM/YYYY')}</Text>
                        </View>

                        <View style={Content.separator}/>

                        <View>
                          <Text style={Content.innerHeadline}>LINE COST</Text>
                          <Text style={Content.innerValue}>{'USD$ ' + labor.LineCost}</Text>
                        </View>

                        <View style={Content.separator}/>

                        <View>
                          <Text style={Content.innerHeadline}>APPROVED ? </Text>
                          <Text style={Content.innerValue}>{labor.Approved == true ? 'YES' : 'NO'}</Text>
                        </View>


                      </Card.Section>
                    </Card>)
                }

                <Toast ref="toast"/>
              </View>
              }

              {this.state.activeTab === 3 &&
              <View style={Content.default}>
                <Text style={Content.viewHeading}>
                  ATTACHMENTS
                </Text>
                <Text style={{textAlign: 'center', marginTop: 10, fontSize: 18, color: '#000'}}>
                  No Attachments to show
                </Text>
              </View>
              }

              {this.state.activeTab === 5 &&
              <View style={Content.default}>

                {this.state.activeTab === 5 &&
                <View>

                  {this.state.showCreateMaterialForm == false &&

                  <Button style={{
                    backgroundColor: '#51bee9',
                    alignSelf: 'center',
                    width: '80%',
                    height: 36,
                    marginTop: 6
                  }}>
                    <Text style={{
                      fontWeight: 'normal',
                      color: '#FFF',
                      fontSize: 14,
                      width: '100%',
                      textAlign: 'center',
                    }}
                          onPress={() => {
                            this._toggleShowCreateMaterialForm()
                          }}>
                      CREATE MATERIAL
                    </Text>
                  </Button>}


                  {this.state.showCreateMaterialForm == true &&

                  <Card elevation={3}>

                    {this.props.materialLoading &&
                    <View style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      zIndex: 10000,
                      backgroundColor: 'rgba(255,255,255,0.8)',

                    }}>
                      <ActivityIndicator color="#00aeee" style={{
                        position: 'absolute',
                        top: '50%',
                        left: '40%',
                        right: 0,
                        marginTop: -35,
                        width: 70,
                        height: 70,
                      }}/>
                    </View>
                    }

                    <Card.Section body>

                      <View>
                        <TextInput
                            placeholder="TYPE"
                            style={{color: '#000', position: 'relative', paddingRight: 35}}
                            floatingPlaceholder
                            floatOnFocus={true}
                            floatingPlaceholderColor="#666"
                            titleColor="#00aeee"
                            underlineColor="#cecece"
                            placeholderTextColor="#666"
                            editable={false}
                            value={'Material'}
                        />
                        <TextInput
                            placeholder="MATERIAL DESCRIPTION*"
                            style={{color: '#000', position: 'relative', paddingRight: 35}}
                            floatingPlaceholder
                            floatOnFocus={true}
                            floatingPlaceholderColor="#666"
                            titleColor="#00aeee"
                            underlineColor="#00aeee"
                            placeholderTextColor="#666"
                            editable={true}
                            onChangeText={(text) => {
                              this.setState({materialData: {...this.state.materialData, Description: text}})
                            }}
                            value={this.state.materialData.Description}
                        />
                        <TextInput
                            keyboardType='numeric'
                            placeholder="UNIT COST*"
                            style={{color: '#000', position: 'relative', paddingRight: 35}}
                            floatingPlaceholder
                            floatOnFocus={true}
                            floatingPlaceholderColor="#666"
                            titleColor="#00aeee"
                            underlineColor="#00aeee"
                            placeholderTextColor="#666"
                            editable={true}
                            onChangeText={(text) => {
                              this.setState({materialData: {...this.state.materialData, UnitCost: text}})
                            }}
                            value={this.state.materialData.UnitCost}
                        />
                        <TextInput
                            keyboardType='numeric'
                            placeholder="QUANTITY*"
                            style={{color: '#000', position: 'relative', paddingRight: 35}}
                            floatingPlaceholder
                            floatOnFocus={true}
                            floatingPlaceholderColor="#666"
                            titleColor="#00aeee"
                            underlineColor="#00aeee"
                            placeholderTextColor="#666"
                            editable={true}
                            onChangeText={(text) => {
                              this.setState({
                                materialData: {
                                  ...this.state.materialData,
                                  Quantity: (parseInt(text) * -1).toString()
                                }
                              })
                            }}
                            value={this.state.materialData.Quantity ? (parseInt(this.state.materialData.Quantity) * -1).toString() : ''}
                        />
                      </View>
                      <View>
                        <Button style={{
                          backgroundColor: '#51bee9',
                          alignSelf: 'center',
                          width: '80%',
                          height: 36,
                          marginTop: 6
                        }}>
                          <Text style={{
                            fontWeight: 'normal',
                            color: '#FFF',
                            fontSize: 14,
                            width: '100%',
                            textAlign: 'center',
                          }}
                                onPress={() => {
                                  if (!this.state.materialData.Description) {
                                    this.refs.toast.show('Description field is required', 3000)
                                  } else if (!this.state.materialData.UnitCost) {
                                    this.refs.toast.show('Unit cost field is required', 3000)
                                  } else if (!this.state.materialData.Quantity) {
                                    this.refs.toast.show('Quantity field is required', 3000)
                                  } else {
                                    this.props.onCreateMaterial(this.state.materialData, this.props.getSelectedWorkOrder.WorkOrderId, this.props.userData.data.Token)
                                  }

                                }}>
                            CREATE MATERIAL
                          </Text>
                        </Button>
                      </View>
                    </Card.Section>
                  </Card>}


                  <Text style={Content.viewHeading}>
                    MATERIALS
                  </Text>


                  {_.map(this.props.material.Records, (material, index) =>

                      <Card elevation={3} style={{marginBottom: 15}} key={index}>
                        <Card.Section body>

                          {this.props.isLoading &&
                          <LoaderScreen
                              color="#01a1db"
                              overlay={true}
                              backgroundColor="#fff"
                          />
                          }

                          <Text style={Content.heading}>
                            {material.AssetId}
                          </Text>

                          <View style={Content.separator}/>

                          <View>
                            <Text style={Content.innerHeadline}>DESCRIPTION</Text>
                            <Text style={Content.innerValue}>{material.Description}</Text>
                          </View>

                          <View style={Content.separator}/>

                          <View>
                            <Text style={Content.innerHeadline}>TRANSFER DATE</Text>
                            <Text style={Content.innerValue}>{moment(Date.now()).format('DD/MM/YYYY')}</Text>
                          </View>

                          <View style={Content.separator}/>

                          <View>
                            <Text style={Content.innerHeadline}>TYPE</Text>
                            <Text style={Content.innerValue}>{material.LineType}</Text>
                          </View>

                          <View style={Content.separator}/>

                          <View>
                            <Text style={Content.innerHeadline}>STORE ROOM</Text>
                            <Text style={Content.innerValue}>{material.StoreId}</Text>
                          </View>

                          <View style={Content.separator}/>

                          <View>
                            <Text style={Content.innerHeadline}> QUANTITY </Text>
                            <Text style={Content.innerValue}>{material.Quantity * -1}</Text>
                          </View>

                        </Card.Section>
                      </Card>
                  )}

                </View>


                }
              </View>

              }

              <Toast ref="toast"/>

            </ScrollView>
            <Toast ref="toast"/>
            <WorkOrderEditFab onCancelButtonClick={this.props.onBackButtonClick}
                              onEditButtonClick={this._onEditButtonClick}
                              navigation={this.props.navigation}
            />
          </View>

        </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: UserReducer.getUserData(state),
    laborLookup: LaborLookupReducer.doLaborLookup(state),
    getToastMessages: WorkOrderSelectors.tostMessage(state),
    getSelectedWorkOrder: WorkOrderSelectors.getSelectedWorkOrder(state),
    isLoading: WorkOrderSelectors.isLoading(state),
    locationIdLookup: LocationIdLookupReducer.doLocationIdLookup(state),
    assetIdLookup: AssetIdLookupReducer.doAssetIdLookup(state),
    siteIdLookup: SiteIdLookupReducer.doSiteIdLookup(state),
    classificationLookup: ClassificationLookupReducer.doClassificationLookup(state),
    workTypeLookup: WorkTypeLookupReducer.doWorkTypeLookup(state),
    ownerLookup: OwnerLookupReducer.doOwnerLookup(state),
    ownerGroupLookup: OwnerGroupLookupReducer.doOwnerGroupLookup(state),
    reportedByLookup: ReportedByLookupReducer.doReportedByLookup(state),
    priorityLookup: PriorityLookupReducer.doPriorityLookup(state),
    statusLookup: StatusLookupReducer.doStatusLookup(state),
    material: materialReducer.getMaterial(state),
    materialLoading: materialReducer.isLoading(state),
    craftLookup: CraftLookupReducer.doCraftLookup(state),
    labor: laborReducer.getLabor(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {

    onGetLabor: (token, id) => {
      dispatch(laborListRequest(token, id))


    },
    onGetCraftPagination: (laborId, text) => {
      dispatch(craftLookup(laborId, text))
    },

    onGetLaborsPagination: (token, search) => {
      dispatch(laborLookup(token, search))
    },

    onStatusLookupChange: (text) => {
      dispatch(statusLookup(text))
    },
    onPriorityLookupChange: (text) => {
      dispatch(priorityLookup(text))
    },
    onLocationIdLookupChange: (text, siteId) => {
      dispatch(locationIdLookup(text, siteId))
    },
    onAssetIdLookupChange: (text, siteId, locationId) => {
      dispatch(assetIdLookup(text, siteId, locationId))
    },
    onSiteIdLookupChange: (text, orgId) => {
      dispatch(siteIdLookup(text, orgId))
    },
    onClassificationLookupChange: (text) => {
      dispatch(classificationLookup(text))
    },
    onWorkTypeLookupChange: (text) => {
      dispatch(workTypeLookup(text))
    },
    onOwnerLookupChange: (text) => {
      dispatch(ownerLookup(text))
    },
    onOwnerGroupLookupChange: (text) => {
      dispatch(ownerGroupLookup(text))
    },
    onLaborLookupChange: (text) => {
      dispatch(laborLookup(text))
    },
    onCraftLookupChange: (laborId, text) => {
      dispatch(craftLookup(laborId, text))
    },
    onBackButtonClick: () => {
      dispatch(StackActions.pop({n: 1}))
      return true;
    },
    onGetWorkerDetails: (id) => {
      dispatch(getWorkOrderDetail(id));
    },

    onGetMaterial: (token, id) => {

      dispatch(materialRequest(token, id))
    },


    onEditWorkOrder: (data, navigation) => {
      dispatch(workOrderEdit(data));
      dispatch(navigation.navigate('WorkOrderDetails'));
      dispatch(emptyWorkOrder())
      return true;
    },
    onCreateMaterial: (data, id, token) => {

      dispatch(createMaterial(data));
      setTimeout(() => dispatch(materialRequest(token, id)), 100)
      return true;
    },

    onCreateLabor: (data, id, token) => {
      dispatch(laborCreate(data));
      setTimeout(() => dispatch(laborListRequest(token, id)), 100)
      return true;
    }

  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(WorkOrderDetailsScreen);


