import React from 'react';
import { StyleSheet } from 'react-native';

const Grid = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginRight: -15,
    marginLeft: -15,
  },
  col: {
    flex: 1,
  }
});


export default Grid;