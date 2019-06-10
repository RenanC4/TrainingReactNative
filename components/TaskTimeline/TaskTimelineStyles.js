import React from 'react';
import { StyleSheet } from 'react-native';
import TaskTimeline from "./TaskTimeline";

const TaskTimelineStyles = StyleSheet.create({

  wrapper: {
    paddingBottom: 40,
  },

  card: {
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 15,
    borderRadius: 0,
    marginLeft: 10,
    marginBottom: 10,
  },

  container: {
    padding: 0, margin: 0
  },

  tomorrowTasksCard:{
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
    color:'#3cab35',
    marginRight: 15,
    borderRadius: 0,
    marginLeft: 8,
    marginBottom: 30,
    shadowRadius: 5,
    shadowOpacity: 1.0

  },

  thisWeekTasksCard:{
    color: '#ffffff',
    backgroundColor: '#3cab35',
    alignItems: 'center',
    flex: 1,
    marginRight: 15,
    borderRadius: 0,
    marginLeft: 8,
    marginBottom: 30,
    shadowRadius: 5,
    shadowOpacity: 1.0
  },

  list: {
    flex: 1,
    marginTop:0,
  },

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
    borderColor: '#3cab35',
    alignSelf: 'flex-start',
    textAlign: 'center',
    margin: 10,
    padding: 13
  },

  detailsStatusIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
  }, 

  timeLineTitle: {
    fontFamily: 'sf-medium',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'left',
    color: '#313131',
    lineHeight: 19
  },

  timeLineDesc: {
    fontWeight: 'bold',
    fontSize: 11,
    textAlign: 'left',
    color: '#656565',
    marginTop: 0

  },

  timeLineDescView: {
    flex: 1,
    justifyContent: 'center',

  },

  timeLineDescName: {
    color:'#000',
  },

  timeLineWrapperText: {
    paddingTop: 0,
    fontSize: 20,
    fontWeight:'bold',
    paddingBottom: -10,
  }

});

export default TaskTimelineStyles;