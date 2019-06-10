import React, {Component} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, FlatList} from 'react-native';
import WorkOrderDateFilterCarouselItem from "./WorkOrderDateFilterCarouselItem"; // eslint-disable-line
import {Ionicons} from '@expo/vector-icons';
import moment from 'moment';
import {setSelectedDate} from "../../actions/dateFilter/dateFilter";
import connect from "react-redux/es/connect/connect";

class WorkOrderDateFilterCarousel extends React.Component {

  state = {
    filterDates: [],
  }

  _initializeDates = () => {
    let daysAmount = 30;
    let filterDates = [];

    for (let i = 0; i <= daysAmount; i++) {
      filterDates.push({
        date: moment().add(i, 'days'),
        index: i,
        active: moment().format('DD-MM-YYYY') == moment().add(i, 'days').format('DD-MM-YYYY') ? true : false,
      });
    }

    this.setState({filterDates: filterDates});
  }

  _handleDateSelect(item, index) {


    this._initializeDates();

    let dates = [];

    this.state.filterDates.map((date, index) => {
      date.active = false;
      date.index = index;
      dates.push(date);
    })

    this.setState({filterDates: this.state.filterDates});

    let targetItem = this.state.filterDates[index];
    targetItem.active = true;

    this.setState({selectedDate: targetItem});
    this.setState({filterDates: dates});
    this.props.onSetSelectedDate(targetItem);
  }

  componentDidMount() {
    this._initializeDates();
    this.props.onSetSelectedDate(this.props.selectedDate);
  }

  render() {
    return (
        <View style={{height: 100, marginTop: -30}}>

          <FlatList horizontal={true}
                    data={this.state.filterDates}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) =>
                        <WorkOrderDateFilterCarouselItem
                            item={item}
                            onSelectDate={() => {
                              this._handleDateSelect(item, index)
                            }}
                            selectedDate={this.props.selectedDate}
                            itemIndex={item.index}
                            key={item.index}
                        />
                    }
          />


        </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSetSelectedDate: (date) => {
      date.data = date.date.format()
      dispatch(setSelectedDate(date))
    },
  }
}

export default connect(null, mapDispatchToProps)(WorkOrderDateFilterCarousel);


const styles = StyleSheet.create({
  carouselWrapper: {
    position: 'relative',
    paddingRight: 15,
    marginTop: -20
  },
  chevronBase: {
    position: 'absolute',
    top: 30,
    zIndex: 500,
  },

});
