import React from 'react';
import {
  ImageBackground,
  ScrollView,
  BackHandler,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

import {View, Text, TextInput, Card, Button} from 'react-native-ui-lib';
import {Ionicons} from '@expo/vector-icons';
import {StackActions} from 'react-navigation';
import moment from "moment";
import {workOrderCreate} from '../../actions/workOrder/workOrder';
import {
  siteIdLookup,
  locationIdLookup,
  assetIdLookup,
  classificationLookup,
  ownerGroupLookup,
  ownerLookup,
  workTypeLookup,
  priorityLookup,
} from '../../actions/lookup/lookup';

import {connect} from "react-redux";

import Toast from 'react-native-easy-toast';

import NewWorkOrderScreenStyles from './NewWorkOrderScreenStyles'
import Content from "../../styles/Content";

import * as AssetIdLookupReducer from '../../reducers/lookup/assetIdLookup';
import * as ClassificationLookupReducer from '../../reducers/lookup/classificationLookup';
import * as LocationIdLookupReducer from '../../reducers/lookup/locationIdLookup';
import * as OwnerLookupReducer from '../../reducers/lookup/ownerLookup';
import * as OwnerGroupLookupReducer from '../../reducers/lookup/ownerGroupLookup';
import * as PriorityLookupReducer from '../../reducers/lookup/priorityLookup';
import * as SiteIdLookupReducer from '../../reducers/lookup/siteIdLookup';
import * as WorkTypeLookupReducer from '../../reducers/lookup/workTypeLookup';

import * as UserReducer from '../../reducers/user/user';
import * as WorkOrderSelectors from "../../reducers/workOrder/workOrder";
import * as NavigationActions from "../../actions/navigator";

import LookupModal from '../../components/Lookup/LookupModal'
import LoaderScreen from "react-native-ui-lib/typings/screensComponents/loaderScreen";

class NewWorkOrderScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {

    lookupTemp: {},

    //SITE ID LOOKUP
    siteIdModalLookUpVisible: false,
    siteIdLookUpData: null,

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

    //OWNER GROUP LOOKUP
    ownerGroupModalLookUpVisible: false,
    ownerGroupLookUpData: null,

    //PRIORITY
    priorityModalLookUpVisible: false,
    priorityLookUpData: null,

    goToCreatedWorkOrder: false,
    initialState: {
      ReportedByDescription: this.props.userData.data.FirstName,
      LocationDescription: this.props.userData.data.Location.Label,
      SiteDescription: this.props.userData.data.Site.Label,
      AssetDescription: null,
      ClassStructureDescription: null,
      OwnerDescription: null,
      OwnerGroupDescription: null,
      WorkTypeDescription: null
    },
    data: {
      Description: "",
      Text: "",
      Asset: null,
      AssetId: null,
      ClassStructure: null,
      ClassStructureId: null,
      DtTargetEnd: null,
      DtTargetStart: null,
      Id: null,
      JpNum: null,
      Label: "",
      LongDescription: '',
      Owner: null,
      OwnerId: null,
      OwnerGroup: null,
      OwnerGroupId: "",
      PriorityDescription: null,
      ProblemCode: null,
      WorkOrderId: null,
      WorkType: null,
      WorkTypeId: "",
    },
  };

  componentDidMount() {

    if (this.props.userData) {
      this.setState({
        data: {
          ...this.state.data,
          OrgId: this.props.userData.data.OrgId,
          ReportedAt: moment().format('YYYY-MM-DD[T]HH:mm:SS'),
          DtStatusUpdate: moment().format('YYYY-MM-DD[T]HH:mm:SS'),
          Status: "( WAPPR ) Waiting on Approval",
          StatusId: "WAPPR",
          ReportedBy: this.props.userData.data,
          ReportedById: this.props.userData.data.MaxPersonId,
          Location: this.props.userData.data.Location,
          LocationId: this.props.userData.data.Location.LocationId,
          Site: this.props.userData.data.Site,
          SiteId: this.props.userData.data.Site.SiteId,
        }
      })
    }

    BackHandler.addEventListener('hardwareBackPress', this.props.onBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.props.onBackButtonClick);
  }

  componentDidUpdate() {
    if (this.props.createdWorkOrderData && this.state.goToCreatedWorkOrder) {
      this.props.onWorkOrderCreated(this.props.createdWorkOrderData.data.Id)
      this.setState({goToCreatedWorkOrder: false});
    }
  }

  /* SITE ID LOOKUP */

  _applySiteIdLookup = (data) => {
    if (data.Description != this.state.initialState.SiteDescription) {

      this.setState({
        ...this.state,
        initialState: {
          LocationDescription: null,
          AssetDescription: null,
          SiteDescription: data.Label
        },
        lookupTemp: {
          ...this.state.lookupTemp,
          Site: data,
          SiteId: data.SiteId,
          LocationId: null,
          Location: null,
          AssetId: null,
          Asset: null
        },
        data: {
          ...this.state.data,
          Site: data,
          SiteId: data.SiteId,
          LocationId: null,
          Location: null,
          AssetId: null,
          Asset: null
        }
      });

    }

    this._closeLookup();
  }
  /* SITE ID LOOKUP END */


  /* LOCATION ID LOOKUP */

  _applyLocationIdLookup = (data) => {
    if (data.LocationId != this.state.data.LocationId) {
      this.setState({
        ...this.state,
        initialState: {
          ...this.state.initialState,
          LocationDescription: data.Label,
          AssetDescription: null,
        },
        lookupTemp: {
          ...this.state.lookupTemp,
          ...this.state.data,
          Location: data,
          LocationId: data.LocationId,
          AssetId: null,
          Asset: null
        },

        data: {
          ...this.state.data,
          Location: data,
          LocationId: data.LocationId,
          AssetId: null,
          Asset: null
        }
      });
    }
    this._closeLookup();
  }
  /* LOCATION ID LOOKUP END */


  /* ASSET ID LOOKUP */

  _applyAssetIdLookup = (data) => {
    this.setState({
      ...this.state,
      initialState: {
        ...this.state.initialState,
        AssetDescription: data.Label
      },
      lookupTemp: {
        ...this.state.lookupTemp,
        AssetId: data.AssetId,
        Asset: data,
      },
      data: {
        ...this.state.data,
        AssetId: data.AssetId,
        Asset: data,
      }
    });

    this._closeLookup();
  }
  /* ASSET ID LOOKUP END */

  /* CLASSIFICATION LOOKUP */

  _applyClassificationLookup = (data) => {
    this.setState({
      ...this.state,
      initialState: {
        ...this.state.initialState,
        ClassStructureDescription: data.Label,
      },
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
      initialState: {
        ...this.state.initialState,
        WorkTypeDescription: data.Label
      },
      lookupTemp: {
        ...this.state.lookupTemp,
        WorkTypeId: data.WorkTypeId,
        WorkType: data
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


  /* OWNER GROUP LOOKUP */
  _applyOwnerGroupLookup = (data) => {

    this.setState({
      ...this.state,
      initialState: {
        ...this.state.initialState,
        OwnerGroupDescription: data.Label
      },
      lookupTemp: {
        ...this.state.lookupTemp,
        OwnerGroupId: data.PersonGroupId,
        OwnerGroup: data
      },
      data: {
        ...this.state.data,
        OwnerGroupId: data.PersonGroupId,
        OwnerGroup: data
      }
    });

    this._closeLookup();
  }
  /* OWNER GROUP LOOKUP END */


  /* OWNER LOOKUP */

  _applyOwnerLookup = (data) => {
    this.setState({
      ...this.state,
      initialState: {
        ...this.state.initialState,
        OwnerDescription: data.Description
      },
      lookupTemp: {
        ...this.state.lookupTemp,
        OwnerId: data.PersonId,
        Owner: data
      },
      data: {
        ...this.state.data,
        OwnerId: data.PersonId,
        Owner: data
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
        Priority: data.PriorityId,
        PriorityDescription: data.Description,
      },
      data: {
        ...this.state.data,
        Priority: data.PriorityId,
        PriorityDescription: data.Description,
      }
    });
    this._closeLookup();
  }

  /* PRIORITY LOOKUP END */

  _closeLookup = () => {

    this.setState({siteIdModalLookUpVisible: false});

    this.setState({locationIdModalLookUpVisible: false});
    this.setState({locationLookUpVisible: false});

    this.setState({assetIdModalLookUpVisible: false});
    this.setState({assetLookUpVisible: false});

    this.setState({classificationModalLookUpVisible: false});
    this.setState({classificationLookUpVisible: false});

    this.setState({workTypeModalLookUpVisible: false});
    this.setState({workTypeLookUpVisible: false});

    this.setState({ownerModalLookUpVisible: false});
    this.setState({ownerLookUpVisible: false});

    this.setState({ownerGroupModalLookUpVisible: false});
    this.setState({ownerGroupLookUpVisible: false});

    this.setState({priorityModalLookUpVisible: false});
    this.setState({priorityLookupUpVisible: false})

  }

  _onCreateButtonPressed = (form, toast, navigation) => {

    if (!this.state.data.Description) {
      this.refs.toast.show('Summary field is required', 3000)
    } else if (!this.state.data.SiteId) {
      this.refs.toast.show('Please, select the site', 3000)
    } else {
      this.setState({goToCreatedWorkOrder: true});
      this.props.onCreateButtonPressed(form, toast, navigation);
    }
  }

  render() {
    return (

        <KeyboardAvoidingView behavior="padding" enabled style={{flex: 1, flexGrow: 1,}}>

          {this.props.isLoading &&
          <View style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 10000,
            backgroundColor: 'rgba(255, 255, 255, 0.85)'
          }}>

            <LoaderScreen
                style={{margin: 20}}
                color="#00aeee"
                overlay={false}
            />

          </View>
          }


          {this.state.siteIdModalLookUpVisible &&
          <LookupModal modalVisible={true}
                       lookupSearchFunction={(text) => this.props.onSiteIdLookupChange(text, this.state.data.OrgId)}
                       lookupSearchedData={this.props.siteIdLookup}
                       lookupApplyFunction={(item) => this._applySiteIdLookup(item)}
                       lookupBackFunction={() => this._closeLookup()}
          />}

          {this.state.locationIdModalLookUpVisible &&
          <LookupModal modalVisible={true}
                       lookupSearchFunction={(text) => this.props.onLocationIdLookupChange(text, this.state.data.SiteId)}
                       lookupSearchedData={this.props.locationIdLookup}
                       lookupApplyFunction={(item) => this._applyLocationIdLookup(item)}
                       lookupBackFunction={() => this._closeLookup()}
          />}

          {this.state.assetIdModalLookUpVisible &&
          <LookupModal modalVisible={true}
                       lookupSearchFunction={(text) => this.props.onAssetIdLookupChange(text, this.state.data.SiteId, this.state.data.LocationId)}
                       lookupSearchedData={this.props.assetIdLookup}
                       lookupApplyFunction={(item) => this._applyAssetIdLookup(item)}
                       lookupBackFunction={() => this._closeLookup()}
          />}

          {this.state.classificationModalLookUpVisible &&
          <LookupModal modalVisible={true}
                       lookupSearchFunction={(text) => this.props.onClassificationLookupChange(text)}
                       lookupSearchedData={this.props.classificationLookup}
                       lookupApplyFunction={(item) => this._applyClassificationLookup(item)}
                       lookupBackFunction={() => this._closeLookup()}
          />}

          {this.state.workTypeModalLookUpVisible &&
          <LookupModal modalVisible={true}
                       lookupSearchFunction={(text) => this.props.onWorkTypeLookupChange(text)}
                       lookupSearchedData={this.props.workTypeLookup}
                       lookupApplyFunction={(item) => this._applyWorkTypeLookup(item)}
                       lookupBackFunction={() => this._closeLookup()}
          />}

          {this.state.ownerModalLookUpVisible &&
          <LookupModal modalVisible={true}
                       lookupSearchFunction={(text) => this.props.onOwnerLookupChange(text)}
                       lookupSearchedData={this.props.ownerLookup}
                       lookupApplyFunction={(item) => this._applyOwnerLookup(item)}
                       lookupBackFunction={() => this._closeLookup()}
          />}

          {this.state.ownerGroupModalLookUpVisible &&
          <LookupModal modalVisible={true}
                       lookupSearchFunction={(text) => this.props.onOwnerGroupLookupChange(text)}
                       lookupSearchedData={this.props.ownerGroupLookup}
                       lookupApplyFunction={(item) => this._applyOwnerGroupLookup(item)}
                       lookupBackFunction={() => this._closeLookup()}
          />}

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

          <ScrollView style={NewWorkOrderScreenStyles.container} keyboardShouldPersistTaps="always">
            <ImageBackground
                source={require('../../assets/img/bg/bg.png')}
                resizeMode="cover"
                style={NewWorkOrderScreenStyles.imageBackground}>

              <View style={NewWorkOrderScreenStyles.resumeHeaderContainer}>
                <View style={NewWorkOrderScreenStyles.resumeHeaderInner}>
                  <View flex>
                    <Button style={{
                      backgroundColor: 'transparent',
                      width: 20,
                      padding: 0,
                      marginLeft: -20,
                      marginTop: -15
                    }}
                            onPress={this.props.onBackButtonClick}>
                      <Ionicons
                          name="md-arrow-back"
                          size={40}
                          style={NewWorkOrderScreenStyles.goBackIcon}
                          color="#fff"
                      />
                    </Button>
                  </View>
                  {/*<View style={NewWorkOrderScreenStyles.profileDropdownWrapper}>
                  <ProfileDropdown imageSource={require('../../assets/img/default-user.jpg')}
                                   navigation={this.props.navigation}/>
                </View>*/}
                </View>
              </View>
            </ImageBackground>

            <View style={{paddingRight: 10, paddingLeft: 10, paddingBottom: 10}}>

              <Text style={Content.viewHeading}>
                ADD NEW WORK ORDER
              </Text>

              <Card elevation={3}>
                <Card.Section body>

                  <View>
                    <TextInput
                        placeholder="SUMMARY*"
                        style={{paddingRight: 35}}
                        floatingPlaceholder
                        floatOnFocus={true}
                        floatingPlaceholderColor="#666"
                        titleColor="#00aeee"
                        underlineColor="#00aeee"
                        placeholderTextColor="#666"
                        onChangeText={(text) => {
                          this.setState({data: {...this.state.data, Description: text}})
                        }}
                        value={this.state.data.Description}
                    />
                  </View>

                  <View>
                    <TextInput
                        placeholder="DETAILS*"
                        multiline = {true}
                        style={
                          {
                            paddingRight: 35
                          }
                        }
                        floatingPlaceholder
                        floatOnFocus={true}
                        floatingPlaceholderColor="#666"
                        titleColor="#00aeee"
                        underlineColor="#00aeee"
                        placeholderTextColor="#666"
                        onChangeText={(text) =>
                            this.setState({data: {...this.state.data, Text: text}})
                        }
                        value={this.state.data.Text
                        }
                    />
                  </View>

                  <View style={{position: 'relative'}}>

                    <TouchableWithoutFeedback onPress={() => this.setState({siteIdModalLookUpVisible: true})}>
                      <View>
                        <TextInput
                            placeholder="SITE*"
                            style={{ paddingRight: 35}}
                            floatingPlaceholder
                            floatOnFocus={true}
                            floatingPlaceholderColor="#666"
                            titleColor="#00aeee"
                            underlineColor="#00aeee"
                            placeholderTextColor="#666"
                            editable={false}
                            value={this.state.initialState.SiteDescription}
                        />

                        <View style={{position: 'absolute', top: 7, right: -30}}>
                          <Button style={{
                            backgroundColor: 'transparent',
                          }} onPress={() => this.setState({siteIdModalLookUpVisible: true})}>
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

                  <View style={{position: 'relative'}}>

                    <TouchableWithoutFeedback onPress={() => this.setState({locationIdModalLookUpVisible: true})}>
                      <View>
                        <TextInput
                            placeholder="LOCATION"
                            style={{paddingRight: 35}}
                            floatingPlaceholder
                            floatOnFocus={true}
                            floatingPlaceholderColor="#666"
                            titleColor="#00aeee"
                            underlineColor="#00aeee"
                            placeholderTextColor="#666"
                            editable={false}
                            value={this.state.initialState.LocationDescription}
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

                  <View style={{position: 'relative'}}>
                    <TouchableWithoutFeedback onPress={() => this.setState({assetIdModalLookUpVisible: true})}>
                      <View>
                        <TextInput
                            placeholder="ASSET"
                            style={{paddingRight: 35}}
                            floatingPlaceholder
                            floatOnFocus={true}
                            floatingPlaceholderColor="#666"
                            titleColor="#00aeee"
                            underlineColor="#00aeee"
                            placeholderTextColor="#666"
                            editable={false}
                            value={this.state.initialState.AssetDescription}
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

                  <View style={{position: 'relative'}}>
                    <TouchableWithoutFeedback onPress={() => this.setState({classificationModalLookUpVisible: true})}>
                      <View>
                        <TextInput
                            placeholder="CLASSIFICATION"
                            style={{ paddingRight: 35}}
                            floatingPlaceholder
                            floatOnFocus={true}
                            floatingPlaceholderColor="#666"
                            titleColor="#00aeee"
                            underlineColor="#00aeee"
                            placeholderTextColor="#666"
                            editable={false}
                            value={this.state.initialState.ClassStructureDescription}
                        />

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

                  <View style={{position: 'relative'}}>
                    <TouchableWithoutFeedback onPress={() => this.setState({workTypeModalLookUpVisible: true})}>
                      <View>
                        <TextInput
                            placeholder="WORK TYPE"
                            style={{ paddingRight: 35}}
                            floatingPlaceholder
                            floatOnFocus={true}
                            floatingPlaceholderColor="#666"
                            titleColor="#00aeee"
                            underlineColor="#00aeee"
                            placeholderTextColor="#666"
                            editable={false}
                            value={this.state.initialState.WorkTypeDescription}
                        />

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

                  <View style={{position: 'relative'}}>
                    <TouchableWithoutFeedback onPress={() => this.setState({priorityModalLookUpVisible: true})}>
                      <View>
                        <View>
                          <TextInput
                              placeholder="PRIORITY"
                              style={{paddingRight: 35}}
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

                  <View style={{position: 'relative'}}>
                    <TouchableWithoutFeedback onPress={() => this.setState({ownerModalLookUpVisible: true})}>
                      <View>
                        <TextInput
                            placeholder="OWNER"
                            style={{ paddingRight: 35}}
                            floatingPlaceholder
                            floatOnFocus={true}
                            floatingPlaceholderColor="#666"
                            titleColor="#00aeee"
                            underlineColor="#00aeee"
                            placeholderTextColor="#666"
                            editable={false}
                            value={this.state.initialState.OwnerDescription}
                        />

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

                  <View style={{position: 'relative'}}>
                    <TouchableWithoutFeedback onPress={() => this.setState({ownerGroupModalLookUpVisible: true})}>
                      <View>
                        <TextInput
                            placeholder="OWNER GROUP"
                            style={{paddingRight: 35}}
                            floatingPlaceholder
                            floatOnFocus={true}
                            floatingPlaceholderColor="#666"
                            titleColor="#00aeee"
                            underlineColor="#00aeee"
                            placeholderTextColor="#666"
                            editable={false}
                            value={this.state.initialState.OwnerGroupDescription}
                        />

                        <View style={{position: 'absolute', top: 7, right: -30}}>
                          <Button style={{
                            backgroundColor: 'transparent',
                          }} onPress={() => this.setState({ownerGroupModalLookUpVisible: true})}>
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
                      placeholder="REPORTED BY"
                      style={{paddingRight: 35}}
                      floatingPlaceholder
                      floatOnFocus={true}
                      floatingPlaceholderColor="#666"
                      titleColor="#00aeee"
                      underlineColor="#00aeee"
                      placeholderTextColor="#666"
                      editable={false}
                      value={this.state.initialState.ReportedByDescription}
                  />

                  <Button
                      style={NewWorkOrderScreenStyles.createButton}
                      backgroundColor="#0092d1"
                      onPress={() => {
                        this._onCreateButtonPressed(this.state, this.refs.toast, this.props.navigation)
                      }}>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18, width: '100%', textAlign: 'center'}}>
                      SAVE
                    </Text>
                  </Button>

                </Card.Section>
              </Card>
            </View>


          </ScrollView>
          <Toast ref="toast"/>
        </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    createdWorkOrderData: WorkOrderSelectors.getCreatedWorkOrder(state),
    userData: UserReducer.getUserData(state),
    isLoading: WorkOrderSelectors.isLoading(state),

    //lookups
    locationIdLookup: LocationIdLookupReducer.doLocationIdLookup(state),
    assetIdLookup: AssetIdLookupReducer.doAssetIdLookup(state),
    siteIdLookup: SiteIdLookupReducer.doSiteIdLookup(state),
    classificationLookup: ClassificationLookupReducer.doClassificationLookup(state),
    workTypeLookup: WorkTypeLookupReducer.doWorkTypeLookup(state),
    ownerLookup: OwnerLookupReducer.doOwnerLookup(state),
    ownerGroupLookup: OwnerGroupLookupReducer.doOwnerGroupLookup(state),
    priorityLookup: PriorityLookupReducer.doPriorityLookup(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onBackButtonClick: () => {
      dispatch(StackActions.pop({n: 1}))
      return true;
    },
    onCreateButtonPressed: (data, toast, navigator) => {
      dispatch(workOrderCreate(data, toast, navigator));
    },
    onSiteIdLookupChange: (text, orgId) => {
      dispatch(siteIdLookup(text, orgId))
    },
    onLocationIdLookupChange: (text, siteId) => {
      dispatch(locationIdLookup(text, siteId))
    },
    onAssetIdLookupChange: (text, siteId, locationId) => {
      dispatch(assetIdLookup(text, siteId, locationId))
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
    onPriorityLookupChange: (text) => {
      dispatch(priorityLookup(text))
    },
    onWorkOrderCreated: (id) => {
      dispatch({type: NavigationActions.ACTION_OPEN_WORK_ORDER_DETAILS.action, payload: {id: id}})
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewWorkOrderScreen);


