import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import UserWelcomeStyles from "./UserWelcomeStyles";
import {connect} from "react-redux";
import * as UserReducer from '../../reducers/user/user';

class UserWelcome extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
        <View flex>
          <Text style={UserWelcomeStyles.helloText}>Welcome</Text>
          <Text style={UserWelcomeStyles.userNameText}>{this.props.userData.data.FirstName}</Text>
        </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    userData: UserReducer.getUserData(state),
  };
}

export default connect(
    mapStateToProps,
    null)
(UserWelcome);

