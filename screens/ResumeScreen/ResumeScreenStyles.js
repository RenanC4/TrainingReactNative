import React from 'react';
import {StyleSheet, Platform} from 'react-native';

const ResumeScreenStyles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: 290,
  },
  imageLandscape: {
    marginTop: 50, width: '100%'
  },
  imagePortrait: {
    marginTop: 140,
    width: '100%',
    marginLeft: 350,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    marginBottom: 15,
    color: '#ffffff',
  },
  resumeHeaderContainer: {
    flex: 1,
    paddingTop: 25,
    paddingRight: 15,
    paddingLeft: 15,
    position: Platform.OS === 'ios' ? 'relative' : undefined,
    zIndex: Platform.OS === 'ios' ? 3 : undefined,
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
    top: 15,
  },
  timeLineWrapper: {
    marginLeft: 4,
    marginRight: 4,
    bottom: -50,
    width: '100%',
    padding: 10,
    paddingTop: 0,
    paddingBottom: 110,
  },

  carouselWrapper: {
    paddingBottom: 15,
    position: Platform.OS === 'ios' ? 'relative' : undefined,
    zIndex: Platform.OS === 'ios' ? 1 : undefined,
  }
});

export default ResumeScreenStyles;
