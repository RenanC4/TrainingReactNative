import React from 'react';
import {
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';

import {View, Text,} from 'react-native-ui-lib';
import ProfileDropdown from '../../components/ProfileDropdown';
import WorkOrderDateFilterCarousel from "../../components/WorkOrderDateFilterCarousel/WorkOrderDateFilterCarousel";
import WorkOrderCarousel from "../../components/WorkOrderCarousel/WorkOrderCarousel";

export default class SyncScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ScrollView style={styles.container}>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({


});

