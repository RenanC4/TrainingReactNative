import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Constants, Text, Carousel, Button, Card, Image, Badge } from 'react-native-ui-lib';
import TaskResumeStyles from "./TaskResumeStyles";

import { Ionicons } from '@expo/vector-icons';
import WorkOrderCarousellItemStyles from "../WorkOrderCarousel/WorkOrderCarouselItemStyles";

export default class TaskResume extends React.Component {
  render() {
    return (
      <ScrollView>
        <Text>
          TASKS RESUME
          </Text>
        <TouchableWithoutFeedback>
          <Card style={TaskResumeStyles.todayTasksCard}
            containerStyle={TaskResumeStyles.container}
            elevation={7}
            width={170}
            height={170}
            borderRadius={0}>
            <Text style={TaskResumeStyles.workOrderMoreInfoButtonText}>
              140 task hoje
                </Text>
          </Card>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <Card style={TaskResumeStyles.tomorrowTasksCard}
            containerStyle={TaskResumeStyles.container}
            elevation={7}
            width={170}
            height={170}
            borderRadius={0}>
            <Text style={TaskResumeStyles.workOrderMoreInfoButtonText}>
              140 taks Amanha
              </Text>
          </Card>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <Card style={TaskResumeStyles.thisWeekTasksCard}
            containerStyle={TaskResumeStyles.container}
            elevation={7}
            width={170}
            height={170}
            borderRadius={0}>
            <Text style={TaskResumeStyles.workOrderMoreInfoButtonText}>
              140 taks Essa semana
              </Text>
          </Card>
        </TouchableWithoutFeedback>
      </ScrollView>
    )
  }
}
