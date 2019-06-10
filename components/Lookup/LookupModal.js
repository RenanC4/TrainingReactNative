import React, {Component} from 'react';
import {View, Text, Button, TextInput, LoaderScreen} from 'react-native-ui-lib';
import {connect} from "react-redux";
import * as UserReducer from '../../reducers/user/user';

import {
  ScrollView,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
} from 'react-native';

import Modal from "react-native-modal";
import WorkOrderDetailsScreenStyles from "../../screens/WorkOrderDetailsScreen/WorkOrderDetailsScreenStyles";
import {Ionicons} from '@expo/vector-icons';
import LookupModalStyles from "./LookupModalStyles";

class LookupModal extends React.Component {
  state = {
    modalVisible: true,
    lookupData: [],
  };

  _handleSerchInputChange = (value) => {
    this.props.lookupSearchFunction(value);
    this.setState({search: value});
  }

  _handleValueSelected = (value) => {
    this.props.lookupApplyFunction(value);
    this.setState({modalVisible: false});
  }

  _handleBackButton = () => {
    this.props.lookupBackFunction();
    this.setState({modalVisible: false});
  }

  componentDidMount() {
    this._handleSerchInputChange('');
    BackHandler.addEventListener('hardwareBackPress', () => this._handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackButton);
  }

  componentWillReceiveProps(nextProps, nextState) {

    if (nextProps.lookupSearchedData.length > 0) {
      this.setState({lookupData: nextProps.lookupSearchedData});
    } else {
      this.setState({lookupData: []});
    }
  }

  render() {
    return (
      <Modal isVisible={this.state.modalVisible}
             style={{
               backgroundColor: '#fff',
               marginTop: 0,
               marginRight: 0,
               marginBottom: 0,
               marginLeft: 0,
               flexGrow: 1,
               alignItems: 'flex-start'
             }}>


        {this.props.lookupSearchedData === true &&
        <View style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 10000,
          backgroundColor: 'rgba(255,255,255,0.8)'
        }}>
          <LoaderScreen
            style={{margin: 20}}
            color="#00aeee"
            overlay={false}
          />
        </View>
        }

        <View style={{flex: 0, flexDirection: 'row', flexGrow: 0, height: 80, backgroundColor: '#0092d1'}}>
          <View style={{width: 50,}}>
            <Button style={{
              backgroundColor: 'transparent',
              width: 20,
              padding: 0,
              position: 'relative',
              left: -15,
              top: -15,
            }} onPress={this._handleBackButton}>
              <Ionicons
                name="md-arrow-back"
                size={40}
                style={WorkOrderDetailsScreenStyles.goBackIcon}
                color="#fff"
              />
            </Button>
          </View>
          <View style={{flexGrow: 1, paddingRight: 10, paddingLeft: 10, paddingTop: 5}}>
            <TextInput
              style={{
                color: '#fff',
              }}
              floatingPlaceholder
              floatOnFocus={true}
              placeholder="Search"
              floatingPlaceholderColor="#fff"
              titleColor="#fff"
              underlineColor="#fff"
              placeholderTextColor="#fff"
              onChangeText={(text) => this._handleSerchInputChange(text)}
              value={this.state.search}
            />
          </View>
        </View>

        <ScrollView style={{flex: 1, flexGrow: 1, width: '100%'}} keyboardShouldPersistTaps="always">
          <View style={{flex: 1, flexGrow: 1, width: '100%'}}>

            {
              this.props.lookupSearchedData.length == 0 &&
              <View>
                <View style={{paddingTop: 45}}>
                  <Text style={{textAlign: 'center'}}>
                    <Ionicons name="md-search" size={55} color="#999"/>
                  </Text>
                </View>

                <Text style={{
                  paddingTop: 10,
                  paddingRight: 15,
                  paddingBottom: 15,
                  paddingLeft: 15,
                  textAlign: 'center'
                }}>
                  Nothing found for the selected search.
                </Text>
              </View>
            }

            {
              this.state.lookupData.length > 0 &&
              <View style={{width: '100%'}}>
                {this.state.lookupData.map((o, k) => (
                  <TouchableOpacity
                    style={LookupModalStyles.lookUpDropdownItem}
                    onPress={() => this._handleValueSelected(o)} key={k}>
                    <View>
                      <Text style={LookupModalStyles.lookUpDropdownItemText}>{o.Description}</Text>
                      {(k + 1) < this.state.lookupData.length &&
                      <View style={LookupModalStyles.lookUpDropdownItemSeparator}/>
                      }
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            }
          </View>
        </ScrollView>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    userData: UserReducer.getUserData(state),
  };
}


export default connect(
  mapStateToProps,
  null)
(LookupModal);

