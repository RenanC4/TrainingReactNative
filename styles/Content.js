import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  default: {
    padding: 15,
  },

  viewHeading: {
    fontFamily: 'sf-bold',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 15,
  },

  heading: {
    fontFamily: 'sf-bold',
    fontSize: 20,
  },

  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ebebeb',
    marginTop: 15,
    marginBottom: 15,
  },

  innerHeadline: {
    fontFamily: 'sf-semibold',
    fontSize: 13,
    color: '#636363',
  },

  innerValue: {
    fontSize: 15,
    color: '#000',
  },

  addNewItemButtonWrapper: {
    position: 'absolute',
    top: 20,
    right: 15,
  },

  addNewItemButton: {

  },

  addNewItemButtonText: {
    fontWeight: 'bold',
    color: '#ffffff'
  }
});