import React from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  imageBackground: {
    width: '100%',
    flex: 1,
    paddingBottom: 15
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexGrow: 1,
    paddingBottom: 15,
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
    paddingTop: 43,
    paddingRight: 30,
    paddingBottom: 40,
    backgroundColor: '#fff',
    flexDirection: 'row',
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

  detailsRibbonText: {
    fontSize: 12,
    color: '#fff',
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
    borderTopColor: '#b60000',
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
  },

  detailsInnerTitle: {
    fontFamily: 'sf-bold',
    fontSize: 20,
  },

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

  detailsText: {
    paddingRight: 70,
  },

  detailsInnerMeta: {
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
  createButton: {
    position: 'relative',
    paddingTop: 20,
    paddingBottom: 20
  },



  //todo: componentize it
  lookUpDropdown: {
    backgroundColor: '#fff',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingTop: 5,
    paddingRight: 7,
    paddingBottom: 5,
    paddingLeft: 7,
    position: 'absolute',
    top: -10,
    left: 0,
    width: '100%',
    zIndex: 500,
  },
  lookUpDropdownItem: {
    paddingTop: 15,
    height: 50,
  },
  lookUpDropdownItemSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    marginTop: 15,
    marginRight: 5,
    marginBottom: 15,
    marginLeft: 5,
  },
  lookUpDropdownItemText: {
    paddingRight: 10,
    paddingLeft: 10,
  }
});
