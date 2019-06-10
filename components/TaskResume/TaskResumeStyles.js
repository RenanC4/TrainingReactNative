import React from 'react';
import { StyleSheet } from 'react-native';
import TaskResume from "./TaskResume";

const TaskResumeStyles = StyleSheet.create({
  card: {
    backgroundColor: '#000',
    alignItems: 'center',
    flex: 1,
    marginRight: 15,
    borderRadius: 0,
    marginLeft: 8,
    marginBottom: 30,
    shadowRadius: 5,
    shadowOpacity: 1.0

  },

  container: {
    padding: 0, margin: 0
  },

  tomorrowTasksCard:{
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
    color:'#01a1db',
    marginRight: 15,
    borderRadius: 0,
    marginLeft: 8,
    marginBottom: 30,
    shadowRadius: 5,
    shadowOpacity: 1.0

  },

  thisWeekTasksCard:{
    color: '#ffffff',
    backgroundColor: '#01a1db',
    alignItems: 'center',
    flex: 1,
    marginRight: 15,
    borderRadius: 0,
    marginLeft: 8,
    marginBottom: 30,
    shadowRadius: 5,
    shadowOpacity: 1.0
  }
});

export default TaskResumeStyles;