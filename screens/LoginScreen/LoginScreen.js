import React from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  AsyncStorage

} from 'react-native';

import {View, Text, TextInput, Button, LoaderScreen} from 'react-native-ui-lib';
import {Ionicons} from '@expo/vector-icons';
import LoginScreenStyle from './LoginScreenStyle';
import {connect} from 'react-redux';
import {userLogin} from "../../actions/user/user";
import * as userReducer from '../../reducers/user/user';
import * as resetPasswordReducer from '../../reducers/user/resetPassword';
import {resetPasswordRequest} from "../../actions/user/resetPassword";
import Toast from 'react-native-easy-toast';
import Dialog from "react-native-dialog";

import {
  Analytics,
  Hits as GAHits,
} from 'react-native-google-analytics';

class LoginScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    let ga = new Analytics('UA-126574443-1', "teste", 1, "teste");
    let screenView = new GAHits.ScreenView(
        'SW2',
        'Welcome Screen'
    );
    ga.send(screenView);

    this.state = {
      passwordVisible: false,
      username: 'renanlindao',
      password: 'S4HUdPFUok',
      showToast: false,
      loading: false,
      isLogged: false,
      canLog: false,
      showDialog: false,
      emailToReset: '',
    }
  }

  showDialog = () => {
    this.setState({showDialog: true});
  };

  handleCancel = () => {
    this.setState({showDialog: false});
  };

  handleSendEmail = (email) => {
    this.props.onPasswordResetClick(email);
    this.setState({showToast: true});
  };

  _togglePasswordVisibility = () => {
    if (this.state.passwordVisible === false) {
      this.setState({passwordVisible: true});
    } else {
      this.setState({passwordVisible: false});
    }
  }

  _storeData = async (username, password) => {
    try {
      console.log('setitem', username, password)
      await AsyncStorage.setItem('@MySuperStore:key', username);
      await AsyncStorage.setItem('@MySuperStore:password', password);

    } catch (error) {
      // Error saving data
    }
  }

  _isLoggedToggle = () => {
    if (this.props.userData.isLogged == true) {
      this.setState({isLogged: true});
    }
  }

  _togglePasswordVisibility = () => {
    if (this.state.passwordVisible === false) {
      this.setState({passwordVisible: true});
    } else {
      this.setState({passwordVisible: false});
    }
  }

  _isLoggedToggle = () => {
    if (this.props.userData.isLogged == true) {
      this.setState({isLogged: true});
    }
  }

  _toggleLoadingLogin = (username, password) => {
    this.setState({loading: true})
    this.props.onLoginButtonClick(username, password)

    setTimeout(() => {
      this.setState({loading: false})
    }, 1500);
  }

  componentDidUpdate() {

    if (this.props.resetPassword.status.id == 1 && this.state.showToast == true) {
      this.setState({showDialog: false})
      this.refs.toast.show(this.props.resetPassword.status.message , 3000);
      this.setState({showToast: false});
    }else if(this.props.resetPassword.status.id == 2 && this.state.showToast == true){
      this.refs.toast.show(this.props.resetPassword.status.message , 3000);
      this.setState({showToast: false});
    }


    if (this.props.userData.isLogged == true && this.state.canLog == true) {
      this.props.navigation.navigate('Resume');
      this.setState({canLog: false})
      this._isLoggedToggle();
    } else if (this.props.userData.error && this.state.canLog == true) {
      if(this.props.userData.error.id == 2){
        this.refs.toast.show(this.props.userData.error.message, 3000);
        this.setState({canLog: false});
      }
    }
  }

  componentDidMount() {
    this.setState({canLog: true});
  }

  render() {

    return (
        <View style={{flex: 1, flexGrow: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="always">

            <View>
              <Dialog.Container visible={this.state.showDialog}>
                <Dialog.Title>Reset password</Dialog.Title>
                <Dialog.Description>
                  Insert your ID and click send, we will send an email to you with a temporary password.
                </Dialog.Description>
                <Dialog.Input
                    onChangeText={(text) => this.setState({emailToReset: text})}
                    value={this.state.emailToReset}
                    placeholder="Your ID here"/>
                <Dialog.Button label="Cancel" onPress={this.handleCancel}/>
                <Dialog.Button label="Send" onPress={() => this.handleSendEmail(this.state.emailToReset)}/>
              </Dialog.Container>
            </View>


            <ImageBackground
                source={require('../../assets/img/bg/bg.png')}
                resizeMode="cover"
                style={{
                  flexGrow: 1,
                  width: '100%',
                  height: '100%',
                }}>

              <View style={LoginScreenStyle.layoutContainer}>
                <KeyboardAvoidingView behavior="position" enabled>

                  <View style={LoginScreenStyle.logoContainer}>
                    <Image source={require('../../assets/img/sw-logo-white.png')}
                           style={LoginScreenStyle.logo}
                           resizeMode="contain"
                    />
                  </View>

                  <Text style={LoginScreenStyle.welcome} color="#ffffff">
                    Welcome back
                  </Text>

                  <TextInput
                      style={{color: '#ffffff'}}
                      floatingPlaceholder
                      floatOnFocus={true}
                      placeholder="Username"
                      floatingPlaceholderColor="#ffffff"
                      titleColor="#ffffff"
                      underlineColor="#ffffff"
                      placeholderTextColor="#ffffff"
                      ref={(el) => {
                        this.username = el;
                      }}
                      onChangeText={(username) => this.setState({username})}
                      value={this.state.username}
                  />

                  <View style={{position: 'relative'}}>
                    <TextInput
                        style={{color: '#ffffff'}}
                        secureTextEntry={!this.state.passwordVisible}
                        floatingPlaceholder
                        floatOnFocus={true}
                        placeholder="Your safe password"
                        floatingPlaceholderColor="#ffffff"
                        titleColor="#ffffff"
                        underlineColor="#ffffff"
                        placeholderTextColor="#ffffff"
                        containerStyle={{marginBottom: 25}}
                        ref={(el) => {
                          this.password = el;
                        }}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />

                    <Button style={{
                      position: 'absolute',
                      right: -5,
                      top: 10,
                      zIndex: 1000,
                      backgroundColor: 'transparent',
                      width: 25,
                      paddingRight: 0
                    }}
                            onPress={this._togglePasswordVisibility}>
                      <Ionicons name={this.state.passwordVisible ? 'md-eye-off' : 'md-eye'} size={25} color="white"/>
                    </Button>
                  </View>

                  {!this.props.isOnRequest &&

                  <Button
                      style={LoginScreenStyle.signInButton}
                      backgroundColor="#ffffff"
                      onPress={() => {
                        this._storeData(this.state.username,  this.state.password);
                        this.setState({canLog: true});
                        this.props.onLoginButtonClick(this.state.username, this.state.password)
                      }}>
                    <Text style={{
                      fontWeight: 'bold',
                      color: '#0092d1',
                      fontSize: 25,
                      width: '100%',
                      textAlign: 'center'
                    }}>
                      SIGN IN
                    </Text>
                  </Button>
                  }

                  {this.props.isOnRequest &&
                  <Button
                      style={LoginScreenStyle.signInButton}
                      disabled={true}
                      backgroundColor="#ffffff"
                      onPress={() => {
                        this._toggleLoadingLogin(this.state.username, this.state.password)
                      }}>

                    <Text style={{fontSize: 25, width: '100%'}}>
                      &nbsp;
                    </Text>

                    <LoaderScreen
                        style={{margin: 20}}
                        color="#0092d1"
                        overlay={true}

                    />
                  </Button>
                  }


                </KeyboardAvoidingView>

                <Text style={LoginScreenStyle.passwordRecoveryAccountLink}
                      center={true}
                      color="#ffffff"
                      onPress={this.showDialog}>
                  Forgot your
                  password? <Text style={LoginScreenStyle.passwordRecoveryAccountLinkHelp} onPress={this.showDialog}>Get
                  help click
                  here</Text>
                </Text>

              </View>
            </ImageBackground>
          </ScrollView>
          <Toast ref="toast"/>
        </View>

    );
  }
}

function mapStateToProps(state) {
  return {
    userData: userReducer.getUserData(state),
    isOnRequest: userReducer.isOnRequest(state),
    resetPassword: resetPasswordReducer.sendPasswordReset(state),
  };
}

function mapDispatchToProps(dispatch) {

  return {
    onLoginButtonClick: (username, password) => {
      dispatch(userLogin(username, password))
    },
    onPasswordResetClick: (email) => {
      dispatch(resetPasswordRequest(email))
    }
  };

}

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(LoginScreen);
