import React from 'react';
import { StyleSheet } from 'react-native';

const LoginScreenStyle = StyleSheet.create({

  logoContainerPortraitTab: {
    width: '80%',
    height: 100,
    marginTop: 300,
    marginBottom: 25,
  },

  logoContainer: {
    width: '100%',
    height: 100,
    marginTop: 60,
    marginBottom: 25,
  },
  logo: {
    marginRight: 75,
    marginLeft: 75,
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  },
  loginHeaderContainer: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
  },
  layoutContainer: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
  },
  signInButton: {
    position: 'relative',
    paddingTop: 20,
    paddingBottom: 20
  },
  createAccountLink: {
    fontSize: 17,
    marginTop: 15,
    color: '#ffffff',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#ffffff',
    paddingTop: 30,
    paddingBottom: 0,
  },

  passwordRecoveryAccountLinkHelp:{
    fontWeight:'bold'
  },

  passwordRecoveryAccountLink:{
    fontSize: 17,
    marginTop: 15,
    color: '#ffffff',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#ffffff',
    paddingTop: 10,
    paddingBottom: 30,
  },
  welcome: {
    fontSize: 26, 
    fontFamily: 'sf-light',
    marginBottom: 20
  },
});

export default LoginScreenStyle;