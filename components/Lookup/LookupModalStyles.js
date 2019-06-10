import React from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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
    width: '100%',
    zIndex: 500,
  },
  lookUpDropdownItem: {
    paddingTop: 15,
    width: '100%',
    height: 50,
  },
  lookUpDropdownItemSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    marginTop: 15,
    marginRight: 5,
    marginBottom: 15,
    marginLeft: 5,
    width: '100%',
  },
  lookUpDropdownItemText: {
    paddingRight: 10,
    paddingLeft: 10,
  }
});
