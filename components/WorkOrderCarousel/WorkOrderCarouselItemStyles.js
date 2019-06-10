import React from 'react';
import { StyleSheet } from 'react-native';

const WorkOrderCarousellItemStyles = StyleSheet.create({

  card: {
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 15,
    borderRadius: 0,
    marginLeft: 8,
    marginBottom: 30,
    paddingTop: 5,
  },

  container: {
    padding: 0, margin: 0
  },

  detailsStatusInner: {
    width: 50,
    height: 50,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 50,
    borderColor: '#cbcbcb',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
    paddingTop: 13,
  },

  detailsStatusIcon: {
    position: 'absolute',
    top: 20,
  },

  workOrderDescription: {
    fontFamily: 'sf-medium',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: '#313131',
    marginLeft:10,
    marginRight:10,
    marginTop: 10,
    lineHeight: 19
  },

  workOrderOpenedDate: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: '#656565',
    marginTop: 0
  },

  workOrderMoreInfoButton: {
    backgroundColor: '#51bee9',
    alignSelf: 'center',
    width: '80%',
    height: 36,
    marginTop: 6
  },

  workOrderMoreInfoButtonText: {
    fontWeight: 'normal',
    color: '#FFF',
    fontSize: 14,
    width: '100%',
    textAlign: 'center',
  },

});

export default WorkOrderCarousellItemStyles;
