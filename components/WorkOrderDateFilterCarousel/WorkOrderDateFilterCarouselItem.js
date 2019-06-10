import React, {Component} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {View, Text,} from 'react-native-ui-lib';
import moment from "moment";

class WorkOrderDateFilterCarouselItem extends React.Component {

  state = {
    selectedDate: {
      date: moment(),
      index: 1,
      active: true,
    }
  }

  _handleDateChange = (item) => {
    this.props.onSelectDate(item);
    this.setState({selectedDate: item});
  }

  componentDidMount() {
    if (this.props.item.date.format('DD-MM-YYYY') == moment().format('DD-MM-YYYY')) {
      this.props.item.active;
    }
  }

  render() {
    return (
        <TouchableWithoutFeedback onPress={() => this._handleDateChange(this.props.item)}>
          <View style={styles.carouselItemSingle}>
            <View style={[
              styles.carouselBtnBase,
              (this.props.item.active == true ? styles.carouselBtnSelected : styles.carouselBtnNotSelected)
            ]}>
              <Text style={styles.carouselItemSingleDay}>
                {this.props.item.date.format('DD')}
              </Text>
              <Text style={styles.carouselItemSingleDayName}>
                {this.props.item.date.format('dd')}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  carouselItemSingle: {
    width: 55,
    borderRadius: 10,
    margin: 10,
  },
  carouselItemSingleDay: {
    fontFamily: 'sf-medium',
    fontSize: 30,
    color: '#ffffff',
    textAlign: 'center',
  },
  carouselItemSingleDayName: {
    fontFamily: 'sf-medium',
    fontSize: 15,
    color: '#ffffff',
    textAlign: 'center',
  },
  carouselBtnBase: {
    paddingTop: 5,
    borderRadius: 10,
    height: 80,
  },
  carouselBtnSelected: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  carouselBtnNotSelected: {
    backgroundColor: 'transparent',
  },
});

export default WorkOrderDateFilterCarouselItem;
