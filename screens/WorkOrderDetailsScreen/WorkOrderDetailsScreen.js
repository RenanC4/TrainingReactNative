import React from 'react';
import {
  Clipboard,
  ImageBackground,
  ScrollView,
  BackHandler,
  TouchableWithoutFeedback, StyleSheet,
} from 'react-native';
import {View, Text, TabBar, Card, LoaderScreen, Button} from 'react-native-ui-lib';
import {Ionicons} from '@expo/vector-icons';
import ProfileDropdown from '../../components/ProfileDropdown';
import _ from 'lodash';
import WorkOrderDetailsScreenStyles from './WorkOrderDetailsScreenStyles'
import TabBarStyles from "../../styles/TabBarStyles";
import Content from "../../styles/Content";
import moment from "moment";
import {connect} from "react-redux";
import {getWorkOrderDetail, emptyWorkOrder} from '../../actions/workOrder/workOrder';
import * as WorkOrderSelectors from '../../reducers/workOrder/workOrder';
import * as laborReducer from '../../reducers/workOrder/labor';
import {laborListRequest} from '../../actions/workOrder/labor';
import * as materialReducer from '../../reducers/workOrder/material';
import {materialRequest} from '../../actions/workOrder/material';

import * as attachmentsReducer from '../../reducers/workOrder/attachments';
import {attachmentsRequest, attachmentsDownloadRequest} from '../../actions/workOrder/attachments';

import Toast from 'react-native-easy-toast';

import WorkOrderDetailsFab from '../../components/WorkOrderFab/WorkOrderDetailsFab';
import * as UserReducer from "../../reducers/user/user";

class WorkOrderDetailsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      activeTab: 1,
      showToast: false,
      attachmentsModalVisible: false,
      attachmentsModalData: null,
    };
  }

  static navigationOptions = {
    header: null,
  };

  _copyToClipboard = async (link) => {
    await Clipboard.setString(link);
    this.refs.toast.show('Link copied', 3000)
  };

  toggleActiveTab = (tab) => {
    this.setState({activeTab: tab});
  }

  formatDate = (date) => (
      moment(date, 'YYYY-MM-DDTHH:mm:SS').format('DD/MM/YYYY HH:mmA')
  )

  _getWorkOrderDetails = () => {
    const {params} = this.props.navigation.state;
    this.props.onGetWorkerDetails(params.id);
  }

  _getLabors = () => {
    const {params} = this.props.navigation.state;
    this.props.onGetLabor(this.props.userData.data.Token, params.woId);
  }

  _getMaterial = () => {
    const {params} = this.props.navigation.state;
    this.props.onGetMaterial(this.props.userData.data.Token, params.woId);
  }

  _getAttachments = () => {
    const {params} = this.props.navigation.state;
    this.props.onGetAttachments(this.props.userData.data.Token, params.id);
  }

  _downloadAttachments(id) {
    this.props.onDownloadAttachments(this.props.userData.data.Token, id);
  }


  componentDidMount() {

    this.props.navigation.addListener('willFocus', () => {
          this._getWorkOrderDetails();
        }
    )

    this._getLabors();
    this._getMaterial();
    this._getAttachments();
    BackHandler.addEventListener('hardwareBackPress', () => this.props.onBackButtonClick(this.props));

  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.props.onBackButtonClick(this.props));
  }

  _showToast = (messageToast) => {
    this.refs.toast.show(messageToast, 3000)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getSelectedWorkOrder) {
      this.setState({loading: false})
    }
    this.props.getToastMessages && this.refs.toast && this.props.getToastMessages != 'Material Created' && this.props.getToastMessages != 'Labor Created' ? this._showToast(this.props.getToastMessages) : null;

  }

  render() {
    return (

        <View style={{flex: 1, flexGrow: 1}}>
          {this.state.loading == true &&
          <View style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 10000,
            backgroundColor: '#fff',
          }}>
            <LoaderScreen
                style={{margin: 20}}
                color="#00aeee"
                overlay={false}
            />
          </View>
          }
          <ScrollView style={WorkOrderDetailsScreenStyles.container}>

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

              <View flex style={{
                paddingTop: 15,
                paddingBottom: 30,
                paddingRight: 15,
                paddingLeft: 15,
                position: 'relative',
                zIndex: 1
              }}>
                <View flex style={WorkOrderDetailsScreenStyles.detailsWrapper}>
                  {this.props.getSelectedWorkOrder != null &&
                  <View style={WorkOrderDetailsScreenStyles.detailsStatus}>
                    <Text style={[WorkOrderDetailsScreenStyles.detailsStatusInner,
                      this.props.getSelectedWorkOrder.StatusId == 'CLOSE' ? styles.detailsStatusInnerCLOSE :
                          this.props.getSelectedWorkOrder.StatusId == 'CAN' ? styles.detailsStatusInnerCAN :
                              this.props.getSelectedWorkOrder.StatusId == 'APPR' ? styles.detailsStatusInnerAPPR :
                                  this.props.getSelectedWorkOrder.StatusId == 'WPCOND' ? styles.detailsStatusInnerWPCOND :
                                      this.props.getSelectedWorkOrder.StatusId == 'COMP' ? styles.detailsStatusInnerCOMP :
                                          this.props.getSelectedWorkOrder.StatusId == 'HISTEDIT' ? styles.detailsStatusInnerHISTEDIT :
                                              this.props.getSelectedWorkOrder.StatusId == 'WORKING' ? styles.detailsStatusInnerWORKING :
                                                  this.props.getSelectedWorkOrder.StatusId == 'WAPPR' ? styles.detailsStatusInnerWAPPR :
                                                      this.props.getSelectedWorkOrder.StatusId == 'WMATL' ? styles.detailsStatusInnerWMATL :
                                                          this.props.getSelectedWorkOrder.StatusId == 'WSCH' ? styles.detailsStatusInnerWSCH :
                                                              this.props.getSelectedWorkOrder.StatusId == 'INPRG' ? styles.detailsStatusInnerINPRG : '#fff']}>
                      <Ionicons
                          name={this.props.getSelectedWorkOrder.StatusId == 'CAN' ? "md-close" : "md-checkmark"}
                          size={40}
                          style={WorkOrderDetailsScreenStyles.detailsStatusIcon}
                          color={this.props.getSelectedWorkOrder.StatusId == 'CAN' ? '#f65752' :
                              this.props.getSelectedWorkOrder.StatusId == 'CLOSE' ? '#39b54a' :
                                  this.props.getSelectedWorkOrder.StatusId == 'APPR' ? '#4488f2' :
                                      this.props.getSelectedWorkOrder.StatusId == 'WPCOND' ? '#4488f2' :
                                          this.props.getSelectedWorkOrder.StatusId == 'COMP' ? '#39b54a' :
                                              this.props.getSelectedWorkOrder.StatusId == 'HISTEDIT' ? '#39b54a' :
                                                  this.props.getSelectedWorkOrder.StatusId == 'WORKING' ? '#f2d935' :
                                                      this.props.getSelectedWorkOrder.StatusId == 'WAPPR' ? '#e59323' :
                                                          this.props.getSelectedWorkOrder.StatusId == 'WMATL' ? '#f2d935' :
                                                              this.props.getSelectedWorkOrder.StatusId == 'WSCH' ? '#e59323' :
                                                                  this.props.getSelectedWorkOrder.StatusId == 'INPRG' ? '#39b54a' : '#fff'}
                      />
                    </Text>
                    <Text style={[styles.detailsStatusIndicator,
                      this.props.getSelectedWorkOrder.StatusId == 'CLOSE' ? styles.detailsStatusIndicatorCLOSE :
                          this.props.getSelectedWorkOrder.StatusId == 'CAN' ? styles.detailsStatusIndicatorCAN :
                              this.props.getSelectedWorkOrder.StatusId == 'APPR' ? styles.detailsStatusIndicatorAPPR :
                                  this.props.getSelectedWorkOrder.StatusId == 'WPCOND' ? styles.detailsStatusIndicatorWPCOND :
                                      this.props.getSelectedWorkOrder.StatusId == 'COMP' ? styles.detailsStatusIndicatorCOMP :
                                          this.props.getSelectedWorkOrder.StatusId == 'HISTEDIT' ? styles.detailsStatusIndicatorHISTEDIT :
                                              this.props.getSelectedWorkOrder.StatusId == 'WORKING' ? styles.detailsStatusIndicatorWORKING :
                                                  this.props.getSelectedWorkOrder.StatusId == 'WAPPR' ? styles.detailsStatusIndicatorWAPPR :
                                                      this.props.getSelectedWorkOrder.StatusId == 'WMATL' ? styles.detailsStatusIndicatorWMATL :
                                                          this.props.getSelectedWorkOrder.StatusId == 'WSCH' ? styles.detailsStatusIndicatorWSCH :
                                                              this.props.getSelectedWorkOrder.StatusId == 'INPRG' ? styles.detailsStatusIndicatorINPRG : '#fff']}

                    >
                      {this.props.getSelectedWorkOrder.StatusId}
                    </Text>
                  </View>}
                  <View style={WorkOrderDetailsScreenStyles.detailsInnerWrapper}>

                    <Text style={WorkOrderDetailsScreenStyles.detailsInnerTitle}
                          uppercase={true}>
                      {this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.Description}
                    </Text>

                    <Text style={WorkOrderDetailsScreenStyles.detailsInnerMeta}>
                      {this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.ReportedAt && this.formatDate(this.props.getSelectedWorkOrder.ReportedAt) + ' '}
                    </Text>
                    <Text>by <Text
                        style={WorkOrderDetailsScreenStyles.detailsInnerMetaUser}>{this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.ReportedBy && this.props.getSelectedWorkOrder.ReportedBy.PersonId}</Text></Text>

                    <Text style={{width: '100%'}}>
                      {this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.Text}
                    </Text>

                    <Text style={WorkOrderDetailsScreenStyles.detailsInnerRef}>
                      #{this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.WorkOrderId}
                    </Text>
                  </View>
                </View>
                {this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.Priority != null &&
                <View style={[styles.detailsRibbon,
                  this.props.getSelectedWorkOrder.Priority == 1 ? styles.detailsRibbonHIGH :
                      this.props.getSelectedWorkOrder.Priority == 2 ? styles.detailsRibbonMEDIUM :
                          this.props.getSelectedWorkOrder.Priority == 3 ? styles.detailsRibbonLOW : '#fff'
                ]}>
                  <Text style={WorkOrderDetailsScreenStyles.detailsRibbonText}>
                    {this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.PriorityDescription && this.props.getSelectedWorkOrder.PriorityDescription}
                  </Text>
                </View>}
                {this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.Priority != null &&
                <View style={[styles.detailsRibbonTriangle,
                  this.props.getSelectedWorkOrder.Priority == 1 ? styles.detailsRibbonTriangleHIGH :
                      this.props.getSelectedWorkOrder.Priority == 2 ? styles.detailsRibbonTriangleMEDIUM :
                          this.props.getSelectedWorkOrder.Priority == 3 ? styles.detailsRibbonTriangleLOW : '#fff'
                ]}/>}
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
                WORK ORDER DETAILS
              </Text>

              <Card elevation={3}>
                <Card.Section body>

                  {this.state.getSelectedWorkOrder &&
                  <LoaderScreen
                      color="#01a1db"
                      overlay={true}
                      backgroundColor="#fff"
                  />
                  }

                  <Text style={Content.heading}>
                    {this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.Description}
                  </Text>

                  <View style={Content.separator}/>

                  <View>
                    <Text style={Content.innerHeadline}>CREATED BY</Text>
                    <Text
                        style={Content.innerValue}>{this.props.getSelectedWorkOrder && this.props.getSelectedWorkOrder.ReportedBy && this.props.getSelectedWorkOrder.ReportedBy.Label ? this.props.getSelectedWorkOrder.ReportedBy.Label :
                        <Text style={{fontSize: 12, color: '#7e7b81', fontStyle: 'italic', marginTop: 2}}> Not
                          Defined </Text>}</Text>
                  </View>

                  <View style={Content.separator}/>

                  <View>
                    <Text style={Content.innerHeadline}>DESCRIPTION</Text>
                    <Text style={Content.innerValue}>
                      {this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.Text ? this.props.getSelectedWorkOrder.Text :
                          <Text style={{fontSize: 12, color: '#7e7b81', fontStyle: 'italic', marginTop: 2}}> Not
                            Defined </Text>}
                    </Text>
                  </View>


                  {this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.ReportedAt &&
                  <View>
                    <View style={Content.separator}/>
                    <Text style={Content.innerHeadline}>REPORTED DATE</Text>
                    <Text style={Content.innerValue}>
                      {this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.ReportedAt && this.formatDate(this.props.getSelectedWorkOrder.ReportedAt)}
                      {this.props.getSelectedWorkOrder != null && !this.props.getSelectedWorkOrder.ReportedAt &&
                      <Text style={{fontSize: 12, color: '#7e7b81', fontStyle: 'italic', marginTop: 2}}> Not
                        Defined </Text>}
                    </Text>
                  </View>
                  }

                  <View style={Content.separator}/>

                  <View>
                    <Text style={Content.innerHeadline}>SCHEDULED START DATE</Text>
                    <Text style={Content.innerValue}>
                      {this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.DtTargetStart && this.formatDate(this.props.getSelectedWorkOrder.DtTargetStart)}

                      {this.props.getSelectedWorkOrder != null && !this.props.getSelectedWorkOrder.DtTargetStart &&
                      <Text style={{fontSize: 12, color: '#7e7b81', fontStyle: 'italic', marginTop: 2}}> Not
                        Defined </Text>}
                    </Text>
                  </View>

                  <View style={Content.separator}/>

                  <View>
                    <Text style={Content.innerHeadline}>ORDER ID</Text>
                    <Text
                        style={Content.innerValue}>{this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.WorkOrderId}</Text>
                  </View>

                  <View style={Content.separator}/>

                  <View>
                    <Text style={Content.innerHeadline}>STATUS</Text>
                    <Text
                        style={Content.innerValue}>{this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.Status != null && this.props.getSelectedWorkOrder.Status}</Text>
                  </View>

                  <View style={Content.separator}/>
                  <View>
                    <Text style={Content.innerHeadline}>SITE</Text>
                    <Text
                        style={Content.innerValue}>{this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.Site ? this.props.getSelectedWorkOrder.Site.Label :
                        <Text style={{fontSize: 12, color: '#7e7b81', fontStyle: 'italic', marginTop: 2}}> Not
                          Defined </Text>}</Text>
                  </View>

                  <View style={Content.separator}/>

                  <View>
                    <Text style={Content.innerHeadline}>LOCATION</Text>
                    <Text
                        style={Content.innerValue}>{this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.Location ? this.props.getSelectedWorkOrder.Location.Label :
                        <Text style={{fontSize: 12, color: '#7e7b81', fontStyle: 'italic', marginTop: 2}}> Not
                          Defined </Text>}</Text>
                  </View>

                  <View style={Content.separator}/>

                  <View>
                    <Text style={Content.innerHeadline}>ASSET</Text>
                    <Text
                        style={Content.innerValue}>{this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.Asset ? this.props.getSelectedWorkOrder.Asset.Label :
                        <Text style={{fontSize: 12, color: '#7e7b81', fontStyle: 'italic', marginTop: 2}}> Not
                          Defined </Text>}</Text>
                  </View>


                  <View style={Content.separator}/>

                  <View>
                    <Text style={Content.innerHeadline}>PRIORITY</Text>
                    <Text style={Content.innerValue}>
                      {this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.Priority ? this.props.getSelectedWorkOrder.PriorityDescription :
                          <Text style={{fontSize: 12, color: '#7e7b81', fontStyle: 'italic', marginTop: 2}}> Not
                            Defined </Text>}
                    </Text>
                  </View>

                  <View style={Content.separator}/>

                  <View>
                    <Text style={Content.innerHeadline}>CLASSIFICATION</Text>
                    <Text style={Content.innerValue}>
                      {this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.ClassStructure ? this.props.getSelectedWorkOrder.ClassStructure.Label :
                          <Text style={{fontSize: 12, color: '#7e7b81', fontStyle: 'italic', marginTop: 2}}> Not
                            Defined </Text>}
                    </Text>
                  </View>

                  <View style={Content.separator}/>

                  <View>
                    <Text style={Content.innerHeadline}>WORK TYPE</Text>
                    <Text style={Content.innerValue}>
                      {this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.WorkType ? this.props.getSelectedWorkOrder.WorkType.Label :
                          <Text style={{fontSize: 12, color: '#7e7b81', fontStyle: 'italic', marginTop: 2}}> Not
                            Defined </Text>}
                    </Text>
                  </View>

                  <View style={Content.separator}/>

                  <View>
                    <Text style={Content.innerHeadline}>OWNER</Text>
                    <Text style={Content.innerValue}>
                      {this.props.getSelectedWorkOrder && this.props.getSelectedWorkOrder.Owner ? this.props.getSelectedWorkOrder.Owner.Label :
                          <Text style={{fontSize: 12, color: '#7e7b81', fontStyle: 'italic', marginTop: 2}}> Not
                            Defined </Text>}
                    </Text>
                  </View>

                  <View style={Content.separator}/>

                  <View>
                    <Text style={Content.innerHeadline}>OWNER GROUP</Text>
                    <Text style={Content.innerValue}>
                      {this.props.getSelectedWorkOrder != null && this.props.getSelectedWorkOrder.OwnerGroup ? this.props.getSelectedWorkOrder.OwnerGroup.Label :
                          <Text style={{fontSize: 12, color: '#7e7b81', fontStyle: 'italic', marginTop: 2}}> Not
                            Defined </Text>}
                    </Text>
                  </View>


                  {false &&
                  <View> {/*TODO: Add this field*/}
                    <Text style={Content.innerHeadline}>FAILURE CLASS</Text>
                    <Text style={Content.innerValue}>11</Text>
                  </View>
                  }
                </Card.Section>
              </Card>

            </View>
            }

            {this.state.activeTab === 2 &&

            <View style={Content.default}>
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
              {this.props.labor.Count <= 0 &&
              <View>
                <Text style={{textAlign: 'center', marginTop: 10, fontSize: 18, color: '#000'}}>
                  No Labors to show
                </Text>
              </View>

              }
            </View>

            }

            {this.state.activeTab === 3 && this.props.attachments &&
            <View style={Content.default}>
              <Text style={Content.viewHeading}>
                ATTACHMENTS
              </Text>
              {_.map(this.props.attachments.Records, (attachments, index) =>
                  <Card elevation={3} style={{marginBottom: 40}} key={index}>
                    <Card.Section body>

                      <Text style={Content.heading}>
                        {attachments.Document}
                      </Text>

                      <View style={Content.separator}/>

                      <View>
                        <Text style={Content.innerHeadline}>Create Date</Text>
                        <Text style={Content.innerValue}>{moment(attachments.CreateDate).format('DD/MM/YYYY')}</Text>
                      </View>

                      <View style={Content.separator}/>

                      {!this.props.attachmentToDownload && <View>
                        <TouchableWithoutFeedback onPress={() => this._downloadAttachments(attachments.Id)}>
                          <View>
                            <Text>
                              <Text style={{position: 'relative', fontSize: 16, fontStyle: 'italic'}}> Click to see the
                                link to this attachment</Text>
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>}
                      {this.props.attachmentToDownload &&
                      <View style={{paddingTop: 5, paddingBottom: 5, flexDirection: 'row'}}>
                        <TouchableWithoutFeedback onPress={() => this._copyToClipboard(this.props.attachmentToDownload)}>
                          <View style={{paddingTop: 5, paddingLeft: 15}}><Text><Ionicons style={{
                            fontSize: 25,
                            color: '#000'
                          }} name="md-copy"/></Text></View></TouchableWithoutFeedback>
                        <Text style={{
                          textAlign: 'left',
                          paddingLeft: 10,
                          paddingRight: 10
                        }}>{this.props.attachmentToDownload}</Text>
                      </View>}
                      {this.props.attachmentToDownload &&
                      <View style={{paddingTop: 10}}>


                        <Text style={{paddingTop: 5, textAlign: 'left'}}>To Download this attachment, please copy the
                          link
                          and paste in
                          your browser</Text>

                      </View>}


                    </Card.Section>
                  </Card>)

              }
              {this.props.attachments.Count <= 0 &&
              <View>
                <Text style={{textAlign: 'center', marginTop: 10, fontSize: 18, color: '#000'}}>
                  No Attachments to show
                </Text>
              </View>

              }

            </View>
            }

            {this.state.activeTab === 5 &&
            <View style={Content.default}>
              <Text style={Content.viewHeading}>
                MATERIALS
              </Text>

              {_.map(this.props.material.Records, (material, index) =>

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
                        <Text style={Content.innerValue}>{material.StoreId ? material.StoreId :
                            <Text style={{fontSize: 12, color: '#7e7b81', fontStyle: 'italic', marginTop: 2}}> Not
                              Defined </Text>}</Text>
                      </View>

                      <View style={Content.separator}/>

                      <View>
                        <Text style={Content.innerHeadline}> QUANTITY </Text>
                        <Text style={Content.innerValue}>{material.Quantity * -1}</Text>
                      </View>

                    </Card.Section>
                  </Card>
              )}

              {this.props.material.Count <= 0 &&
              <View>
                <Text style={{textAlign: 'center', marginTop: 10, fontSize: 18, color: '#000'}}>
                  No Material to show
                </Text>
              </View>

              }

            </View>
            }


          </ScrollView>
          <WorkOrderDetailsFab id={this.props.navigation.state.params.id}/>
          <Toast ref="toast"/>
        </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: UserReducer.getUserData(state),
    getToastMessages: WorkOrderSelectors.tostMessage(state),
    getSelectedWorkOrder: WorkOrderSelectors.getSelectedWorkOrder(state),
    isLoading: WorkOrderSelectors.isLoading(state),
    materialLoading: materialReducer.isLoading(state),
    labor: laborReducer.getLabor(state),
    material: materialReducer.getMaterial(state),
    attachments: attachmentsReducer.getAttachment(state),
    attachmentToDownload: attachmentsReducer.getAttachmentToDownload(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetLabor: (token, id) => {
      dispatch(laborListRequest(token, id))
    },
    onGetMaterial: (token, id) => {
      dispatch(materialRequest(token, id))
    },
    onGetAttachments: (token, id) => {
      dispatch(attachmentsRequest(token, id))
    },
    onDownloadAttachments: (token, id) => {
      dispatch(attachmentsDownloadRequest(token, id))
    },
    onBackButtonClick: (props) => {
      if (props.navigation.state.params.previousScreen == 'wos') {
        props.navigation.navigate('WorkOrders')

      } else {
        props.navigation.navigate('Resume')
      }

      dispatch(emptyWorkOrder())

      return true;
    },
    onGetWorkerDetails: (id) => {
      setTimeout(() => dispatch(getWorkOrderDetail(id)), 100);
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(WorkOrderDetailsScreen);


const styles = StyleSheet.create({
      detailsStatusInner: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRadius: 50,
        borderColor: '#fff',
        alignSelf: 'flex-start',
        textAlign: 'center',
        margin: 10,
        padding: 13
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
      detailsStatusIndicator: {
        fontFamily: 'sf-semibold',
        backgroundColor: '#56af30',
        color: '#fff',
        textAlign: 'center',
        paddingTop: 3,
        paddingRight: 10,
        paddingBottom: 3,
        paddingLeft: 10,
        borderRadius: 15,
        marginTop: 15,
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

      detailsRibbon: {
        position: 'absolute',
        top: 25,
        right: 5,
        backgroundColor: '#e52321',
        paddingTop: 6,
        paddingRight: 13,
        paddingBottom: 6,
        paddingLeft: 13,
      },
      detailsRibbonHIGH: {
        backgroundColor: '#f6faff'
      },
      detailsRibbonMEDIUM: {
        backgroundColor: '#ffff99'
      },
      detailsRibbonLOW: {
        backgroundColor: '#ccffcc'
      },

      detailsRibbonTriangle: {
        position: 'absolute',
        top: 53,
        right: 6,
        width: 0,
        height: 0,
        borderTopWidth: 9,
        borderRightWidth: 9,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderTopColor: '#FFF55A',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
      },
      detailsRibbonTriangleHIGH: {borderTopColor: '#F3F6FF'},
      detailsRibbonTriangleMEDIUM: {borderTopColor: '#FFF55A'},
      detailsRibbonTriangleLOW: {borderTopColor: '#97FF95',}
    }
)
