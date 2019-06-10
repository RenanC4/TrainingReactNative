import React from 'react';
import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
  imageBackground: {
    width: '100%',
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexGrow: 1,
  },

  goBackIcon: {
    color: '#fff',
    marginTop: 30,
  },

  helloText: {
    fontSize: 30,
    paddingTop: 15,
    fontFamily: 'sf-light',
    color: '#ffffff',
  },

  userNameText: {
    fontFamily: 'sf-medium',
    fontSize: 30,
    lineHeight: 40,
    color: '#ffffff',
  },

  resumeHeaderContainer: {
    flex: 1,
    paddingTop: 25,
    paddingRight: 15,
    paddingLeft: 15,
    position: Platform.OS === 'ios' ? 'relative' : undefined,
    zIndex: Platform.OS === 'ios' ? 5 : undefined,
  },

  resumeHeaderInner: {
    flex: 1,
    flexDirection: 'row'
  },

  layoutContainer: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
  },

  profileDropdownWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'relative',
    top: 10,
  },

  detailsWrapper: {
    width: '100%',
    paddingTop: 45,
    paddingRight: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },

  detailsRibbonText: {
    fontSize: 12,
    color: '#000',
    paddingRight: 15,
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

  detailsStatus: {
   paddingRight: 15,
   paddingLeft: 15,
  },

  detailsInnerWrapper: {
    position: 'relative',
    flex: 1
  },

  detailsInnerTitle: {
    width: '100%',
    fontFamily: 'sf-bold',
    fontSize: 18,
  },
//ta bugando
  detailsStatusInner: {
    width: 70,
    height: 70,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 50,
    borderColor: '#cbcbcb',
    position: 'relative',
    paddingTop: 15,
    textAlign: 'center',
    marginTop: 10,
  },

  detailsStatusIcon: {
    position: 'absolute',
    top: 20,
  },


  detailsText: {
    paddingRight: 70,
  },

  detailsInnerMeta: {
    width:'90%',
    fontSize: 14,
    paddingBottom: 5,
  },

  detailsInnerMetaUser: {
    fontFamily: 'sf-bold',
  },

  detailsInnerRef: {
    fontSize: 14,
    fontFamily: 'sf-bold',
    color: '#707070',
    marginTop: 10,
  },
});
